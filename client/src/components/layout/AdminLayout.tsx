import React, { useState, FC, useEffect } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Container from "@material-ui/core/Container";
import Badge from "@material-ui/core/Badge";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import useStyles from "./style";
import { AppState } from "../../types";
import { signOut } from "../../redux/actions/auth";
import DrawerContent from "../navigation/Drawer";
import Alert from "../Alert/Alert";
import { getDecodedUser } from "../../utils/getToken";

const AdminLayout: FC = ({ children }) => {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, currentUser, error } = useSelector(
    (state: AppState) => state.authentication
  );
  
  useEffect(() => {
    
    dispatch({type: "SIGN_IN_SUCCESS", payload: {
      token: "",
      user: getDecodedUser(localStorage.getItem("USER-TOKEN"))
    }})
  
  }, [currentUser?.id])
  const [toggleAuthenticate, setToggleAuthenticate] = useState(isAuthenticated);

  const handleSignout = () => {
    dispatch(signOut(history));
    setToggleAuthenticate(!toggleAuthenticate);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.toolBar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open && classes.menuButtonHidden,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            <Link to="/" style={{ textDecorationLine: "none" }}>
              Go to Home Page
            </Link>
          </Typography>
          <div className={classes.right}>
            <Typography variant="h6" onClick={handleSignout}>
              Sign out
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <DrawerContent open={open} currentUser={currentUser} />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Alert />
          {children}
        </Container>
      </main>
    </div>
  );
};

export default AdminLayout;
