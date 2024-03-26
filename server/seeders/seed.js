// Import required modules and dependencies
const db = require("../config/connection"); // Import database connection
const { User, Thought } = require("../models"); // Import User and Thought models
const userSeeds = require("./userSeeds.json"); // Import user seed data
const thoughtSeeds = require("./thoughtSeeds.json"); // Import thought seed data

// Once database connection is open, execute the following code
db.once("open", async () => {
  try {
    // Delete all existing thoughts and users from the database
    await Thought.deleteMany({});
    await User.deleteMany({});

    // Create users using the user seed data
    await User.create(userSeeds);

    // Loop through each thought seed data and create thoughts
    for (let i = 0; i < thoughtSeeds.length; i++) {
      // Create a new thought and extract its _id and thoughtAuthor
      const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);

      // Find the user associated with the thoughtAuthor and update its thoughts array
      const user = await User.findOneAndUpdate(
        { username: thoughtAuthor },
        {
          $addToSet: {
            thoughts: _id,
          },
        }
      );
    }
  } catch (err) {
    // If any error occurs, log the error and exit the process with code 1
    console.error(err);
    process.exit(1);
  }

  // If everything is done successfully, log a success message and exit the process with code 0
  console.log("all done!");
  process.exit(0);
});
