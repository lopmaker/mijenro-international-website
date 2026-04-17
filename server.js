// Minimal Node.js server for Zeabur.
// Serves the static site from the project root and exposes POST /api/contact,
// which relays inquiries through Resend.
//
// Required environment variables (set these in Zeabur project settings):
//   RESEND_API_KEY     — Resend API key (re_xxx)
//   CONTACT_TO_EMAIL   — recipient, e.g. contact@mijenro.com
//   CONTACT_FROM_EMAIL — sender on a verified Resend domain,
//                        e.g. "Mijenro Website <website@mijenro.com>"
// Optional:
//   PORT               — defaults to 8080

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, extname, join, normalize, sep } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 8080;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
};

const MAX_BODY_BYTES = 32 * 1024;
const MAX_FIELD = {
  company: 120, name: 80, email: 150,
  market: 40, category: 150, volume: 80, message: 2000,
};

function sanitize(v, max) {
  return (typeof v === 'string' ? v : '').trim().slice(0, max);
}
function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function isEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function json(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', chunk => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error('Payload too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

async function handleContact(req, res) {
  if (req.method !== 'POST') {
    res.writeHead(405, { Allow: 'POST' });
    res.end();
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || 'contact@mijenro.com';
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Mijenro Website <website@mijenro.com>';

  if (!apiKey) {
    return json(res, 500, { ok: false, error: 'Email service is not configured.' });
  }

  let payload = {};
  try {
    const raw = await readBody(req);
    payload = raw ? JSON.parse(raw) : {};
  } catch {
    return json(res, 400, { ok: false, error: 'Invalid request body.' });
  }

  // Honeypot: bots often fill hidden fields. Silently accept and drop.
  if (payload.website || payload.hp) {
    return json(res, 200, { ok: true });
  }

  const company = sanitize(payload.company, MAX_FIELD.company);
  const name = sanitize(payload.name, MAX_FIELD.name);
  const email = sanitize(payload.email, MAX_FIELD.email);
  const market = sanitize(payload.market, MAX_FIELD.market);
  const category = sanitize(payload.category, MAX_FIELD.category);
  const volume = sanitize(payload.volume, MAX_FIELD.volume);
  const message = sanitize(payload.message, MAX_FIELD.message);

  if (!company || !name || !email || !message) {
    return json(res, 400, { ok: false, error: 'Missing required fields.' });
  }
  if (!isEmail(email)) {
    return json(res, 400, { ok: false, error: 'Invalid email address.' });
  }

  const subject = `New inquiry from ${company} (${name})`;
  const text = [
    `Company: ${company}`,
    `Contact: ${name}`,
    `Email: ${email}`,
    `Target market: ${market || '-'}`,
    `Category: ${category || '-'}`,
    `Estimated volume: ${volume || '-'}`,
    '',
    'Notes:',
    message,
  ].join('\n');

  const html = `
    <h2>New partnership inquiry</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
      <tr><td><strong>Company</strong></td><td>${escapeHtml(company)}</td></tr>
      <tr><td><strong>Contact</strong></td><td>${escapeHtml(name)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
      <tr><td><strong>Target market</strong></td><td>${escapeHtml(market) || '-'}</td></tr>
      <tr><td><strong>Category</strong></td><td>${escapeHtml(category) || '-'}</td></tr>
      <tr><td><strong>Estimated volume</strong></td><td>${escapeHtml(volume) || '-'}</td></tr>
    </table>
    <h3>Notes</h3>
    <pre style="white-space:pre-wrap;font-family:Arial,sans-serif;font-size:14px;">${escapeHtml(message)}</pre>
  `;

  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });

    if (!resp.ok) {
      const detail = await resp.text();
      console.error('Resend error:', resp.status, detail);
      return json(res, 502, { ok: false, error: 'Email service rejected the request.' });
    }

    return json(res, 200, { ok: true });
  } catch (err) {
    console.error('Resend fetch failed:', err);
    return json(res, 502, { ok: false, error: 'Could not reach email service.' });
  }
}

async function serveStatic(req, res) {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  let relPath = urlPath === '/' ? '/index.html' : urlPath;

  // Pretty URLs: /about → /about.html
  if (!extname(relPath) && !relPath.endsWith('/')) {
    relPath = relPath + '.html';
  }

  const safe = normalize(relPath).replace(/^([\\/])+/, '');
  // Block path traversal
  if (safe.split(sep).includes('..')) {
    res.writeHead(403).end();
    return;
  }

  const fullPath = join(__dirname, safe);
  try {
    const s = await stat(fullPath);
    if (s.isDirectory()) {
      const indexPath = join(fullPath, 'index.html');
      const data = await readFile(indexPath);
      res.writeHead(200, { 'Content-Type': MIME['.html'] });
      res.end(data);
      return;
    }
    const ext = extname(fullPath).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';
    const data = await readFile(fullPath);
    const headers = {
      'Content-Type': type,
      'X-Content-Type-Options': 'nosniff',
    };
    if (safe.startsWith('assets' + sep)) {
      headers['Cache-Control'] = 'public, max-age=31536000, immutable';
    } else if (ext === '.html' || safe === 'index.html') {
      headers['Cache-Control'] = 'public, max-age=0, must-revalidate';
      headers['X-Frame-Options'] = 'SAMEORIGIN';
      headers['Referrer-Policy'] = 'strict-origin-when-cross-origin';
    } else if (ext === '.css' || ext === '.js') {
      headers['Cache-Control'] = 'public, max-age=604800, must-revalidate';
    }
    res.writeHead(200, headers);
    res.end(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // Soft 404: serve index.html if present, else plain 404
      try {
        const fallback = await readFile(join(__dirname, '404.html'));
        res.writeHead(404, { 'Content-Type': MIME['.html'] });
        res.end(fallback);
      } catch {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not Found');
      }
      return;
    }
    console.error('Static serve error:', err);
    res.writeHead(500).end('Internal Server Error');
  }
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname === '/api/contact') {
      await handleContact(req, res);
      return;
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, { Allow: 'GET, HEAD' });
      res.end();
      return;
    }
    await serveStatic(req, res);
  } catch (err) {
    console.error('Unhandled server error:', err);
    if (!res.headersSent) res.writeHead(500);
    res.end('Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`Mijenro server listening on :${PORT}`);
});
