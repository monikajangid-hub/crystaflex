import nodemailer from 'nodemailer'

export async function sendInquiryNotification(inquiry) {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP is not configured.')
  }

  const port = Number(process.env.SMTP_PORT) || 587
  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE.toLowerCase() === 'true'
    : port === 465
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  await transporter.sendMail({
    from: {
      name: 'Crystaflex Website',
      address: process.env.EMAIL_FROM || SMTP_USER,
    },
    to: 'sales@crystaflex.com',
    replyTo: { name: inquiry.name, address: inquiry.email },
    subject: `New website inquiry: ${inquiry.service}`,
    text: [
      'A new inquiry was submitted through the Crystaflex website.',
      '',
      `Name: ${inquiry.name}`,
      `Work email: ${inquiry.email}`,
      `Service: ${inquiry.service}`,
      '',
      'Message:',
      inquiry.message,
    ].join('\n'),
  })
}