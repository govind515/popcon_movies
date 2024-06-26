import React, { useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MyProvider } from "./components/MyContext";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import MoreDetails from "./pages/MoreDetails";
import Movies from "./pages/Movies";
import Shows from "./pages/Series";
import Anime from "./pages/Anime"; // Corrected typo in import
import MovieDetails from "./pages/MovieDetails";
import ImdbShows from "./pages/ImdbShowDetails";
import AnimeDetails from "./pages/AnimeDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "aos/dist/aos.css";
import AOS from "aos";
import NotFound from "./pages/404";
import ScrollToTopButton from "./components/ScrollToTopButton";

const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  // Initialize AOS library on component mount
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="dark">
          <MyProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/details" element={<MoreDetails />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/TV-Shows" element={<Shows />} />
              <Route path="/show" element={<ImdbShows />} />
              <Route path="/animepage" element={<Anime />} />
              <Route path="/moviedetails" element={<MovieDetails />} />
              <Route path="/anime" element={<AnimeDetails />} />
              <Route path="/me" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Chat />
            <ScrollToTopButton />
            <Footer />
          </MyProvider>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
