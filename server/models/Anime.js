
// Import necessary modules from mongoose
const { Schema, model } = require('mongoose');

// Define the schema for the Anime collection
const AnimeSchema = new Schema({
  animeId: {
    type: String,
    required: true, // Field is required
  },
  animeName: {
    type: String,
    required: true // Field is required
  },
});

// Create a model using the defined schema
const Anime = model('Anime', AnimeSchema);

// Export the Anime model
module.exports = Anime;