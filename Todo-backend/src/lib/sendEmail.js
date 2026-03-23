import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    await transporter.sendMail({
      from: `"Todo App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

  } catch (error) {
    console.error("Email error:", error);
  }
};