import { applyMiddleware, createStore, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";

import createRootReducer from "./reducers/index";
import { AppState } from "../types";

const initState: AppState = {
  products: {
    allProducts: [],
    loading: false,
    error: "",
    currentProduct: {},
  },
  users: {
    allUsers: [],
    loading: false,
    error: "",
  },
  authentication: {
    currentUser: {
      id: "",
      role: "",
      email: "",
      firstName: "",
      lastName: "",
      iat: 0,
      exp: 0,
    },
    token: null,
    error: "",
    loading: false,
    isAuthenticated: false,
  },
  cart: {
    inCart: [],
  },
  alert: { type: "", message: "" },
  orders: {
    orders: [],
    loading: false,
    error: "",
  },
};
const persistConfig = {
  key: "persistedStore",
  storage,
};
const persistedReducer = persistReducer(persistConfig, createRootReducer());

export default function makeStore(initialState = initState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [thunk, sagaMiddleware];
  let composeEnhancers = compose;

  if (process.env.NODE_ENV === "development") {
    if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
  }

  const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  let persistor = persistStore(store);
  // sagaMiddleware.run(rootSaga);

  if ((module as any).hot) {
    (module as any).hot.accept("./reducers", () => {
      const nextReducer = require("./reducers").default;
      store.replaceReducer(nextReducer);
    });
  }
  return { store, persistor };
}
