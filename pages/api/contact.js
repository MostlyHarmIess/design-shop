import nodemailer from "nodemailer";
const { ADMIN_EMAIL } = process.env;

const handler = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const { from, subject, message } = req.body;
  const msg = {
    to: ADMIN_EMAIL,
    // cc: ADMIN_EMAIL,
    from: from,
    subject,
    text: message,
    html: `<p>${message}</p>`,
  };
  console.log(req.body);
  console.log(msg);

  try {
    let info = await transporter.sendMail(msg);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.status(201).json({ message: "email sent", id: info.messageId });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Failed to send email" });
  }
};

export default handler;
