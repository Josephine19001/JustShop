import axios from "axios";
import { Dispatch } from "redux";

import {
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_OUT_FAILURE,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  GOOGLE_SIGN_IN_FAILURE,
  GOOGLE_SIGN_IN_REQUEST,
  GOOGLE_SIGN_IN_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  UserState,
} from "../../types";
import { getDecodedUser } from "../../utils/getToken";
import { alertFailure, alertSuccess } from "./alert";

const baseURL = "/api/v1/users";

//Sign up action creators
const signUpRequest = () => {
  return {
    type: SIGN_UP_REQUEST,
  };
};
const signUpSuccess = (user: UserState, token: string) => {
  return {
    type: SIGN_UP_SUCCESS,
    payload: {
      user,
      token,
    },
  };
};
const signUpFailure = (error: string) => {
  return {
    type: SIGN_UP_FAILURE,
    payload: error,
  };
};

export const signUp = (user: UserState, history: any) => {
  return function (dispatch: Dispatch) {
    dispatch(signUpRequest());
    axios({
      method: "post",
      url: baseURL,
      data: user,
    })
      .then((response) => {
        const { data, token } = response.data;
        dispatch(signUpSuccess(data, token));
        dispatch(alertSuccess("Registration successful"));
        history.push("/signin");
      })
      .catch((error: any) => {
        dispatch(signUpFailure(error.response.data.message));
        dispatch(alertFailure(error.response.data.message));
      });
  };
};

//Sign in action creators
export const signInRequest = () => {
  return {
    type: SIGN_IN_REQUEST,
  };
};
const signInSuccess = (token: string, user: UserState) => {
  return {
    type: SIGN_IN_SUCCESS,
    payload: {
      token,
      user,
    },
  };
};
const signInFailure = (error: string) => {
  return {
    type: SIGN_IN_FAILURE,
    payload: error,
  };
};
export const signIn = (email: string, password: string, history: any) => {
  return function (dispatch: Dispatch) {
    dispatch(signInRequest());

    axios({
      method: "post",
      url: `${baseURL}/signin`,
      data: { email, password },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("USER-TOKEN")}`,
      },
    })
      .then((response) => {
        const { token, user } = response.data;
        localStorage.setItem("USER-TOKEN", token);
        dispatch(signInSuccess(token, user));
        dispatch(alertSuccess("Sign in successful"));
        history.push("/admin");
      })
      .catch((error) => {
        dispatch(signInFailure(error.response.data.message));

        dispatch(alertFailure(error.response.data.message));
      });
  };
};

//Google Sign in action creators

export const googleSignInRequest = () => {
  return {
    type: GOOGLE_SIGN_IN_REQUEST,
  };
};
const googleSignInSuccess = (token: string) => {
  return {
    type: GOOGLE_SIGN_IN_SUCCESS,
    payload: {
      // user,
      token,
    },
  };
};
const googleSignInFailure = (error: string) => {
  return {
    type: GOOGLE_SIGN_IN_FAILURE,
    payload: error,
  };
};

export const googleSignIn = (tokenId: string, history: any) => {
  return function (dispatch: Dispatch) {
    dispatch(googleSignInRequest());
    axios(
      {
        method: "post",
        url: `${baseURL}/google-signin`,
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
        data: { id_token: tokenId },
      }

      // { id_token: tokenId }
    )
      .then((response) => {
        console.log(response);

        const { token } = response.data;
        localStorage.setItem("USER-TOKEN", token);
        dispatch(signInSuccess(token, getDecodedUser(token)));

        dispatch(googleSignInSuccess(token));
        history.push("/admin");
      })
      .catch((error) => {
        dispatch(googleSignInFailure(error));
      });
  };
};

//sign out action creators
export const signOutRequest = function () {
  return {
    type: SIGN_OUT_REQUEST,
  };
};

export const signOutSuccess = function () {
  return {
    type: SIGN_OUT_SUCCESS,
  };
};

export const signOutFailure = function (error: string) {
  return {
    type: SIGN_OUT_FAILURE,
    payload: {
      error,
    },
  };
};

export const signOut = function (history: any) {
  return function async(dispatch: Dispatch) {
    dispatch(signOutRequest());
    try {
      dispatch(signOutSuccess());
      localStorage.clear();
      history.push("/signin");
    } catch (error) {
      dispatch(signOutFailure(error));
    }
    // if (localStorage.getItem("USER_TOKEN")) {
    //   dispatch(apiFailure());
    // } else {
    //   dispatch(signOutSuccess());
    // }
  };
};

//forgot-password action creators
export const forgotPasswordRequest = function () {
  return {
    type: FORGOT_PASSWORD_REQUEST,
  };
};

export const forgotPasswordSuccess = function () {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
  };
};

export const forgotPasswordFailure = function (error: string) {
  return {
    type: FORGOT_PASSWORD_FAILURE,
    payload: error,
  };
};

export const forgotPassword = function (email: string) {
  return function (dispatch: Dispatch) {
    dispatch(forgotPasswordRequest());
    axios({
      method: "post",
      url: `${baseURL}/forgot-password`,
      data: { email },
    })
      .then((response) => {
        dispatch(forgotPasswordSuccess());
        dispatch(alertSuccess("Email successfully sent"));
      })
      .catch((error) => {
        dispatch(forgotPasswordFailure(error.response.data.message));
        dispatch(alertFailure(error.response.data.message));
      });
  };
};

//reset password action creators
export const resetPasswordRequest = function () {
  return {
    type: RESET_PASSWORD_REQUEST,
  };
};

export const resetPasswordSuccess = function (token: any, password: any) {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload: { token, password },
  };
};

export const resetPasswordFailure = function (error: any) {
  return {
    type: RESET_PASSWORD_FAILURE,
    payload: error,
  };
};

export const resetPassword = function (password: string, resetToken: string) {
  return function (dispatch: Dispatch) {
    dispatch(resetPasswordRequest());
    axios({
      method: "put",
      url: `${baseURL}/reset-password/${resetToken}`,
      data: password,
      headers: {
        Authorization: `Bearer ${resetToken}`,
      },
    })
      .then((response) => {
        const { token, password } = response.data;
        dispatch(resetPasswordSuccess(token, password));
        localStorage.setItem("USER_TOKEN", token);
      })
      .catch((error) => {
        dispatch(resetPasswordFailure(error.response.data.message));
      });
  };
};

// Update Profile

export const updateProfileRequest = () => {
  return {
    type: UPDATE_USER_REQUEST,
  };
};
export const updateProfileSuccess = (user: UserState, token: string) => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: {
      user,
      token,
    },
  };
};
export const updateProfileFailure = (error: string) => {
  return {
    type: UPDATE_USER_FAILURE,
    payload: {
      error,
    },
  };
};

export const updateProfile = (user: UserState) => {
  return function (dispatch: Dispatch) {
    dispatch(updateProfileRequest());

    axios({
      method: "put",
      url: `${baseURL}/update`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("USER-TOKEN")}`,
      },
      data: user,
    })
      .then((response) => {
        const { user, token } = response.data;
        dispatch(updateProfileSuccess(user, token));
        dispatch(alertSuccess("Profile successfully updated"));
      })
      .catch((error) => {
        dispatch(updateProfileFailure(error.response.data.message));
        dispatch(
          alertFailure("Some details are missing, fill in required fields")
        );
      });
  };
};

// Change password
export const changePasswordRequest = () => {
  return {
    type: CHANGE_PASSWORD_REQUEST,
  };
};
export const changePasswordSuccess = (user: UserState) => {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    payload: { user },
  };
};
export const changePasswordFailure = (error: string) => {
  return {
    type: CHANGE_PASSWORD_FAILURE,
    payload: {
      error,
    },
  };
};

export const changePassword = (
  email: string,
  oldPassword: string,
  newPassword: string
) => {
  return function (dispatch: Dispatch) {
    dispatch(changePasswordRequest());

    axios({
      method: "put",
      url: `${baseURL}/change-password`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("USER-TOKEN")}`,
      },
      data: { email, oldPassword, newPassword },
    })
      .then((response) => {
        const res = response.data;
        dispatch(changePasswordSuccess(res));
        dispatch(alertSuccess("Password Changed"));
      })
      .catch((error) => {
        dispatch(changePasswordFailure(error.response.data.message));
        dispatch(alertFailure(error.response.data.message));
      });
  };
};
