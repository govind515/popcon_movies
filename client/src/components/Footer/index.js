import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleRight,
  faContactBook,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle,
  faLinkedinIn,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

// Footer component
const Footer = () => {
  return (
    <div>
      {/* Footer section */}
      <footer className="text-center text-white">
        <div className="container">
          {/* Navigation links section */}
          <section className="mt-5">
            <div className="row text-center d-flex justify-content-center pt-5">
              {/* Home link */}
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <Link to="/" className="text-white">
                    <FontAwesomeIcon icon={faArrowCircleRight} /> Home
                  </Link>
                </h6>
              </div>
              {/* Movies link */}
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <Link to="/movies#" className="text-white">
                    <FontAwesomeIcon icon={faArrowCircleRight} /> Movies
                  </Link>
                </h6>
              </div>
              {/* TV Series link */}
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <Link to="/TV-Shows" className="text-white">
                    <FontAwesomeIcon icon={faArrowCircleRight} /> TV-Series
                  </Link>
                </h6>
              </div>
              {/* Anime link */}
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <Link to="/animepage" className="text-white">
                    <FontAwesomeIcon icon={faArrowCircleRight} /> Anime
                  </Link>
                </h6>
              </div>
              {/* Contact link */}
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <a
                    href="https://mdglankush65.github.io/Portfolio/#contact"
                    className="text-white"
                  >
                    <FontAwesomeIcon icon={faArrowCircleRight} /> Contact
                  </a>
                </h6>
              </div>
            </div>
          </section>

          <hr className="my-5" />

          {/* About section */}
          <section className="mb-5">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <p>
                  PopcornPeek is a comprehensive MERN stack web application
                  offering real-time updates on trending movies, TV shows,
                  anime, and entertainment news. It serves as a one-stop
                  platform for entertainment enthusiasts seeking a personalized
                  viewing experience.
                </p>
              </div>
            </div>
          </section>

          {/* Social media links section */}
          <section className="text-center mb-5">
            {/* Contact link */}
            <a
              href="https://github.com/govind515"
              className="text-white me-4"
              target="blank"
            >
              <FontAwesomeIcon icon={faContactBook} />
            </a>
            {/* Google link */}
            <a
              href="mailto:govindparihar051@gmail.com"
              className="text-white me-4"
              target="blank"
            >
              <FontAwesomeIcon icon={faGoogle} />
            </a>
            {/* LinkedIn link */}
            <a
              href="https://www.linkedin.com/in/govind-parihar-230087276/"
              className="text-white me-4"
              target="blank"
            >
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            {/* GitHub link */}
            <a
              href="https://github.com/govind515"
              className="text-white me-4"
              target="blank"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </section>
        </div>
        {/* Copyright section */}
        <div className="text-center p-3">
          {" "}
          © 2023 Copyright:
          <p className="text-white">PopcornPeek</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
