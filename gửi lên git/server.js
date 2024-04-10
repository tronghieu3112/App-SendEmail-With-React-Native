const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

let emails = [];

// Route to handle receiving new emails
app.post('/api/emails', (req, res) => {
  const newEmail = req.body;
  emails.push(newEmail);
  res.json({ success: true, message: 'Email received successfully.' });
});

// Route to get all emails
app.get('/api/emails', (req, res) => {
  res.json(emails);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
