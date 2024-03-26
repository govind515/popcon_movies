// Import necessary modules from mongoose
const { Schema, model } = require("mongoose");
// Import dateFormat utility function
const dateFormat = require("../utils/dateFormat");

// Define the schema for the Thought collection
const thoughtSchema = new Schema({
  // Field for the main thought text
  thoughtText: {
    type: String,
    required: "You need to leave a thought!", // Error message if not provided
    minlength: 1, // Minimum length of the thought
    maxlength: 280, // Maximum length of the thought
    trim: true, // Trim leading and trailing whitespace
  },
  // Field for the author of the thought
  thoughtAuthor: {
    type: String,
    required: true, // Author is required
    trim: true, // Trim leading and trailing whitespace
  },
  // Field for the creation date of the thought
  createdAt: {
    type: Date,
    default: Date.now, // Default value is the current date and time
    // Custom getter function to format the date
    get: (timestamp) => dateFormat(timestamp),
  },
  // Field for comments associated with the thought
  comments: [
    {
      // Field for the text of the comment
      commentText: {
        type: String,
        required: true, // Comment text is required
        minlength: 1, // Minimum length of the comment
        maxlength: 280, // Maximum length of the comment
      },
      // Field for the author of the comment
      commentAuthor: {
        type: String,
        required: true, // Comment author is required
      },
      // Field for the creation date of the comment
      createdAt: {
        type: Date,
        default: Date.now, // Default value is the current date and time
        // Custom getter function to format the date
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

// Create a model using the defined schema
const Thought = model("Thought", thoughtSchema);

// Export the Thought model
module.exports = Thought;
