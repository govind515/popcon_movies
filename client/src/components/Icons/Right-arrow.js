import * as React from "react";

// Functional component IconArrowRight which renders an SVG icon
function IconArrowRight(props) {
  return (
    <svg
      fill="currentColor" // Fill color of the SVG
      viewBox="0 0 16 16" // Define the viewBox for the SVG
      height="1em" // Height of the SVG icon
      width="1em" // Width of the SVG icon
      {...props} // Spread additional props passed to the component
    >
      {/* Path defining the shape of the icon */}
      <path
        fillRule="evenodd" // Fill rule for the path
        d="M1 8a.5.5 0 01.5-.5h11.793l-3.147-3.146a.5.5 0 01.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L13.293 8.5H1.5A.5.5 0 011 8z"
      />
    </svg>
  );
}

// Export the IconArrowRight component
export default IconArrowRight;
