import React, { useState, FC } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./style.css";
import { signIn } from "../../redux/actions/auth";
import Google from "./GoogleSign";
import Button from "../shared/Button";
import { AppState } from "../../types";

const SignIn: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, error } = useSelector(
    (state: AppState) => state.authentication
  );

  //regular sign in
  const initialState = {
    password: "",
    email: "",
  };
  const [user, setUser] = useState(initialState);

  const handleUserChange = (event: React.FormEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSignInClick = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(signIn(user.email, user.password, history));
  };

  return (
    <div className="container">
      <form className="form">
        <Link style={{ color: "black" }} className="home" to="/">
          <span>Go back to home</span>
        </Link>
        <div className="form-header">
          <h2>Log In</h2>
          <h4>
            New to this site?{" "}
            <Link style={{ color: "black" }} to="/register">
              <span className="sign-up-link">Sign Up </span>
            </Link>
          </h4>
        </div>
        <div className="form-input-container">
          <div className="form-input-items">
            <label>
              <h4>Email</h4>
            </label>
            <input
              onChange={handleUserChange}
              value={user.email}
              name="email"
              type="text"
            />
          </div>
          <div className="form-input-items">
            <label>
              <h4>Password</h4>
            </label>
            <input
              onChange={handleUserChange}
              value={user.password}
              name="password"
              type="password"
            />
          </div>
        </div>
        {error ? <div className="error">{error}</div> : null}
        <Link
          style={{ color: "black" }}
          className="forgot"
          to="/forgot-password"
        >
          <span>Forgot Password?</span>
        </Link>
        <Button
          labelName="Sign In"
          onClick={handleSignInClick}
          disabled={loading}
        />
        <div className="alternative">
          <h4>or log in with</h4>
        </div>
        <Google label="Log In" />
      </form>
    </div>
  );
};

SignIn.displayName = "SignIn Page";

export default SignIn;
