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

function buildConfirmationEmail({ name, company, market, category, volume, message }) {
  const firstName = String(name).trim().split(/\s+/)[0] || name;
  const rows = [
    ['Company', company],
    ['Target Market', market],
    ['Product Category', category],
    ['Order Volume', volume],
  ].filter(([, v]) => v && String(v).trim());

  const summaryRows = rows.map(([label, value]) => `
    <tr>
      <td style="padding:10px 0;color:#8492A6;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;width:40%;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;color:#1A1A1A;font-size:15px;">${escapeHtml(value)}</td>
    </tr>
  `).join('');

  const messageBlock = message && String(message).trim() ? `
    <tr><td colspan="2" style="padding-top:20px;">
      <div style="border-top:1px solid #EFE7D9;padding-top:16px;color:#8492A6;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;">Your Notes</div>
      <div style="margin-top:8px;color:#1A1A1A;font-size:15px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(message)}</div>
    </td></tr>
  ` : '';

  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Thank you — Mijenro International</title></head>
<body style="margin:0;padding:0;background:#F5F2EB;font-family:'Helvetica Neue',Helvetica,Arial,'Noto Sans SC',sans-serif;color:#1A1A1A;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">We've received your inquiry — our partnership team will respond within 24 hours.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F2EB;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border-top:4px solid #E3A65E;">

        <tr><td style="padding:40px 48px 28px;background:#1A2B4C;">
          <div style="font-family:Georgia,'Noto Serif SC',serif;color:#FFFFFF;font-size:22px;letter-spacing:0.04em;font-weight:500;">MIJENRO INTERNATIONAL</div>
          <div style="margin-top:6px;color:#E3A65E;font-size:11px;letter-spacing:0.24em;text-transform:uppercase;">Garment Wholesale · Established Partnership</div>
        </td></tr>

        <tr><td style="padding:44px 48px 8px;">
          <div style="color:#E3A65E;font-size:11px;letter-spacing:0.24em;text-transform:uppercase;font-weight:600;">Inquiry Received</div>
          <h1 style="margin:14px 0 0;font-family:Georgia,'Noto Serif SC',serif;color:#1A2B4C;font-size:30px;line-height:1.2;font-weight:500;letter-spacing:-0.01em;">Thank you, ${escapeHtml(firstName)}.</h1>
        </td></tr>

        <tr><td style="padding:24px 48px 8px;color:#1A1A1A;font-size:16px;line-height:1.75;">
          <p style="margin:0 0 16px;">We have received your partnership inquiry. A member of our merchandising team will review the details and respond within <strong style="color:#1A2B4C;">24 business hours</strong> with suggested next steps.</p>
          <p style="margin:0;color:#5C677D;font-size:14px;line-height:1.7;">If your request is time-sensitive, please email us directly at <a href="mailto:contact@mijenro.com" style="color:#1A2B4C;font-weight:600;text-decoration:none;border-bottom:1px solid #E3A65E;">contact@mijenro.com</a>.</p>
        </td></tr>

        ${rows.length || messageBlock ? `
        <tr><td style="padding:32px 48px 8px;">
          <div style="background:#FAF7F0;border-left:3px solid #E3A65E;padding:28px 28px 20px;">
            <div style="font-family:Georgia,'Noto Serif SC',serif;color:#1A2B4C;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:8px;">Your Submission</div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${summaryRows}${messageBlock}</table>
          </div>
        </td></tr>` : ''}

        <tr><td style="padding:32px 48px 0;">
          <div style="border-top:1px solid #EFE7D9;"></div>
        </td></tr>

        <tr><td style="padding:28px 48px 8px;color:#5C677D;font-size:14px;line-height:1.8;">
          <div style="font-family:Georgia,'Noto Serif SC',serif;color:#1A2B4C;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:12px;">感谢您的来信</div>
          <p style="margin:0 0 8px;color:#1A1A1A;">${escapeHtml(firstName)} 您好，</p>
          <p style="margin:0;">我们已收到您的合作咨询，相关团队将在 24 小时内回复您，并提出具体的合作建议和下一步安排。如需加急，请发送邮件至 <a href="mailto:contact@mijenro.com" style="color:#1A2B4C;font-weight:600;text-decoration:none;border-bottom:1px solid #E3A65E;">contact@mijenro.com</a>。</p>
        </td></tr>

        <tr><td style="padding:36px 48px 44px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="font-family:Georgia,'Noto Serif SC',serif;color:#1A2B4C;font-size:15px;font-style:italic;">— The Mijenro Partnership Team</td>
              <td align="right" style="color:#8492A6;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;">Ref · ${Date.now().toString(36).toUpperCase()}</td>
            </tr>
          </table>
        </td></tr>

        <tr><td style="padding:28px 48px;background:#1A2B4C;color:#B8C2D9;font-size:12px;line-height:1.8;">
          <div style="color:#FFFFFF;font-size:13px;letter-spacing:0.08em;margin-bottom:6px;">Mijenro International LLC</div>
          <div>500 7th Avenue, 8th Floor, New York, USA</div>
          <div>Jing'an District, Shanghai, China</div>
          <div style="margin-top:12px;"><a href="https://mijenro.com" style="color:#E3A65E;text-decoration:none;letter-spacing:0.04em;">mijenro.com</a> &nbsp;·&nbsp; <a href="mailto:contact@mijenro.com" style="color:#E3A65E;text-decoration:none;">contact@mijenro.com</a></div>
        </td></tr>

        <tr><td style="padding:16px 48px 28px;background:#12223F;color:#6F7B95;font-size:11px;line-height:1.6;">
          You are receiving this email because you submitted an inquiry on mijenro.com. This is a one-time confirmation; we will not add you to any mailing list.
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = [
    `Thank you, ${firstName}.`,
    ``,
    `We have received your partnership inquiry. A member of our merchandising team will respond within 24 business hours.`,
    ``,
    rows.length ? `Your submission:` : '',
    ...rows.map(([label, value]) => `  ${label}: ${value}`),
    message ? `` : '',
    message ? `Your notes:` : '',
    message ? message : '',
    ``,
    `If your request is time-sensitive, please email us at contact@mijenro.com.`,
    ``,
    `— The Mijenro Partnership Team`,
    ``,
    `Mijenro International LLC`,
    `New York · Shanghai`,
    `https://mijenro.com · contact@mijenro.com`,
  ].filter(Boolean).join('\n');

  return { html, text };
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

    const subject = `Partnership inquiry from ${company || name}`;
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

    const text = [
      `New Partnership Inquiry`,
      ``,
      `Company: ${company || '-'}`,
      `Contact Person: ${name}`,
      `Email: ${email}`,
      `Target Market: ${market || '-'}`,
      `Product Category: ${category || '-'}`,
      `Order Volume: ${volume || '-'}`,
      ``,
      `Message:`,
      message || '(no additional notes)',
      ``,
      `--`,
      `Submitted from mijenro.com`,
      `Reply directly to this email to contact ${name}.`,
    ].join('\n');

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject,
      html,
      text,
      headers: {
        'List-Unsubscribe': `<mailto:${TO_EMAIL}?subject=unsubscribe>`,
        'X-Entity-Ref-ID': `inquiry-${Date.now()}`,
      },
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(502).json({ ok: false, error: 'Email service error. Please try again or email us directly.' });
    }

    const confirmation = buildConfirmationEmail({ name, company, market, category, volume, message });
    resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: 'We\'ve received your inquiry — Mijenro International',
      html: confirmation.html,
      text: confirmation.text,
      headers: {
        'X-Entity-Ref-ID': `confirm-${Date.now()}`,
      },
    }).catch(err => console.error('Confirmation email failed:', err));

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
