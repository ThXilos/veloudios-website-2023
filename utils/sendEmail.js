const nodemailer = require("nodemailer");

//create function

//to us nodemailer we need a subject, a message, email of the target, email of the source and the reply email.

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
  // create an object with the service info.
  const serviceConfiguration = {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    //*
    tls: {
      rejectUnauthorized: false,
    },
  };

  //create the TRANSPORTER.
  const transporter = nodemailer.createTransport(serviceConfiguration);

  //create object with the parameters.
  const options = {
    from: sent_from,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
    html: message,
  };

  //send email
  transporter.sendMail(options, (err, emailInfo) => {
    if (err) {
      console.log(err);
    } else {
      console.log(emailInfo);
    }
  });
};

module.exports = sendEmail;
