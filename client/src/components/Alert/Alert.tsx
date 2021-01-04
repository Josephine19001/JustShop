import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useSelector } from "react-redux";

import { AppState } from "../../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
      margin: "10px 0",
    },
  })
);

export default function DescriptionAlerts() {
  const classes = useStyles();
  const alert = useSelector((state: AppState) => state.alert);

  return (
    <div className={classes.root}>
      {(function () {
        switch (alert.type) {
          case "alert-danger":
            return (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                <strong>{alert.message}</strong>
              </Alert>
            );
          case "alert-success":
            return (
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                <strong>{alert.message}</strong>
              </Alert>
            );
          default:
            return null;
        }
      })()}
    </div>
  );
}
