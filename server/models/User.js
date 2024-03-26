// Import necessary modules from mongoose
const { Schema, model } = require("mongoose");
// Import bcryptjs for password hashing
const bcrypt = require("bcryptjs");

// Define the schema for the User collection
const userSchema = new Schema({
  // Field for the username
  username: {
    type: String,
    required: true, // Username is required
    unique: true, // Username must be unique
    trim: true, // Trim leading and trailing whitespace
  },
  // Field for the email
  email: {
    type: String,
    required: true, // Email is required
    unique: true, // Email must be unique
    match: [/.+@.+\..+/, "Must match an email address!"], // Validate email format
  },
  // Field for the password
  password: {
    type: String,
    required: true, // Password is required
    minlength: 5, // Minimum length of the password
  },
  // Field for storing references to associated shows
  shows: [
    {
      type: Schema.Types.ObjectId,
      ref: "Show", // Reference to the Show model
    },
  ],
  // Field for storing references to associated movies
  movies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Movie", // Reference to the Movie model
    },
  ],
  // Field for storing references to associated animes
  animes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Anime", // Reference to the Anime model
    },
  ],
  // Field for storing references to associated thoughts
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought", // Reference to the Thought model
    },
  ],
});

// Middleware to hash password before saving user to database
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10; // Number of salt rounds for bcrypt hashing
    this.password = await bcrypt.hash(this.password, saltRounds); // Hash the password
  }

  next(); // Call the next middleware
});

// Method to check if the provided password is correct
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password); // Compare provided password with hashed password
};

// Create a model using the defined schema
const User = model("User", userSchema);

// Export the User model
module.exports = User;
