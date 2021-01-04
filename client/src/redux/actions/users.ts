import axios from "axios";
import { Dispatch } from "redux";

import {
  GET_ALL_USERS_FAILURE,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  FIND_USER_BY_FAILURE,
  FIND_USER_BY_REQUEST,
  FIND_USER_BY_SUCCESS,
  FIND_USER_BY_EMAIL_FAILURE,
  FIND_USER_BY_EMAIL_REQUEST,
  FIND_USER_BY_EMAIL_SUCCESS,
  BAN_SUCCESS,
  BAN_FAILURE,
  BAN_REQUEST,
  CHANGE_ROLE_SUCCESS,
  CHANGE_ROLE_FAILURE,
  CHANGE_ROLE_REQUEST,
  UserActions,
  UserState,
} from "../../types";
import { alertSuccess, alertFailure } from "./alert";

const baseURL = "/api/v1/users";

export const getAllUsersRequest = (): UserActions => {
  return {
    type: GET_ALL_USERS_REQUEST,
  };
};
export const getAllUsersSuccess = (users: UserState[]): UserActions => {
  return {
    type: GET_ALL_USERS_SUCCESS,
    payload: {
      users,
    },
  };
};
export const getAllUsersFailure = (error: string): UserActions => {
  return {
    type: GET_ALL_USERS_FAILURE,
    payload: {
      error,
    },
  };
};

export const getAllUsers = () => {
  return function (dispatch: Dispatch) {
    dispatch(getAllUsersRequest());

    axios({
      method: "get",
      url: baseURL,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("USER-TOKEN")}`,
      },
    })
      .then((response) => {
        const users = response.data;
        dispatch(getAllUsersSuccess(users));
      })
      .catch((error) => {
        dispatch(getAllUsersFailure(error.response.data.message));
      });
  };
};

// Ban User
export const banRequest = () => {
  return {
    type: BAN_REQUEST,
  };
};
export const banSuccess = (user: UserState) => {
  return {
    type: BAN_SUCCESS,
    payload: {
      user,
    },
  };
};
export const banFailure = (error: string) => {
  return {
    type: BAN_FAILURE,
    payload: {
      error,
    },
  };
};

export const banUser = (email: string, history: any) => {
  return function (dispatch: Dispatch) {
    dispatch(banRequest());

    axios({
      method: "put",
      url: `${baseURL}/ban`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("USER-TOKEN")}`,
      },
      data: { email: email },
    })
      .then((response) => {
        const user = response.data;
        console.log(response.data);
        dispatch(banSuccess(user));
        dispatch(alertSuccess("User Banned successfully"));
        history.push("/users");
      })
      .catch((error) => {
        dispatch(banFailure(error.response.data.message));
        dispatch(alertFailure(error.response.data.message));
      });
  };
};

// Update Role
export const changeRoleRequest = () => {
  return {
    type: CHANGE_ROLE_REQUEST,
  };
};
export const changeRoleSuccess = (user: UserState) => {
  return {
    type: CHANGE_ROLE_SUCCESS,
    payload: {
      user,
    },
  };
};
export const changeRoleFailure = (error: string) => {
  return {
    type: CHANGE_ROLE_FAILURE,
    payload: {
      error,
    },
  };
};

export const changeUserRole = (email: string, history: any) => {
  return function (dispatch: Dispatch) {
    dispatch(changeRoleRequest());

    axios({
      method: "put",
      url: `${baseURL}/role`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("USER-TOKEN")}`,
      },
      data: { email: email },
    })
      .then((response) => {
        const user = response.data;
        console.log(response.data);
        dispatch(changeRoleSuccess(user));
        dispatch(alertSuccess("User role updated successfully"));
        history.push("/users");
      })
      .catch((error) => {
        dispatch(changeRoleFailure(error));
      });
  };
};

//find User action
export const getUserByIdRequest = () => {
  return {
    type: FIND_USER_BY_REQUEST,
  };
};
export const getUserByIdSuccess = (id: string) => {
  return {
    type: FIND_USER_BY_SUCCESS,
    payload: {
      id,
    },
  };
};
export const getUserByIdFailure = (error: string) => {
  return {
    type: FIND_USER_BY_FAILURE,
    payload: {
      error,
    },
  };
};

export const getUserById = (id: string) => {
  return function (dispatch: Dispatch) {
    dispatch(getUserByIdRequest());

    axios({
      method: "get",
      url: `${baseURL}/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("USER-TOKEN")}`,
      },
      data: id,
    })
      .then((response) => {
        const res = response.data;

        dispatch(getUserByIdSuccess(res));
      })
      .catch((error) => {
        dispatch(getUserByIdFailure(error));
      });
  };
};

//find User action
export const getUserByEmailRequest = () => {
  return {
    type: FIND_USER_BY_EMAIL_REQUEST,
  };
};
export const getUserByEmailSuccess = (email: string) => {
  return {
    type: FIND_USER_BY_EMAIL_SUCCESS,
    payload: {
      email,
    },
  };
};
export const getUserByEmailFailure = (error: string) => {
  return {
    type: FIND_USER_BY_EMAIL_FAILURE,
    payload: {
      error,
    },
  };
};

export const getUserByEmail = (email: string) => {
  return function (dispatch: Dispatch) {
    dispatch(getUserByEmailRequest());

    axios({
      method: "get",
      url: `${baseURL}/email`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("USER-TOKEN")}`,
      },
      data: email,
    })
      .then((response) => {
        const res = response.data;

        dispatch(getUserByEmailSuccess(res));
      })
      .catch((error) => {
        dispatch(getUserByEmailFailure(error));
      });
  };
};
