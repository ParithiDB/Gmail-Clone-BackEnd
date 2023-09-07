const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const routes = require('./routes/route');
const Connection = require('./database/db');


require('dotenv').config();
require('./database/db');
require('./routes/route')

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use('/', routes);

const PORT = 8000;

Connection();

app.post('/send-email', async (req, res) => {
    try {
      const { to, subject, body } = req.body;
  
      // Create a transporter object with your email service provider's settings
      const transporter = nodemailer.createTransport({
      //   host: 'smtp.ethereal.email',
      // port: 587,
      // secure: false,
      // auth: {
        // in env
      //  }
      // host: "'smtp.elasticemail.com",
      // port: 2525,
      // auth: {
      //     user: `${process.env.EMAIL}`, 
      //     pass: `${process.env.APP_SPECIFIC_PASSWORD}`
      // }
      service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_SPECIFIC_PASSWORD,
    },
      });
  
      // Email data
      const mailOptions = {
        from: 'samu.aidindia@gmail.com',
        to,
        subject,
        text: body,
      };
  
      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);

      // console.log('Ethereal URL:', nodemailer.getTestMessageUrl(info));
  
      // Send a response indicating success
      res.status(200).json({ message: 'Email sent successfully', info });
    } catch (error) {
      console.error('Email send failed:', error);
  
      // Send an error response
      res.status(500).json({ error: 'Email send failed' });
    }
  });


app.listen(PORT, '0.0.0.0', () => {
    console.log('SERVER STARTED AT PORT', PORT);
  });