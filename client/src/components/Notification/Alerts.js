import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

// Notification functional component
const Notification = ({ message, variant }) => {
  // State to control the visibility of the notification
  const [show, setShow] = useState(true);

  // Effect hook to automatically hide the notification after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(timer); // Cleanup function to clear the timer on unmount or re-render
  }, []);

  // Render the Alert component with appropriate props
  return (
    show && (
      <Alert
        position="top-end"
        style={{ position: "fixed", zIndex: 2, right: "0px", top: "100px" }}
        variant={variant}
        dismissible
      >
        {message}
      </Alert>
    )
  );
};

// Export the Notification component
export default Notification;
