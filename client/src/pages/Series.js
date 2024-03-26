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

const Series = () => {
  // State variables
  const [contents, setContent] = useState([]); // State for TMDB TV show contents
  const [contents2, setContent2] = useState([]); // State for IMDb TV show contents
  const [isLoading, setIsLoading] = useState(true); // State to track loading state
  const [searchUs, setSearchUS] = useState(true); // State to toggle between TMDB and IMDb search
  const [page, setPage] = useState(1); // State for pagination
  const [filter, setFilter] = useState("popular"); // State for TMDB filter selection
  const [displayLimit, setDisplayLimit] = useState(20); // State for limiting displayed contents

  // Function to fetch TV show content
  const getContent = async () => {
    try {
      let res;
      const storageKeyIMDb = `content-IMDb`; // Key for storing IMDb data in local storage
      const storageKeyTMDB = `content-TMDB-${filter}-${page}`; // Key for storing TMDB data in local storage
      const savedDataJsonIMDb = localStorage.getItem(storageKeyIMDb); // Retrieve saved IMDb data from local storage
      const savedDataIMDb = savedDataJsonIMDb
        ? JSON.parse(savedDataJsonIMDb)
        : null; // Parse saved IMDb data from JSON format
      const savedDataJsonTMDB = localStorage.getItem(storageKeyTMDB); // Retrieve saved TMDB data from local storage
      const savedDataTMDB = savedDataJsonTMDB
        ? JSON.parse(savedDataJsonTMDB)
        : null; // Parse saved TMDB data from JSON format

      const currentTime = new Date().getTime(); // Get current time in milliseconds
      const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // Define one day in milliseconds

      if (searchUs) {
        // If searching using IMDb
        if (
          savedDataIMDb &&
          currentTime - savedDataIMDb.time < oneDayInMilliseconds
        ) {
          // If IMDb data is available in local storage and not expired
          setContent2((prevContents) => [
            ...prevContents,
            ...savedDataIMDb.contents,
          ]); // Update IMDb content state with saved data
        } else {
          // If IMDb data is not available in local storage or expired
          res = await axios.get(
            `https://imdb-api.com/en/API/MostPopularTVs/k_mmsg1u7d`
          ); // Fetch IMDb data from API
          const newData = {
            time: currentTime, // Store current time
            contents: res.data.items, // Store fetched data
          };
          localStorage.setItem(storageKeyIMDb, JSON.stringify(newData)); // Store fetched data in local storage
          setContent2((prevContents) => [...prevContents, ...newData.contents]); // Update IMDb content state with fetched data
        }
      } else {
        // If searching using TMDB
        if (
          savedDataTMDB &&
          currentTime - savedDataTMDB.time < oneDayInMilliseconds
        ) {
          // If TMDB data is available in local storage and not expired
          setContent((prevContents) => [
            ...prevContents,
            ...savedDataTMDB.contents,
          ]); // Update TMDB content state with saved data
        } else {
          // If TMDB data is not available in local storage or expired
          res = await axios.get(
            `https://api.themoviedb.org/3/tv/${filter}?language=en-US&page=${page}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`
          ); // Fetch TMDB data from API
          const newData = {
            time: currentTime, // Store current time
            contents: res.data.results, // Store fetched data
          };
          localStorage.setItem(storageKeyTMDB, JSON.stringify(newData)); // Store fetched data in local storage
          setContent((prevContents) => [...prevContents, ...newData.contents]); // Update TMDB content state with fetched data
        }
      }
      setIsLoading(false); // Set loading state to false
    } catch (err) {
      console.log(err); // Log any errors
    }
  };

  useEffect(() => {
    if (page === 1) {
      // If page is 1, reset content and display limit
      setContent([]);
      setDisplayLimit(20);
    }
    getContent(); // Fetch content on component mount and when page, filter, or searchUs state changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filter, searchUs]);

  // Function to handle 'Load More' button click
  const handleLoadMore = () => {
    setIsLoading(true); // Set loading state to true
    if (searchUs) {
      // If searching using IMDb
      setDisplayLimit((prevDisplayLimit) => prevDisplayLimit + 20); // Increase display limit
      setIsLoading(false); // Set loading state to false
    } else {
      setPage((prevPage) => prevPage + 1); // Increment page number
      setIsLoading(false); // Set loading state to false
    }
  };

  // Function to handle filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value); // Update filter state with selected value
    setPage(1); // Reset page number to 1
  };

  return (
    <div>
      <div className="sort-container">
        {!searchUs ? (
          <>
            <p>
              <img className="" src={filterlist} alt="Filter List" />
            </p>
            <Form.Control
              className="sort mt-5"
              as="select"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="popular">popular</option>
              <option value="top_rated">Top Rated</option>
              <option value="airing_today">Airing Today</option>
              <option value="on_the_air">On The Air</option>
            </Form.Control>
          </>
        ) : null}
        <label className="switch mx-5 mt-5">
          {" "}
          Search All
          <input
            type="checkbox"
            className="checkbox"
            onClick={() => setSearchUS(!searchUs)}
          />
          <div className="slider"></div>
        </label>
      </div>
      <h1 className="text-center">TV-Shows</h1>
      {isLoading ? (
        <div className="container mt-5">
          <div className="row">
            {Array(4)
              .fill(null)
              .map((_, idx) => (
                <div key={idx} className="col-md-3 mb-4">
                  <div className="card border-0 bg-dark">
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
        <Row xs={1} md={4} className="g-5 m-4">
          {searchUs
            ? contents2.slice(0, displayLimit).map((content) => (
                <Col key={content.id}>
                  <Link to={`/show?id=${content.id}`}>
                    <Card className="contentcard">
                      <Card.Img
                        className="cardimage"
                        src={content.image}
                        alt="Card image"
                      />
                      <Card.ImgOverlay>
                        <img className="playbtn" src={play} alt="Play Button" />
                        <div className="imageoverlay">
                          <Card.Title>{content.fullTitle}</Card.Title>
                          <Card.Text>{content.year}</Card.Text>
                        </div>
                        <div
                          className={
                            content.rankUpDown.includes("+")
                              ? "comment bg-success"
                              : "comment bg-danger"
                          }
                        >
                          {content.rankUpDown}
                        </div>
                        <div className="view">{content.imDbRating}</div>
                      </Card.ImgOverlay>
                    </Card>
                  </Link>
                </Col>
              ))
            : contents.map((content) => (
                <Col key={content.id}>
                  <Link to={`/details?id=${content.id}`}>
                    <Card className="contentcard">
                      <Card.Img
                        className="cardimage"
                        src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
                        alt="Card image"
                      />
                      <Card.ImgOverlay>
                        <img className="playbtn" src={play} alt="Play Button" />
                        <div className="imageoverlay">
                          <Card.Title>{content.original_name}</Card.Title>
                          <Card.Text>{content.first_air_date}</Card.Text>
                        </div>
                      </Card.ImgOverlay>
                    </Card>
                  </Link>
                </Col>
              ))}
        </Row>
      )}
      <Button
        className="p-2 w-50 mx-5 bg-secondary border-0"
        onClick={handleLoadMore}
      >
        Load more
      </Button>
    </div>
  );
};

export default Series;
