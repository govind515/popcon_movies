import * as React from "react";

// Functional component IconTvSharp which renders an SVG icon
function IconTvSharp(props) {
  return (
    <svg
      viewBox="0 0 512 512" // Define the viewBox for the SVG
      fill="currentColor" // Fill color of the SVG
      height="1em" // Height of the SVG icon
      width="1em" // Width of the SVG icon
      {...props} // Spread additional props passed to the component
    >
      {/* Path defining the shape of the icon */}
      <path d="M488 384H24a8 8 0 01-8-8V88a8 8 0 018-8h464a8 8 0 018 8v288a8 8 0 01-8 8z" />
      <path d="M116 400 H396 A4 4 0 0 1 400 404 V428 A4 4 0 0 1 396 432 H116 A4 4 0 0 1 112 428 V404 A4 4 0 0 1 116 400 z" />
    </svg>
  );
}

// Export the IconTvSharp component
export default IconTvSharp;
