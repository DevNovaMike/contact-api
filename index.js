const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // ✅ Added CORS

const Message = require('./models/Message'); // Make sure path is correct
const app = express();

dotenv.config();

// ✅ Enable CORS for GitHub Pages
app.use(cors({
  origin: "https://devnovamike.github.io"
}));

app.use(express.json()); // for parsing application/json

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully!'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// 🟢 POST route to save messages
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.status(201).json({ message: 'Message saved successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save message.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});