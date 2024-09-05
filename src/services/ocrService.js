import Tesseract from 'tesseract.js';
import ExtractedData from '../models/ExtractedData.js';

export const extractTextFromImage = async (imagePath) => {
  try {
    const { data: { text } } = await Tesseract.recognize(imagePath, 'eng', {
      logger: info => console.log(info),
    });
    return text;
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};

export const saveExtractedData = async (name, aadhaarNumber, imagePath) => {
  try {
    const data = new ExtractedData({ name, aadhaarNumber, imagePath });
    await data.save();
    return data;
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
};
