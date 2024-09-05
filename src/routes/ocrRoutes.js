import express from 'express';
import { extractTextFromImage, saveExtractedData } from '../services/ocrService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const text = await extractTextFromImage(req.file.path);

    // sanple he yaha pe
    const nameMatch = text.match(/Name:\s*(.*)/);
    const aadhaarMatch = text.match(/Aadhaar Number:\s*(\d{4}\s\d{4}\s\d{4})/);

    const name = nameMatch ? nameMatch[1] : 'Not found';
    const aadhaarNumber = aadhaarMatch ? aadhaarMatch[1] : 'Not found';

    // Save the extracted data to MongoDB(save hota he database) 
    await saveExtractedData(name, aadhaarNumber, req.file.path);

    res.json({ name, aadhaarNumber });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process image' });
  }
});

export default router;
