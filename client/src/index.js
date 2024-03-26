import React from "react";
import ReactDOM from "react-dom";

// Import Bootstrap CSS
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

// Import Bootstrap JavaScript components
import "bootstrap/js/src/collapse";
import "bootstrap/js/src/carousel";
import "bootstrap/js/src/modal";
import "bootstrap/js/src/dropdown";

// Import animate.css
import "animate.css/animate.min.css";

// Import custom CSS files
import "./styles/index.css";
import "./styles/loader.css";

// Import the root component of the application
import App from "./App";

// Import the function to report web vitals
import reportWebVitals from "./reportWebVitals";

// Render the root component within a React StrictMode for enhanced error checking
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// Call the function to report web vitals
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
