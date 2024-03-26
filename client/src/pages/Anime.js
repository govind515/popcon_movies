import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import play from "../styles/images/play.svg"; // Assuming play.svg exists in this path
import { openDB } from "idb";

const Series = () => {
  // States for managing content, loading state, load more state, current page, and filter
  const [contents, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadmore, setIloadmore] = useState(false);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("bypopularity");

  // Function to fetch content from API
  const getContent = async () => {
    setIloadmore(true);
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/top/anime?type=tv&page=${page}&filter=${filter}`
      );

      // Constructing unique IDs for IndexedDB
      const dataToStore = response.data.data.map((item) => ({
        ...item,
        id: `${filter}-${page}-${item.mal_id}`,
      }));

      // Opening IndexedDB database and storing data
      const db = await openDB("anime-db", 1, {
        upgrade(db) {
          db.createObjectStore("anime", { keyPath: "id" });
        },
      });
      for (const item of dataToStore) {
        await db.put("anime", item);
      }

      // Updating content, loading state, and load more state
      setContent((prevContent) => [...prevContent, ...response.data.data]);
      setIsLoading(false);
      setIloadmore(false);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch content when page or filter changes
  useEffect(() => {
    getContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filter]);

  // Function to handle "Load More" button click
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Function to handle filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setContent([]);
    setPage(1);
  };

  return (
    <div>
      <>
        {/* Filter dropdown */}
        <Form.Control
          className="sort ms-auto m-4"
          as="select"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="bypopularity">popular</option>
          <option value="airing">airing</option>
          <option value="upcoming">upcoming</option>
          <option value="favorite">favorite</option>
        </Form.Control>
        <h1 className="text-center">Anime</h1>
        {/* Loading indicator */}
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
          // Render content when not loading
          <Row xs={1} md={4} className="g-5 m-4">
            {contents.map((content, index) => (
              <Col key={`${content.mal_id}-${index}`}>
                <Link to={`/anime?name=${content.title_english}`}>
                  <Card className="contentcard">
                    <Card.Img
                      className="cardimage"
                      src={content.images?.jpg?.large_image_url}
                      style={{ height: "464px", objectFit: "fill" }}
                      alt="Card image"
                    />
                    <Card.ImgOverlay>
                      <img className="playbtn" src={play} alt=""></img>
                      <div className="imageoverlay">
                        <Card.Title>{content.title}</Card.Title>
                        <Card.Text>{`Rank: ${content.rank}`}</Card.Text>
                      </div>
                    </Card.ImgOverlay>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        )}
        {/* Load more button or loading indicator */}
        {loadmore ? (
          <div class="anime1-wrapper">
            <div class="anime1-circle"></div>
            <div class="anime1-circle"></div>
            <div class="anime1-circle"></div>
            <div class="anime1-shadow"></div>
            <div class="anime1-shadow"></div>
            <div class="anime1-shadow"></div>
            <span>Loading</span>
          </div>
        ) : (
          <Button
            variant="outline-secondary"
            className="w-100"
            onClick={handleLoadMore}
          >
            Load more
          </Button>
        )}
      </>
    </div>
  );
};

export default Series;
