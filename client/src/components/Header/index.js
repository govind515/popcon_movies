import React, { useContext, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import Auth from "../../utils/auth";
import { MyContext } from "../MyContext";
import Search from "../Search";
import IconHome from "../Icons/Home";
import Icon from "@mdi/react";
import IconMovieOpenPlayOutline from "../Icons/Movie";
import Shows from "../Icons/Shows";
import Naruto from "../../styles/images/anime.svg";
import pop from "../../styles/images/project logo.png";
import { mdiAccount } from "@mdi/js";
import { useLocation } from "react-router-dom";

const Header = () => {
  // Context
  const { myState } = useContext(MyContext);

  // State variables
  const [navbar, setNavbar] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  // Location hook
  const { pathname } = useLocation();

  // Logout function
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  // Function to change background color of navbar on scroll
  const changeBackground = () => {
    if (window.scrollY >= 180) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  // Function to handle closing offcanvas
  const handleOffcanvasClose = () => setShowOffcanvas(false);

  // Effect hook to add and remove scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  return (
    <>
      {/* Navbar component */}
      <Navbar
        key="lg"
        expand="lg"
        className={navbar ? "fixed-top" : ""}
        style={{ backgroundColor: "#406b81" }}
      >
        {/* #008080 */}
        <Container fluid>
          {/* Navbar brand */}
          <Navbar.Brand
            className="brand me-auto"
            href="/"
            style={{ fontSize: "30px" }}
          >
            <img
              src={pop}
              style={{
                width: "100px",
                height: "77px",
                backgroundColor: "transparent",
              }}
              alt=""
            ></img>
          </Navbar.Brand>

          {/* Navbar toggle button */}
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-$'lg'`}
            onClick={() => setShowOffcanvas(true)}
          />

          {/* Offcanvas component */}
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-$'lg'`}
            aria-labelledby={`offcanvasNavbarLabel-expand-$'lg'`}
            placement="end"
            show={showOffcanvas}
            onHide={handleOffcanvasClose}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-$'lg'`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="mx-auto" style={{ padding: "0" }}>
              {/* Navbar links */}
              <Nav className="flex-grow-1 ">
                {/* Home link */}
                <Link
                  className={`nav-link ${
                    pathname === "/" ? " px-2 rounded-3 bg-secondary" : "px-2"
                  }`}
                  to="/"
                  onClick={handleOffcanvasClose}
                >
                  <IconHome /> Home
                </Link>
                {/* Movies link */}
                <Link
                  className={`nav-link ${
                    pathname === "/movies"
                      ? " px-2 rounded-3 bg-secondary"
                      : "px-2"
                  }`}
                  to="/movies"
                  onClick={handleOffcanvasClose}
                >
                  <IconMovieOpenPlayOutline /> Movies
                </Link>
                {/* TV Shows link */}
                <Link
                  className={`nav-link ${
                    pathname === "/TV-Shows"
                      ? " px-2 rounded-3 bg-secondary"
                      : "px-2"
                  }`}
                  to="/TV-Shows"
                  onClick={handleOffcanvasClose}
                >
                  <Shows /> Shows
                </Link>
                {/* Anime link */}
                <Link
                  className={`nav-link ${
                    pathname === "/animepage"
                      ? " px-2 rounded-3 bg-secondary"
                      : "px-2"
                  }`}
                  to="/animepage"
                  onClick={handleOffcanvasClose}
                >
                  <img className="naruto" src={Naruto} alt=""></img>
                  Anime
                </Link>

                {/* Search component */}
                <Search />

                {/* Conditional rendering based on authentication */}
                {Auth.loggedIn() ? (
                  <>
                    {/* User profile link */}
                    <Link
                      className="nav-link mx-auto"
                     
                      to="/me"
                    >
                      <Icon path={mdiAccount} title="User Profile" size={1} />
                      {Auth.getProfile().data.username}'s profile{" "}
                      {/* Badge for notification count */}
                      <Badge
                        className={`${myState > 0 ? "shake-animation" : ""}`}
                        bg="secondary"
                      >
                        {myState}
                      </Badge>
                    </Link>

                    {/* Logout button */}
                    <button className="btn btn-outline-dark" onClick={logout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    {/* Login link */}
                    <Link
                      className={`nav-link ${
                        pathname === "/login"
                          ? " px-2 rounded-3 bg-secondary"
                          : "px-2"
                      }`}
                      onClick={handleOffcanvasClose}
                      to="/login"
                    >
                      Login
                    </Link>
                    {/* Signup link */}
                    <Link
                      className={`nav-link ${
                        pathname === "/logout"
                          ? " px-2 rounded-3 bg-secondary"
                          : "px-2"
                      }`}
                      onClick={handleOffcanvasClose}
                      to="/signup"
                    >
                      Signup
                    </Link>
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      {/* Placeholder div to maintain spacing when navbar is fixed */}
      {navbar && <div style={{ height: "56px" }}></div>}
    </>
  );
};

export default Header;
