import * as React from "react";

// Functional component IconMovieOpenPlayOutline which renders an SVG icon
function IconMovieOpenPlayOutline(props) {
  return (
    <svg
      viewBox="0 0 24 24" // Define the viewBox for the SVG
      fill="currentColor" // Fill color of the SVG
      height="1em" // Height of the SVG icon
      width="1em" // Width of the SVG icon
      {...props} // Spread additional props passed to the component
    >
      {/* Path defining the shape of the icon */}
      <path d="M22 10v3.81c-.61-.35-1.28-.59-2-.72V12H4v8h9.09c.12.72.37 1.39.72 2H4a2 2 0 01-2-2V10h20m-5.29-2.93l-2.74-3.53-1.97.39 2.75 3.53 1.96-.39m4.91-.97l-.78-3.92-3.93.78 2.74 3.54 1.97-.4m-9.81 1.95L9.07 4.5l-1.97.41 2.75 3.53 1.96-.39M4.16 5.5l-.98.19a1.995 1.995 0 00-1.57 2.35L2 10l4.9-.97L4.16 5.5M17 22l5-3-5-3v6z" />
    </svg>
  );
}

// Export the IconMovieOpenPlayOutline component
export default IconMovieOpenPlayOutline;
