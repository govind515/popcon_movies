const express = require("express");
const dotenv = require("dotenv");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const cors = require("cors"); // Import cors middleware

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  cache: "bounded", // Set cache option to "bounded"
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors()); // Enable CORS

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// The "catchall" handler: for any request that doesn't match the ones above, send back the React app's index.html file.
app.get("*", (req, res, next) => {
  if (req.url === "/graphql") return next();

  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// process.on("SIGINT", () => {
//   console.info("SIGINT signal received.");
//   console.log("Closing server...");
//   server.stop();
//   process.exit(0);
// });

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
