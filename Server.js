const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); // Import thư viện uuid

const app = express();
app.use(bodyParser.json());
app.use(cors());

let receivedEmails = [];

app.post('/send', async (req, res) => {
    const { recipientEmail, subject, content } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'loitruongminhit@gmail.com', 
            pass: 'kbib tajg zmrw xtjs' 
        }
    });

    let mailOptions = {
        from: 'loitruongminhit@gmail.com', 
        to: recipientEmail,
        subject: subject,
        text: content
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Email sent: ' + info.response);
            const receivedEmail = {
                id: uuidv4(), // Tạo một ID duy nhất
                ...mailOptions, // Bao gồm thông tin email đã gửi
                content: content, // Lưu trữ nội dung email
                received: new Date().toISOString()
            };
            receivedEmails.push(receivedEmail);
            res.json(receivedEmails);
        }
    });
});

app.get('/emails', (req, res) => {
    const emailsToSend = receivedEmails.map(email => ({ ...email, id: email.id }));
    res.json(emailsToSend);
});

app.get('/emails/:emailId', (req, res) => {
    const { emailId } = req.params;
    const email = receivedEmails.find(email => email.id === emailId);
    if (email) {
        res.json(email);
    } else {
        res.status(404).json({ message: "Email not found" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
