import { makeStyles, Theme, createStyles } from "@material-ui/core";
const drawerWidth = 380;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    hide: {
      display: "none",
    },
    list: {
      padding: 20,
    },

    menuButton: {
      marginRight: theme.spacing(2),
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      position: "absolute",
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-start",
    },
    button: {
      margin: theme.spacing(1),
      background: "#79d70f",
      color: "white",
    },
    btn: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);
export default useStyles;
