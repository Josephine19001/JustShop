import { combineReducers } from "redux";
import { persist } from "../../components/services/reduxPersist";

import authentication from "./auth";
import products from "./products";
import users from "./users";
import cart from "./cart";
import alert from "./alert";
import orders from "./orders";

const persistConfig = {
  key: "persistedStore",
};
const persistedReducer = persist(persistConfig, cart);

const createRootReducer = () =>
  combineReducers({
    authentication,
    products,
    users,
    cart,
    alert,
    orders,
    persistedReducer,
  });

export default createRootReducer;
