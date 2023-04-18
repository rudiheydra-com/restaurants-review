import React, { createContext, useContext, useReducer } from "react";

const AppContext = createContext();

const initialState = {
  isLoggedIn: false,
  user: null,
};

export const UPDATE_REVIEW = "UPDATE_REVIEW";

export const updateReview = (review) => ({
  type: UPDATE_REVIEW,
  payload: review,
});

function appReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLoggedIn: true, user: action.payload };
    case "LOGOUT":
      return { ...state, isLoggedIn: false, user: null };
    case UPDATE_REVIEW:
      return {
        ...state,
        review: action.payload,
      };
    default:
      return state;
  }
}

function AppContextProvider(props) {
  const [appState, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ appState, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
}

function useAppState() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppContextProvider");
  }
  return context;
}

export { AppContextProvider, useAppState };
