import mongoose from 'mongoose';

const ExtractedDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  aadhaarNumber: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
});

const ExtractedData = mongoose.model('ExtractedData', ExtractedDataSchema);

export default ExtractedData;
