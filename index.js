const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Message = require('./models/Message');

const app = express();
dotenv.config();

// ✅ Basic safe CORS config
app.use(cors({
  origin: "https://devnovamike.github.io"
}));

app.use(express.json()); // parses JSON bodies

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully!'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Save messages
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.status(201).json({ message: 'Message saved successfully!' });
  } catch (err) {
    console.error('❌ Error saving message:', err);
    res.status(500).json({ error: 'Failed to save message.' });
  }
});

// ✅ Add a GET route to verify API is up
app.get('/', (req, res) => {
  res.send('✅ Contact API is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});