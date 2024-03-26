
// Import necessary modules from mongoose
const { Schema, model } = require('mongoose');

// Define the schema for the Movie collection
const MovieSchema = new Schema({
  tmdbId: String, // Field for TMDB ID of the movie
  imdbId: String // Field for IMDB ID of the movie
});

// Create a model using the defined schema
const Movie = model('Movie', MovieSchema);

// Export the Movie model
module.exports = Movie;