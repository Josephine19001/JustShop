export const GET_ALL_PRODUCTS_REQUEST = "GET_ALL_PRODUCT_REQUEST";
export const GET_ALL_PRODUCTS_SUCCESS = "GET_ALL_PRODUCT_SUCCESS";
export const GET_ALL_PRODUCTS_FAILURE = "GET_ALL_PRODUCTS_FAILURE";
export const GET_PENDING_DATA = "GET_PENDING_DATA";
export const API_REQUEST = "API_REQUEST";
export const API_ERROR = "API_ERROR";

export const CREATE_PRODUCT_REQUEST = "CREATE_PRODUCT_REQUEST";
export const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS";
export const CREATE_PRODUCT_FAILURE = "CREATE_PRODUCT_FAILURE";
export const CREATE_PRODUCTS_PENDING = "CREATE_PRODUCTS_PENDING_DATA";

export const UPDATE_PRODUCT_REQUEST = "UPDATE_PRODUCT_REQUEST";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_FAILURE = "UPDATE_PRODUCT_FAILURE";

export const FILTER_PRODUCT_REQUEST = "FILTER_PRODUCT_REQUEST";
export const FILTER_PRODUCT_SUCCESS = "FILTER_PRODUCT_SUCCESS";
export const FILTER_PRODUCT_FAILURE = "FILTER_PRODUCT_FAILURE";

export const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_FAILURE = "DELETE_PRODUCT_FAILURE";

export const FIND_PRODUCT_BY_REQUEST = "FIND_PRODUCT_BY_REQUEST";
export const FIND_PRODUCT_BY_SUCCESS = "FIND_PRODUCT_BY_SUCCESS";
export const FIND_PRODUCT_BY_FAILURE = "FIND_PRODUCT_BY_FAILURE";

//Authentication ACTION
export const SIGN_IN_REQUEST = "SIGN_IN_REQUEST";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAILURE = "SIGN_IN_FAILURE";

export const GOOGLE_SIGN_IN_REQUEST = "GOOGLE_SIGN_IN_REQUEST";
export const GOOGLE_SIGN_IN_SUCCESS = "GOOGLE_SIGN_IN_SUCCESS";
export const GOOGLE_SIGN_IN_FAILURE = "GOOGLE_SIGN_IN_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const SIGN_OUT_REQUEST = "SIGN_OUT_REQUEST";
export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";
export const SIGN_OUT_FAILURE = "SIGN_OUT_FAILURE";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILURE = "FORGOT_PASSWORD_FAILURE";

//Users contants
export const GET_ALL_USERS_REQUEST = "GET_ALL_USERS_REQUEST";
export const GET_ALL_USERS_SUCCESS = "GET_ALL_USERS_SUCCESS";
export const GET_ALL_USERS_FAILURE = "GET_ALL_USERS_FAILURE";
export const GET_PENDING_USERS_DATA = "GET_PENDING_DATA";

export const FIND_USER_BY_REQUEST = "FIND_USER_BY_REQUEST";
export const FIND_USER_BY_SUCCESS = "FIND_USER_BY_SUCCESS";
export const FIND_USER_BY_FAILURE = "FIND_USER_BY_FAILURE";

export const GET_PRODUCT_BY_ID_REQUEST = "GET_PRODUCT_BY_ID_REQUEST";
export const GET_PRODUCT_BY_ID_SUCCESS = "GET_PRODUCT_BY_ID_SUCCESS";
export const GET_PRODUCT_BY_ID_FAILURE = "GET_PRODUCT_BY_ID_FAILURE";

export const FIND_USER_BY_EMAIL_REQUEST = "FIND_USER_BY_EMAIL_REQUEST";
export const FIND_USER_BY_EMAIL_SUCCESS = "FIND_USER_BY_EMAIL_SUCCESS";
export const FIND_USER_BY_EMAIL_FAILURE = "FIND_USER_BY_EMAIL_FAILURE";

export const BAN_REQUEST = "BAN_REQUEST";
export const BAN_SUCCESS = "BAN_SUCCESS";
export const BAN_FAILURE = "BAN_FAILURE";

export const CHANGE_ROLE_REQUEST = "CHANGE_ROLE_REQUEST";
export const CHANGE_ROLE_SUCCESS = "CHANGE_ROLE_SUCCESS";
export const CHANGE_ROLE_FAILURE = "CHANGE_ROLE_FAILURE";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

export const CHANGE_PASSWORD_REQUEST = "CHANGE_PASSWORD_REQUEST";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAILURE";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const INCREASE_QUANTITY = "INCREASE_QUANTITY";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const EMPTY_CART = "EMPTY_CART";

export const CHECKOUT_SUCCESS = "CHECKOUT_SUCCESS";
export const CHECKOUT_FAILURE = "CHECKOUT_FAILURE";
export const CHECKOUT_REQUEST = "CHECKOUT_REQUEST";

export const SEARCH_PRODUCT = "SEARCH_PRODUCT";

export const ALERT_SUCCESS = "ALERT_SUCCESS";
export const ALERT_ERROR = "ALERT_ERROR";
export const ALERT_CLEAR = "ALERT_CLEAR";

enum Role {
  admin = "ROLE_ADMIN",
  user = "ROLE_USER",
}
//Authentication
export type PasswordChangeState = {
  oldPassword: string;
  newPassword: string;
  email: string;
};
export type UserState = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  isBanned?: boolean;
  role?: Role;
};

export type getProductsRequestAction = {
  type: typeof GET_ALL_PRODUCTS_REQUEST;
};

export type getProductsSucessAction = {
  type: typeof GET_ALL_PRODUCTS_SUCCESS;
  payload: {
    products: ProductState[];
  };
};

export type getAllProductsFailureAction = {
  type: typeof GET_ALL_PRODUCTS_FAILURE;
  payload: {
    error: string;
  };
};

export type getUsersRequestAction = {
  type: typeof GET_ALL_USERS_REQUEST;
};

export type getUsersSucessAction = {
  type: typeof GET_ALL_USERS_SUCCESS;
  payload: {
    users: UserState[];
  };
};

export type getAllUsersFailureAction = {
  type: typeof GET_ALL_USERS_FAILURE;
  payload: {
    error: string;
  };
};

// export type searchProductRequestAction = {
//   type: typeof SEARCH_PRODUCT_REQUEST;
// };
// export type searchProductSuccessAction = {
//   type: typeof SEARCH_PRODUCT_SUCCESS;
//   payload: {
//     search: string;
//   };
// };
// export type searchProductFailureAction = {
//   type: typeof SEARCH_PRODUCT_FAILURE;
//   payload: {
//     error: string;
//   };
// };

export type ProductState = { amountInCart: number } & {
  _id: string;
  name: string;
  category: string;
  sizes: string;
  variants: string;
  image: string;
  description: string;
  price: string;
  quantity: number;
};
export type ProductsInitialState = {
  allProducts: ProductState[];
  loading: boolean;
  error: string;
  currentProduct: any;
  // searchProduct: string;
};
export type OrdersState = {
  orders: [];
  loading: boolean;
  error: string;
};

export type UsersInitialState = {
  allUsers: UserState[];
  loading: boolean;
  error: string;
};

export type AuthenticateUsersInitialState = {
  currentUser: any;
  token: string | null;
  error: string;
  loading: boolean;
  isAuthenticated: boolean;
};

export type AddProductAction = {
  type: typeof ADD_PRODUCT;
  payload: {
    product: ProductState;
  };
};
export type RemoveProductAction = {
  type: typeof REMOVE_PRODUCT;
  payload: {
    product: ProductState;
  };
};
export type increaseProductAction = {
  type: typeof INCREASE_QUANTITY;
  payload: {
    product: ProductState;
  };
};
export type decreaseProductAction = {
  type: typeof DECREASE_QUANTITY;
  payload: {
    product: ProductState;
  };
};
export type emptyProductAction = {
  type: typeof EMPTY_CART;
};

export type ProductActions =
  | AddProductAction
  | RemoveProductAction
  | SearchProductAction
  | getProductsSucessAction
  | getAllProductsFailureAction
  | getProductsRequestAction
  | increaseProductAction
  | decreaseProductAction
  | emptyProductAction;

export type UserActions =
  | getAllUsersFailureAction
  | getUsersSucessAction
  | getUsersRequestAction;

export type CartState = {
  inCart: ProductState[];
};

export type Search = {
  search: string;
};

export type SearchProductAction = {
  type: typeof SEARCH_PRODUCT;
  payload: {
    search: string;
  };
};

export type SearchState = {
  searchState: string;
};
export type Alert = {
  type?: string;
  message?: string;
};

export type AppState = {
  products: ProductsInitialState;
  authentication: AuthenticateUsersInitialState;
  users: UsersInitialState;
  cart: CartState;
  alert: Alert;
  orders?: OrdersState;
};
