require('dotenv').config();

const templeRoutes = require('./routes/templeRoutes');

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/temples', templeRoutes);

// Connect Database
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('TempleGuide API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
