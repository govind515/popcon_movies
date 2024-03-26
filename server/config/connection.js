// Import required modules
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Enable strict mode for queries (optional)
mongoose.set("strictQuery", true);

// Connect to MongoDB database
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Popcon", // Use the MongoDB URI from environment variables or a default one
  {
    useNewUrlParser: true, // Use new URL parser
    useUnifiedTopology: true, // Use new Server Discover and Monitoring engine
  }
);

// Export the MongoDB connection instance
module.exports = mongoose.connection;
