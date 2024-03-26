// Import necessary modules from mongoose
const { Schema, model } = require("mongoose");

// Define the schema for the Show collection
const ShowSchema = new Schema({
  themoviedb: Object, // Field for storing show information from The Movie Database (TMDb)
});

// Create a model using the defined schema
const Show = model("Show", ShowSchema);

// Export the Show model
module.exports = Show;
