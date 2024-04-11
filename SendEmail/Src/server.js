// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware để xử lý dữ liệu JSON
app.use(bodyParser.json());

// Định nghĩa endpoint để nhận yêu cầu gửi email
app.post('/send-email', async (req, res) => {
    const { from, subject, body } = req.body;

    // Kiểm tra xem các trường cần thiết đã được cung cấp chưa
    if (!from || !subject || !body) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Tạo một phiên bản transporter để gửi email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'tronghieutruonghp@gmail.com',
                pass: 'hieu0355668147'
            }
        });

        // Thông tin về email sẽ gửi
        const mailOptions = {
            from,
            to: 'tronghieutruonghp@gmail.com', // Địa chỉ email của bạn
            subject,
            text: body
        };

        // Gửi email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
