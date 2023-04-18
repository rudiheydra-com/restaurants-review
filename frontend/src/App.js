import React, { useContext, useEffect } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/AddReview";
import Login from "./components/Login";
import RestaurantsList from "./components/RestaurantsList";
import Restaurant from "./components/Restaurant";

import { useAppState } from "./AppContext";

function App(props) {
  const { appState, dispatch } = useAppState();
  const { isLoggedIn, user } = appState || {};

  async function handleLogin(userObject) {
    dispatch({ type: "LOGIN", payload: userObject });
  }

  async function logout() {
    dispatch({ type: "LOGOUT" });
  }

  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/restaurants" className="navbar-brand">
          Restaurant Reviews
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/restaurants"} className="nav-link">
              Restaurants
            </Link>
          </li>
          <li className="nav-item">
            {isLoggedIn ? (
              <a
                href="#"
                onClick={() => logout()}
                className="nav-link"
                style={{ cursor: "pointer" }}
              >
                Logout {user.name}
              </a>
            ) : (
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            )}
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<RestaurantsList />} />
          <Route path="/restaurants" element={<RestaurantsList />} />
          <Route
            path="/restaurants/:id/review/"
            element={<AddReview {...props} user={user} />}
          />
          <Route
            path="/restaurants/id/:id"
            element={<Restaurant {...props} user={user} />}
          />
          <Route
            path="/login"
            element={
              <Login
                login={handleLogin}
                user={user}
                setUserContext={props.setUserContext}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
