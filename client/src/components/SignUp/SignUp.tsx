import React, { useState, FC, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../SignIn/style.css";
import { signUp } from "../../redux/actions/auth";
import Google from "../SignIn/GoogleSign";
import Button from "../shared/Button";
import { AppState } from "../../types";

const SignUp: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, currentUser, error } = useSelector(
    (state: AppState) => state.authentication
  );
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initialState);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userError, setUserError] = useState({
    passwordError: "Passwords do not match",
    error: error,
  });

  const handleUserChange = (event: React.FormEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  const handleConfirmPasswordChange = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const handleSignUpClick = (event: any) => {
    event.preventDefault();
    if (user.password !== confirmPassword) {
      alert("Password not correct");
    } else {
      dispatch(signUp(user, history));
    }
  };

  useEffect(() => {
    if (currentUser) {
      history.push("/");
    }
  }, [currentUser, history]);

  return (
    <div className="container">
      <form className="form">
        <Link style={{ color: "black" }} className="home" to="/">
          <span>Go back to home</span>
        </Link>
        <div className="form-header">
          <h2>Sign Up</h2>
          <h4>
            Already a member?{" "}
            <Link style={{ color: "black" }} to="/login">
              <span className="sign-up-link">Log In </span>
            </Link>
          </h4>
        </div>
        <div className="form-input-container">
          <div className="form-input-items">
            <label>
              <h4>First Name</h4>
            </label>
            <input
              onChange={handleUserChange}
              value={user.firstName}
              name="firstName"
              type="text"
            />
          </div>
          <div className="form-input-items">
            <label>
              <h4>Last Name</h4>
            </label>
            <input
              onChange={handleUserChange}
              value={user.lastName}
              name="lastName"
              type="text"
            />
          </div>
          <div className="form-input-items">
            <label>
              <h4>Email</h4>
            </label>
            <input
              onChange={handleUserChange}
              value={user.email}
              name="email"
              type="text"
              required
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
              required
            />
          </div>
          <div className="form-input-items">
            <label>
              <h4>Confirm Password</h4>
            </label>
            <input
              onChange={handleConfirmPasswordChange}
              value={confirmPassword}
              name="confirmPassword"
              type="password"
              required
            />
          </div>
        </div>
        {error !== null ? <div className="error">{error}</div> : null}
        <Button
          labelName="Sign Up"
          onClick={handleSignUpClick}
          disabled={loading}
        />
        <div className="alternative">
          <h4>or sign up in with</h4>
        </div>
        <Google label="Sign Up" />
      </form>
    </div>
  );
};

SignUp.displayName = "SignIn";

export default SignUp;
