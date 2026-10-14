import dns from 'dns';

dns.setDefaultResultOrder('ipv4first');

// Simple HTML escape to avoid injecting raw HTML from user input
const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Send via Brevo (formerly Sendinblue) HTTP API when BREVO_API_KEY is provided
const sendViaBrevo = async (options) => {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error('BREVO_API_KEY not configured');

  // derive sender name/email from EMAIL_FROM or BREVO_FROM or EMAIL_USER
  const rawFrom = (process.env.BREVO_FROM || process.env.EMAIL_FROM || process.env.EMAIL_USER || '').replace(/^"|"$/g, '').trim();
  let sender = { email: rawFrom, name: undefined };
  const m = rawFrom.match(/^(.*)<(.+@.+)>$/);
  if (m) {
    sender = { name: m[1].trim().replace(/^"|"$/g, '').trim(), email: m[2].trim() };
  }

  const toList = Array.isArray(options.to) ? options.to : [options.to];

  const payload = {
    sender,
    to: toList.map((t) => ({ email: String(t) })),
    subject: options.subject,
    textContent: options.text,
    htmlContent: options.html
  };

  if (options.replyTo) payload.replyTo = { email: options.replyTo };

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const body = await res.text();
    const err = new Error(`Brevo error ${res.status}: ${body}`);
    err.status = res.status;
    throw err;
  }

  return res.json();
};

// Send email
export const sendEmail = async (options) => {
  return sendViaBrevo(options);
};

// Send contact form notification
export const sendContactNotification = async (contact) => {
  const text = `New Project Inquiry — Xelox Solutions\n\nName: ${contact.name || 'Not provided'}\nEmail: ${contact.email}\nService: ${contact.service || 'General Inquiry'}\nBudget: ${contact.budget || 'Flexible'}\n\nMessage / Brief:\n${contact.message}\n\nSubmitted at: ${new Date().toLocaleString()}`;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
      <div style="background: #0f172a; padding: 24px; border-radius: 12px 12px 0 0; border-bottom: 2px solid #19d5d0;">
        <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em;">XELOX SOLUTIONS</h2>
        <p style="color: #94a3b8; margin: 4px 0 0; font-size: 13px;">New Project Inquiry & Client Brief</p>
      </div>
      <div style="background: #f8fafc; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #64748b; width: 140px;"><strong>Client Name:</strong></td>
            <td style="padding: 8px 0; font-size: 14px; color: #0f172a; font-weight: 600;">${escapeHtml(contact.name || 'Not provided')}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #64748b;"><strong>Email Address:</strong></td>
            <td style="padding: 8px 0; font-size: 14px; color: #0f172a;"><a href="mailto:${escapeHtml(contact.email)}" style="color: #0284c7; text-decoration: none;">${escapeHtml(contact.email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #64748b;"><strong>Service Pillar:</strong></td>
            <td style="padding: 8px 0; font-size: 14px; color: #0f172a; font-weight: 600;">${escapeHtml(contact.service || 'General Inquiry')}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #64748b;"><strong>Budget Range:</strong></td>
            <td style="padding: 8px 0; font-size: 14px; color: #0f172a; font-weight: 600;">${escapeHtml(contact.budget || 'Flexible')}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #64748b;"><strong>Submitted At:</strong></td>
            <td style="padding: 8px 0; font-size: 13px; color: #64748b;">${new Date().toLocaleString()}</td>
          </tr>
        </table>
        <div style="margin-top: 16px;">
          <strong style="font-size: 14px; color: #0f172a; display: block; margin-bottom: 8px;">Project Brief & Objectives:</strong>
          <div style="white-space: pre-wrap; background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 14px; line-height: 1.6; color: #334155;">${escapeHtml(contact.message)}</div>
        </div>
      </div>
      <p style="color: #94a3b8; font-size: 12px; margin-top: 16px; text-align: center;">
        Automated inquiry notification from Xelox Solutions platform.
      </p>
    </div>
  `;

  return sendEmail({
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'xyrosolutions1@gmail.com',
    replyTo: contact.email,
    subject: `New Project Inquiry: ${contact.name ? contact.name + ' — ' : ''}${contact.service || 'General'}`,
    text,
    html
  });
};
