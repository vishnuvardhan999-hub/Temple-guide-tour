const mongoose = require('mongoose');

const templeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    establishment_year: { type: Number },
    significance: { type: String },
    address: { type: String, required: true },
    visiting_hours: { type: String },
    entry_fee: { type: String },
    contact_info: { type: String },
    description: { type: String },
    country_id: { type: String, required: true },
    state_id: { type: String, required: true },
    image_urls: [{ type: String }], // Cloudinary image URLs
    video_url: { type: String },    // Optional preview video URL

    // GeoJSON location field for geospatial queries
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
  },
  { timestamps: true }
);

// Create geospatial index for location-based queries
templeSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Temple', templeSchema);
