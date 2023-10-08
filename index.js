const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.post("/send-email", function (req, res) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "simongonzalezechavarria@gmail.com",
      pass: "$imon0610",
    },
  });

  const mailOptions = {
    form: "Remitente",
    to: req.body.email,
    subject: "Solicitud de contacto.",
    text: `Hola Simon, soy ${req.body.name}, mi numero es ${req.body.phone} y me gustaría contactarme contigo. Mi mensaje es el siguiente: ${req.body.message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send(500, err.message);
    } else {
      console.log("Email sent");
      res.status(200).jsonp(req.body);
    }
  });
});

app.listen(3000, function () {
  console.log("server running on port 3000");
});
