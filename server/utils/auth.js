// Import required module
const jwt = require("jsonwebtoken");

// Define secret key and expiration time for JWT token
const secret = "mysecretssshhhhhhh";
const expiration = "2h";

// Export middleware and signToken functions
module.exports = {
  // Middleware function to authenticate user using JWT token
  authMiddleware: function ({ req }) {
    // Get token from request body, query parameters, or authorization header
    let token = req.body.token || req.query.token || req.headers.authorization;

    // If token is provided in authorization header, extract it
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    // If no token is provided, return the request object as it is
    if (!token) {
      return req;
    }

    try {
      // Verify the token and extract user data
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      // Set user data in request object
      req.user = data;
    } catch {
      // If token is invalid, log an error message
      console.log("Invalid token");
    }

    // Return the modified request object
    return req;
  },

  // Function to sign JWT token for user authentication
  signToken: function ({ email, username, _id }) {
    // Create payload containing user information
    const payload = { email, username, _id };
    // Sign the payload to generate JWT token
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
