const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../backend/.env') });

// Create Express app
const app = express();

// Allow all origins in production for same-domain deployment
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));

// Middleware for parsing JSON
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB
let isConnected = false;

const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      console.error('MONGODB_URI is not defined in environment variables');
      throw new Error('MONGODB_URI is not defined');
    }

    console.log('Connecting to MongoDB...');
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    isConnected = true;
    console.log('✅ Connected to MongoDB successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    isConnected = false;
    throw err;
  }
};

// Import models
const Board = require('../backend/models/boardModel');
const Message = require('../backend/models/messageModel');
const User = require('../backend/models/userModel');

// Import routes
const userRoutes = require('../backend/routes/userRoutes');

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(503).json({ 
      error: 'Database connection failed',
      message: 'Please check MongoDB connection string and network access',
      details: error.message 
    });
  }
});

// API routes
app.use('/api/users', userRoutes);

app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV 
  });
});

app.get('/api/boards', async (req, res) => {
  try {
    await connectDB();
    const boards = await Board.find({});
    res.json(boards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/boards', async (req, res) => {
  try {
    await connectDB();
    const board = await Board.create(req.body);
    res.status(201).json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/boards/:id', async (req, res) => {
  try {
    await connectDB();
    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).json({ error: 'Board not found' });
    res.json(board);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/boards/:id', async (req, res) => {
  try {
    await connectDB();
    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).json({ error: 'Board not found' });
    
    if (req.body.elements) board.elements = req.body.elements;
    if (req.body.name) board.name = req.body.name;
    
    const updatedBoard = await board.save();
    res.json(updatedBoard);
  } catch (error) {
    console.error('Error updating board:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/boards/:boardId/messages', async (req, res) => {
  try {
    await connectDB();
    const { boardId } = req.params;
    const { limit = 50 } = req.query;
    
    const messages = await Message.find({ boardId })
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .sort({ timestamp: 1 });
      
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    message: 'Internal server error',
    error: err.message
  });
});

// Handle all routes for Vercel
app.all('*', (req, res, next) => {
  if (!res.headersSent) {
    next();
  }
});

// Export handler for Vercel serverless
module.exports = (req, res) => {
  return app(req, res);
};
