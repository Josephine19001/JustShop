import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: 30,
    },
    buttonColor: {
      backgroundColor: "#f01a7a",
      color: "#fff",
    },
    textField: {
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
      width: "100%",
    },
  })
);

export default useStyles;
