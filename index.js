const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.post("/send-email", function (req, res) {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "yasmeen26@ethereal.email",
      pass: "XPHK7Y27b4GHHcDqS5",
    },
  });

  const mailOptions = {
    form: "Remitente",
    to: req.body.email,
    subject: "Solicitud de contacto",
    text: `Hola Simon, soy ${req.body.name}, mi numero es ${req.body.phone} y me gustaría contactarme contigo. Mi mensaje es el siguiente: ${req.body.message}`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (req.body.email === "" || req.body.email === undefined || req.body.email === null) {
      res.status(400).jsonp({
        status: "error",
        message: "El correo es obligatorio." 
      });
    } else {
      if (error) {
      console.log(error);
      res.status(500).jsonp({
        status: "error",
        message: "Error al enviar el correo, intentalo de nuevo." 
      });
    } else {
      res.status(200).jsonp({
        status: "success",
        message: "Solicitud Enviada correctamente, pronto me pondré en contacto contigo." 
      });
    }
    }
    
  });
});

app.listen(3000, function () {
  console.log("server running on port 3000");
});
