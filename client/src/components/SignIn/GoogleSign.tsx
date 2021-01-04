import React, { FC } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";

import "./style.css";
import { googleSignIn } from "../../redux/actions/auth";

interface ILabel {
  label: string;
}
const GoogleSignIn: FC<ILabel> = ({ label }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  // let { from } = location.state || { from: { pathname: "/dashboard" } };
  const handleSucess = (response: any) => {
    const tokenId = response.tokenId;
    // history.replace(from);
    dispatch(googleSignIn(tokenId, history));
  };
  const handleFailure = (error: any) => {
    console.log("this is error", error);
  };

  return (
    <div>
      <GoogleLogin
        clientId="872447555823-12hjr6jasgu3eaotcju5adrqhoc7rsor.apps.googleusercontent.com"
        buttonText={label}
        onSuccess={handleSucess}
        onFailure={handleFailure}
        className="google-btn"
      />
    </div>
  );
};

GoogleSignIn.displayName = "GoogleSignIn";

export default GoogleSignIn;
