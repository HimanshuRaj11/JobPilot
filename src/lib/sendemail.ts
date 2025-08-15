import nodemailer from "nodemailer";

export async function SendEmail(email: string, url: string) {

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    // Send the email
    await transporter.sendMail({
        from: `"Your App Name" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Verify Your Email",
        html: `
      <h2>Email Verification</h2>
      <p>Click the link below to verify your email:</p>
      <a href="${url}">${url}</a>
      <p>This link will expire in 1 hour.</p>
    `,
    });
}
