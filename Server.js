const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/send', async (req, res) => {
    try {
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

        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);

        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email', error: error.message });
    }
});

app.post('/emails/:emailId/reply', async (req, res) => {
    try {
        const { emailId } = req.params;
        const { replyContent } = req.body;

        res.json({ message: 'Email replied successfully' });
    } catch (error) {
        console.error('Error replying to email:', error);
        res.status(500).json({ message: 'Error replying to email', error: error.message });
    }
});

app.get('/emails/:emailId/content', async (req, res) => {
    try {
        const { emailId } = req.params;

        res.json({ content: 'Email content here' });
    } catch (error) {
        console.error('Error fetching email content:', error);
        res.status(500).json({ message: 'Error fetching email content', error: error.message });
    }
});

app.post('/emails/:emailId/starred', async (req, res) => {
    try {
        const { emailId } = req.params;

        res.json({ message: 'Email marked as starred successfully' });
    } catch (error) {
        console.error('Error marking email as starred:', error);
        res.status(500).json({ message: 'Error marking email as starred', error: error.message });
    }
});

app.get('/emails', async (req, res) => {
    try {
        res.json([{ id: '1', subject: 'Deleted Email 1' }, { id: '2', subject: 'Deleted Email 2' }]);
    } catch (error) {
        console.error('Error fetching deleted emails:', error);
        res.status(500).json({ message: 'Error fetching deleted emails', error: error.message });
    }
});

app.delete('/emails/:emailId', async (req, res) => {
    try {
        const { emailId } = req.params;

        res.json({ message: 'Email deleted successfully' });
    } catch (error) {
        console.error('Error deleting email:', error);
        res.status(500).json({ message: 'Error deleting email', error: error.message });
    }
});

app.get('/emails', async (req, res) => {
    try {
        res.json([{ id: '1', subject: 'Email 1' }, { id: '2', subject: 'Email 2' }]);
    } catch (error) {
        console.error('Error fetching emails:', error);
        res.status(500).json({ message: 'Error fetching emails', error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
