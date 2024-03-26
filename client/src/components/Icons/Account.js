import React, { Component } from "react";
import Icon from "@mdi/react"; // Importing the Icon component from '@mdi/react' library
import { mdiAccount } from "@mdi/js"; // Importing the mdiAccount icon from '@mdi/js' library

// Define a class component called App
class App extends Component {
  render() {
    // Render the Icon component with mdiAccount icon
    return (
      <Icon
        path={mdiAccount} // Specify the path of the icon
        title="User Profile" // Title attribute for accessibility
        size={1} // Size of the icon
        horizontal // Flip the icon horizontally
        vertical // Flip the icon vertically
        rotate={90} // Rotate the icon by 90 degrees
        color="red" // Color of the icon
        spin // Enable spinning animation for the icon
      />
    );
  }
}

// Create an instance of the App component
let profile = new App();

// Export the profile instance
export default profile;
