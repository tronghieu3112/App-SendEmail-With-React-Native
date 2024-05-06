const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(cors());


// Kết nối với MongoDB
mongoose.connect('mongodb://localhost:27017/Emails', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Định nghĩa schema cho email
const emailSchema = new mongoose.Schema({
    id: String,
    from: String,
    to: String,
    subject: String,
    content: String,
    received: Date,
    isStarred: { type: Boolean, default: false }
});

// Tạo model từ schema
const Email = mongoose.model('Email', emailSchema);

// Tạo model cho các collection riêng biệt
const SentEmail = mongoose.model('Sent_Email', emailSchema);
const ReceivedEmail = mongoose.model('Received_Email', emailSchema);
const RepliedEmail = mongoose.model('Replied_Email', emailSchema);
const DeletedEmail = mongoose.model('Deleted_Email', emailSchema);

// Gửi Email Endpoint
app.post('/send', async (req, res) => {
    try {
        const { recipientEmail, subject, content } = req.body;

        // Gửi email
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

        // Lưu email đã gửi vào collection 'SentEmail'
        const newSentEmail = new SentEmail({
            id: uuidv4(),
            from: 'loitruongminhit@gmail.com',
            to: recipientEmail,
            subject: subject,
            content: content,
            received: new Date()
        });
        await newSentEmail.save();

        res.json(newSentEmail);
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email', error: error.message });
    }
});

// Trả lời Email Endpoint
app.post('/emails/:emailId/reply', async (req, res) => {
    const { emailId } = req.params;
    const { replyContent } = req.body;

    try {
        const email = await Email.findById(emailId);
        if (!email) {
            return res.status(404).json({ message: 'Email not found' });
        }

        // Lưu email đã trả lời vào collection 'RepliedEmail'
        const replyEmail = new RepliedEmail({
            id: uuidv4(),
            from: email.to,
            to: email.from,
            subject: req.body.subject,
            content: replyContent,
            received: new Date()
        });

        await replyEmail.save();
        res.json(replyEmail);
    } catch (error) {
        console.error('Error replying to email:', error);
        res.status(500).json({ message: 'Error replying to email', error: error.message });
    }
});

// Xem Nội dung Email Endpoint
app.get('/emails/:emailId/content', async (req, res) => {
    const { emailId } = req.params;

    try {
        const email = await Email.findById(emailId);
        if (!email) {
            return res.status(404).json({ message: 'Email not found' });
        }

        res.json({ content: email.content });
    } catch (error) {
        console.error('Error fetching email content:', error);
        res.status(500).json({ message: 'Error fetching email content', error: error.message });
    }
});

// Đánh dấu Email là Starred Endpoint
app.post('/emails/:emailId/starred', async (req, res) => {
    const { emailId } = req.params;

    try {
        const email = await Email.findByIdAndUpdate(emailId, { isStarred: true }, { new: true });
        if (!email) {
            return res.status(404).json({ message: 'Email not found' });
        }

        res.json({ message: 'Email marked as starred successfully' });
    } catch (error) {
        console.error('Error marking email as starred:', error);
        res.status(500).json({ message: 'Error marking email as starred', error: error.message });
    }
});

// Xem Danh sách Email Đã Xóa Endpoint
app.get('/emails', async (req, res) => {
    try {
        const emails = await Email.find().sort({ received: -1 });
        res.json(emails);
    } catch (error) {
        console.error('Error fetching emails:', error);
        res.status(500).json({ message: 'Error fetching emails', error: error.message });
    }
});

// Xóa Email Endpoint
app.delete('/emails/:emailId', async (req, res) => {
    const { emailId } = req.params;

    try {
        const email = await Email.findById(emailId);
        if (!email) {
            return res.status(404).json({ message: 'Email not found' });
        }

        // Lưu email đã xóa vào collection 'DeletedEmail'
        const deletedEmail = new DeletedEmail(email);
        await deletedEmail.save();

        res.json({ message: 'Email deleted successfully' });
    } catch (error) {
        console.error('Error deleting email:', error);
        res.status(500).json({ message: 'Error deleting email', error: error.message });
    }
});

// Xem Danh sách Email Endpoint
app.get('/emails', async (req, res) => {
    try {
        const emails = await Email.find().sort({ received: -1 });
        res.json(emails);
    } catch (error) {
        console.error('Error fetching emails:', error);
        res.status(500).json({ message: 'Error fetching emails', error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
