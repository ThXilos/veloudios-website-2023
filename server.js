const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const sendEmail = require("./utils/sendEmail");

//Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

//Routes
app.get("/", (req, res) => {
  res.send("All ok");
});
app.post("/api/sendemail", async (req, res) => {
  const { mail, typeOfService, shortDescription } = req.body;

  try {
    const send_to = process.env.EMAIL_USER;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = mail;
    const subject = "Customer Inquiry";
    const message = `
        <h3>Customer contact email: ${mail}</h3>
        <p>Requires information about: ${typeOfService}</p>
        <p>Description: ${shortDescription}</p>
    
    `;
    await sendEmail(subject, message, send_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: "Email sent" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
