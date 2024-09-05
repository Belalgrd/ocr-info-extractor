import express from 'express';
import multer from 'multer';
import path from 'path';
import ocrRoutes from './routes/ocrRoutes.js';
import connectDB from './config/config.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Configure Multer for file uploads ka kaam
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Define a root route
app.get('/', (req, res) => {
  res.send('Welcome to the OCR Information Extractor API');
});

// Routes
app.use('/api/ocr', upload.single('image'), ocrRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
