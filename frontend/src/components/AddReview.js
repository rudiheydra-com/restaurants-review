import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";
import { useParams, Link } from "react-router-dom";

import { useAppState, updateReview } from "../AppContext";

const AddReview = (props) => {
  const initialReviewState = {
    id: null,
    name: "",
    rating: "",
    comments: "",
  };

  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);
  const { id } = useParams();
  const { appState, dispatch } = useAppState();
  const { isLoggedIn, review: appReview = {} } = appState;

  useEffect(() => {
    dispatch(
      updateReview({
        name: "",
        rating: "",
        comments: "",
        id: null,
      })
    );
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const updatedReview = { ...appReview, [name]: value };
    dispatch(updateReview(updatedReview));
  };

  const saveReview = () => {
    let data = {
      name: appReview.name,
      rating: appReview.rating,
      comments: appReview.comments,
      restaurant_id: id,
    };

    if (appReview.id) {
      data.id = appReview.id;
      RestaurantDataService.updateReview(data)
        .then(() => {
          setSubmitted(true);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      RestaurantDataService.createReview(data)
        .then(() => {
          setSubmitted(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const newReview = () => {
    setReview(initialReviewState);
    setSubmitted(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className="submit-form">
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={newReview}>
                Add Another Review
              </button>
              <Link
                to={"/restaurants/id/" + id}
                className="btn btn-primary ml-2"
              >
                Back to Restaurant
              </Link>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={appReview.name || ""}
                  onChange={handleInputChange}
                  name="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="comments">Comments</label>
                <textarea
                  className="form-control"
                  id="comments"
                  required
                  value={appReview.comments || ""}
                  onChange={handleInputChange}
                  name="comments"
                />
              </div>

              <button onClick={saveReview} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>Please log in.</div>
      )}
    </div>
  );
};

export default AddReview;
