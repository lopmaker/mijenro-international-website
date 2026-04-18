const express = require('express');
const path = require('path');
const { Resend } = require('resend');

const app = express();
const PORT = process.env.PORT || 8080;
const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = process.env.TO_EMAIL || 'contact@mijenro.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'Mijenro Website <onboarding@resend.dev>';

app.use(express.json({ limit: '32kb' }));
app.use(express.urlencoded({ extended: true, limit: '32kb' }));

// Preview files should not be served publicly — filter them out
app.use((req, res, next) => {
  if (req.path.startsWith('/preview-')) {
    return res.status(404).end();
  }
  next();
});

app.use(express.static(__dirname, {
  extensions: ['html'],
  index: 'index.html',
}));

// Simple in-memory rate limit: one IP = max 5 submissions per 10 min
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const window = 10 * 60 * 1000;
  const arr = (hits.get(ip) || []).filter(t => now - t < window);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 5;
}

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

app.post('/api/contact', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip;
    if (rateLimited(ip)) {
      return res.status(429).json({ ok: false, error: 'Too many submissions. Please try again later.' });
    }

    const { company, name, email, market, category, volume, message, website } = req.body || {};

    // honeypot — if filled, silently accept and drop
    if (website) return res.json({ ok: true });

    if (!email || !name) {
      return res.status(400).json({ ok: false, error: 'Name and email are required.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: 'Please provide a valid email address.' });
    }

    const subject = `New partnership inquiry — ${company || name}`;
    const html = `
      <h2 style="font-family:Georgia,serif;color:#142945;margin:0 0 16px">New Partnership Inquiry</h2>
      <table style="font-family:Helvetica,Arial,sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:640px">
        <tr><td style="padding:8px 0;color:#6b6b6b;width:160px">Company</td><td style="padding:8px 0;color:#111">${escapeHtml(company)}</td></tr>
        <tr><td style="padding:8px 0;color:#6b6b6b">Contact Person</td><td style="padding:8px 0;color:#111">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:8px 0;color:#6b6b6b">Email</td><td style="padding:8px 0;color:#111">${escapeHtml(email)}</td></tr>
        <tr><td style="padding:8px 0;color:#6b6b6b">Target Market</td><td style="padding:8px 0;color:#111">${escapeHtml(market)}</td></tr>
        <tr><td style="padding:8px 0;color:#6b6b6b">Product Category</td><td style="padding:8px 0;color:#111">${escapeHtml(category)}</td></tr>
        <tr><td style="padding:8px 0;color:#6b6b6b">Order Volume</td><td style="padding:8px 0;color:#111">${escapeHtml(volume)}</td></tr>
      </table>
      <div style="margin-top:24px;padding:20px;background:#f7f5f0;border-left:3px solid #a8834a;font-family:Helvetica,Arial,sans-serif;font-size:14px;color:#111;white-space:pre-wrap;line-height:1.6">${escapeHtml(message) || '<em style="color:#6b6b6b">No additional notes provided.</em>'}</div>
      <p style="margin-top:24px;color:#6b6b6b;font-family:Helvetica,Arial,sans-serif;font-size:12px">Submitted from mijenro.com — IP ${escapeHtml(ip)}</p>
    `;

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(502).json({ ok: false, error: 'Email service error. Please try again or email us directly.' });
    }

    return res.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error('Contact handler error:', err);
    return res.status(500).json({ ok: false, error: 'Unexpected error. Please try again.' });
  }
});

app.get('/healthz', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Mijenro site listening on :${PORT}`);
});
