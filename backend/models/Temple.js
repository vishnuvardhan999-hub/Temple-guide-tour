const mongoose = require('mongoose');

const templeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    establishment_year: { type: Number },
    significance: { type: String },
    address: { type: String, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    visiting_hours: { type: String },
    entry_fee: { type: String },
    contact_info: { type: String },
    description: { type: String },
    country_id: { type: String, required: true },
    state_id: { type: String, required: true },
    image_urls: [{ type: String }], // For Cloudinary URLs
    video_url: { type: String },    // For preview video
  },
  { timestamps: true }
);

module.exports = mongoose.model('Temple', templeSchema);
