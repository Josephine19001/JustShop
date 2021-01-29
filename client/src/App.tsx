import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./App.css";
import Routes from "./Routing";
import { signInRequest } from "./redux/actions/auth";

function App() {
  const dispatch = useDispatch();

  if (localStorage.token) {
    dispatch(signInRequest());
  }

  useEffect(() => {
    dispatch(signInRequest());
  }, [dispatch]);
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
