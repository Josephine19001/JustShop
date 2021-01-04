import {
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_FAILURE,
  GET_ALL_USERS_SUCCESS,
  GET_PENDING_USERS_DATA,
  FIND_USER_BY_EMAIL_FAILURE,
  FIND_USER_BY_EMAIL_SUCCESS,
  FIND_USER_BY_EMAIL_REQUEST,
  UserState,
} from "../../types";
import { UsersInitialState } from "../../types";

const initialState: UsersInitialState = {
  allUsers: [],
  error: "",
  loading: false,
};

const userReducer = function (
  state = initialState,
  action: any
): UsersInitialState {
  switch (action.type) {
    case GET_ALL_PRODUCTS_REQUEST:
    case FIND_USER_BY_EMAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        allUsers: action.payload.users,
      };
    case FIND_USER_BY_EMAIL_SUCCESS:
      const { email } = action.payload;
      return {
        ...state,
        loading: false,
        allUsers: action.payload.users.map((u: UserState) => u.email === email),
      };
    case GET_ALL_PRODUCTS_FAILURE:
    case FIND_USER_BY_EMAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_PENDING_USERS_DATA:
      return { ...state };

    default:
      return { ...state };
  }
};

export default userReducer;
