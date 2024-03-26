import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importing Link for routing
import Notification from "../components/Notification/Alerts"; // Importing Notification component for displaying alerts
import { useMutation } from "@apollo/client"; // Importing useMutation hook from Apollo Client for executing mutations
import { ADD_USER } from "../utils/mutations"; // Importing ADD_USER mutation from mutations file
import "animate.css"; // Importing animate.css for animations
import Auth from "../utils/auth"; // Importing Auth utility for managing authentication

const Signup = () => {
  // State variables
  const [formState, setFormState] = useState({
    // State for form input values
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER); // Mutation hook for adding user
  const [notification, setNotification] = useState(null); // State for notification alerts
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password input value
  const [shakeButton, setShakeButton] = useState(false); // State to trigger shake animation on button
  console.log(error); // Logging any errors

  // Function to handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (formState.password !== confirmPassword) {
      // If passwords do not match
      setNotification({
        message: "Passwords do not match.", // Set notification message
        variant: "danger", // Set notification variant to danger
        key: Date.now(), // Set unique key for notification
      });
      setShakeButton(true); // Trigger shake animation on button
      setTimeout(() => setShakeButton(false), 1000); // Stop shake animation after 1 second
      return;
    }
    try {
      const { data } = await addUser({
        // Execute addUser mutation
        variables: { ...formState }, // Pass formState as variables
      });

      Auth.login(data.addUser.token); // Log user in with token from mutation response
    } catch (e) {
      console.error(e);
      setNotification({
        message: e.message, // Set notification message to error message
        variant: "danger", // Set notification variant to danger
        key: Date.now(), // Set unique key for notification
      });
    }
  };

  // Function to handle confirm password input changes
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value); // Update confirm password state
  };

  return (
    <main className="flex-row justify-center mb-4">
      {notification && ( // Render notification if exists
        <Notification
          message={notification.message} // Pass notification message
          variant={notification.variant} // Pass notification variant
          key={notification.key} // Pass notification key
        />
      )}
      <div className="container-fluid">
        <div className="row no-gutter">
          <div className="col-md-6 d-none d-md-flex bg-image2"></div>
          <div className="col-md-6 bg-light">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-xl-7 mx-auto">
                    <h3 className="display-4 text-center">Signup!</h3>
                    {data ? ( // If signup successful, display success message
                      <p>
                        Success! You may now head{" "}
                        <Link to="/">back to the homepage.</Link>
                      </p>
                    ) : (
                      <form onSubmit={handleFormSubmit}>
                      
                        {/* // Signup form */}
                        <div className="form-group mb-3">
                          <input
                            className="form-control rounded-pill border-0 shadow-sm px-4"
                            placeholder="Username"
                            name="username"
                            type="text"
                            value={formState.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <input
                            id="inputEmail"
                            type="email"
                            placeholder="Email address"
                            required
                            autoFocus
                            className="form-control rounded-pill border-0 shadow-sm px-4"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <input
                            className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                            placeholder="******"
                            name="password"
                            type="password"
                            value={formState.password}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <input
                            className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                          />
                        </div>
                        <button
                          type="submit"
                          className={`btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm ${
                            shakeButton
                              ? "animate__animated animate__shakeX"
                              : ""
                          }`}
                        >
                          Sign up
                        </button>
                        <div className="text-center d-flex justify-content-between mt-4">
                          <p>
                            Have an account? {/* Link to login page */}
                            <Link
                              to="/login"
                              className="font-italic text-muted"
                            >
                              <u>Login</u>
                            </Link>
                          </p>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
