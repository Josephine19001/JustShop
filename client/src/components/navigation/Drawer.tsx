import React, { FC } from "react";
import { useSelector } from "react-redux";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ListIcon from "@material-ui/icons/List";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";

import { AppState } from "../../types";
const Drawer: FC<{ open: boolean; currentUser: any }> = ({
  open,
  currentUser,
}) => {
  return (
    <div>
      <List>
        {currentUser.role === "ADMIN" ? (
          <div>
            <ListItem button>
              <Link to={"/admin"} style={{ textDecorationLine: "none" }}>
                <ListItemIcon>
                  <DashboardIcon />
                  <ListItemText primary={open ? "Dashboard" : null} />
                </ListItemIcon>
              </Link>
            </ListItem>
            <ListItem button>
              <Link to={"/users"} style={{ textDecorationLine: "none" }}>
                <ListItemIcon>
                  <PeopleIcon />
                  <ListItemText primary={open ? "Users" : null} />
                </ListItemIcon>
              </Link>
            </ListItem>

            <ListItem button>
              <Link to={"/products"} style={{ textDecorationLine: "none" }}>
                <ListItemIcon>
                  <ListIcon />
                  <ListItemText primary={open ? "Products" : null} />
                </ListItemIcon>
              </Link>
            </ListItem>
            <ListItem button>
              <Link
                to={"/create-product"}
                style={{ textDecorationLine: "none" }}
              >
                <ListItemIcon>
                  <AddBoxIcon />
                  <ListItemText primary={open ? "Create Product" : null} />
                </ListItemIcon>
              </Link>
            </ListItem>
            <Divider />
          </div>
        ) : null}
        <ListItem button>
          <Link to={"/update"} style={{ textDecorationLine: "none" }}>
            <ListItemIcon>
              <AccountBoxIcon />
              <ListItemText primary={open ? "Update Profile" : null} />
            </ListItemIcon>
          </Link>
        </ListItem>
        <ListItem button>
          <Link to={"/change-password"} style={{ textDecorationLine: "none" }}>
            <ListItemIcon>
              <LockOpenIcon />
              <ListItemText primary={open ? "Change Password" : null} />
            </ListItemIcon>
          </Link>
        </ListItem>
      </List>
    </div>
  );
};

export default Drawer;
