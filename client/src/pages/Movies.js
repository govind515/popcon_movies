import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importing Link for routing
import axios from "axios"; // Importing axios for HTTP requests
import Card from "react-bootstrap/Card"; // Importing Card component from react-bootstrap
import Col from "react-bootstrap/Col"; // Importing Col component from react-bootstrap
import Row from "react-bootstrap/Row"; // Importing Row component from react-bootstrap
import Button from "react-bootstrap/Button"; // Importing Button component from react-bootstrap
import Form from "react-bootstrap/Form"; // Importing Form component from react-bootstrap
import play from "../styles/images/play.svg"; // Importing play icon
import filterlist from "../styles/images/filter.svg"; // Importing filter icon

const Movies = () => {
  // State variables
  const [contents, setContent] = useState([]); // State for movie contents
  const [isLoading, setIsLoading] = useState(true); // State to track loading state
  const [page, setPage] = useState(1); // State for pagination
  const [filter, setFilter] = useState("popular"); // State for filter selection

  // Function to fetch movie content based on filter and pagination
  const getContent = async () => {
    try {
      console.log("trying to run news");
      // Making API request to fetch movie data
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${filter}?language=en-US&page=${page}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      );
      // Updating movie content state with fetched data
      setContent((prevContents) => [...prevContents, ...res.data.results]);
      setIsLoading(false); // Setting loading state to false
    } catch (err) {
      console.log("🚀 ~ file: Movies.js:27 ~ getContent ~ err:", err);
    }
  };

  useEffect(() => {
    getContent(); // Fetching movie content on component mount and when filter or page changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filter]);

  // Function to handle 'Load More' button click
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1); // Incrementing page number
  };

  // Function to handle filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value); // Updating filter state with selected value
    setPage(1); // Resetting page number to 1
    setContent([]); // Clearing existing movie content
  };

  return (
    <div>
      <>
        {/* Filter selection dropdown */}
        <div className="sort-container">
          <p>
            <img className="" src={filterlist} alt=""></img> {/* Filter icon */}
          </p>
          <Form.Control
            className="sort mt-5"
            as="select"
            value={filter}
            onChange={handleFilterChange}
          >
            {/* Dropdown options for filter selection */}
            <option value="popular">popular</option>
            <option value="top_rated">Top Rated</option>
            <option value="now_playing">Now Playing</option>
            <option value="upcoming">Up Coming</option>
          </Form.Control>
        </div>
        <h1 className="text-center">Movies</h1> {/* Title */}
        {/* Loading spinner or movie cards based on loading state */}
        {isLoading ? (
          <div className="container mt-5">
            <div className="row">
              {/* Placeholder cards for loading state */}
              {Array(4)
                .fill(null)
                .map((_, idx) => (
                  <div key={idx} className="col-md-3 mb-4">
                    <div className="card border-0 bg-dark">
                      {/* Loading spinner placeholder */}
                      <img
                        src="https://www.oncorp.com/oncorphome/Images/loading.gif"
                        alt="Placeholder"
                        className="card-img-top mx-auto"
                        style={{
                          width: "300px",
                          height: "440px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          // Render movie cards
          <Row xs={1} md={4} className="g-5 m-4">
            {/* Mapping through movie contents to render cards */}
            {contents.map((content) => (
              <Col key={content.id}>
                <Link to={`/moviedetails?id=${content.id}`}>
                  {" "}
                  {/* Link to movie details page */}
                  <Card className="contentcard">
                    <Card.Img
                      className="cardimage"
                      src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
                      alt="Card image"
                    />{" "}
                    {/* Movie poster */}
                    <Card.ImgOverlay>
                      {/* Play icon */}
                      <img className="playbtn" src={play} alt=""></img>
                      {/* Movie title and release date */}
                      <div className="imageoverlay">
                        <Card.Title>{content.title}</Card.Title>
                        <Card.Text>{content.release_date}</Card.Text>
                      </div>
                    </Card.ImgOverlay>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        )}
        {/* 'Load More' button */}
        <Button
          className="p-2 w-50 mx-5 bg-secondary border-0"
          onClick={handleLoadMore}
        >
          Load more
        </Button>
      </>
    </div>
  );
};

export default Movies;
