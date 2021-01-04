import React, { FC, useState } from "react";
import { v4 as uuid } from "uuid";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./styles.css";
import MenuItem from "./MenuItem";
import logo from "../../assets/logo2.png";
import Cart from "../Cart/Cart";
import { AppState } from "../../types";
import { signOut } from "../../redux/actions/auth";

const lists = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Clothing",
    href: "/clothing",
  },
  {
    label: "Shoes",
    href: "/shoes",
  },
  {
    label: "Accessories",
    href: "/accessories",
  },

  {
    label: "Return Policy",
    href: "/return-policy",
  },
];

const MenuBar: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuthenticated, currentUser } = useSelector(
    (state: AppState) => state.authentication
  );

  const [toggleAuthenticate, setToggleAuthenticate] = useState(isAuthenticated);

  const handleSignout = () => {
    dispatch(signOut(history));
    setToggleAuthenticate(!isAuthenticated);
    window.location.reload(false);
  };

  return (
    <nav className="menu">
      <Link to="/">
        <img className="logo" src={`${logo}`} />
      </Link>
      <ul className="menu-bar">
        {lists.map((list) => {
          return (
            <MenuItem
              key={uuid()}
              id={uuid()}
              label={list.label}
              href={list.href}
            />
          );
        })}
      </ul>
      <div className="user-actions">
        {toggleAuthenticate || currentUser !== null ? (
          <h3 onClick={handleSignout}>Sign out</h3>
        ) : (
          <Link
            to="/signin"
            style={{ textDecorationLine: "none", color: "black" }}
          >
            LOGIN
          </Link>
        )}
        {currentUser !== null ? (
          <Link
            to="/admin"
            style={{ textDecorationLine: "none", color: "blue" }}
          >
            Dashboard
          </Link>
        ) : null}
        <Cart />
      </div>
    </nav>
  );
};

MenuBar.displayName = "Menubar";

export default MenuBar;
