const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cabbro220@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORD
  },
});

async function sendEmail(toEmail,Subject,body){
    const info = await transporter.sendMail({
    from: '<devmates team>',
    to: toEmail,
    subject: Subject,
    text: body, // plain‑text body
  });
  // console.log("Message sent:", info.messageId);
}

module.exports=sendEmail