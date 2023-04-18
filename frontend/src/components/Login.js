import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { useAppState } from "../AppContext";

const Login = (props) => {
  const navigate = useNavigate();
  const { appState, dispatch } = useAppState();
  const { isLoggedIn, user } = appState;

  function handleCallbackResponse(response) {
    const userObject = jwt_decode(response.credential);

    dispatch({ type: "LOGIN", payload: userObject });
    document.getElementById("signinDiv").hidden = true;
    navigate("/");
  }

  const handleLogout = (e) => {
    dispatch({ type: "LOGOUT", payload: null });
    document.getElementById("signinDiv").hidden = false;
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "192797326854-5nuf5bi2g78u5qod7l4l1vu0b8gh62gq.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signinDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div id="signinDiv"></div>
      {isLoggedIn && (
        <button onClick={handleLogout} className="btn btn-primary">
          Sign Out
        </button>
      )}
      {user && Object.keys(user).length !== 0 && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h3>{user.name}</h3>
        </div>
      )}
    </div>
  );
};

export default Login;
