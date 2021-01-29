import React, { useState, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Divider,
  Button,
  Grid,
} from "@material-ui/core";

import useStyles from "./style";
import { AppState } from "../../types";
import { changePassword } from "../../redux/actions/auth";
import { alertFailure } from "../../redux/actions/alert";

const ChangePassword: FC = () => {
  const { loading, currentUser } = useSelector(
    (state: AppState) => state.authentication
  );
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState(currentUser.email);
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleOldPasswordChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setOldPassword(event.currentTarget.value);
  };
  const handleEmailChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(event.currentTarget.value);
  };
  const handleNewPasswordChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewPassword(event.currentTarget.value);
  };
  const handleConfirmPasswordChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setConfirmPassword(event.currentTarget.value);
  };

  function handleChangeClick(event: React.FormEvent) {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      dispatch(alertFailure("Passwords do not match"));
    } else {
      email && dispatch(changePassword(email, oldPassword, newPassword));
    }
    window.location.reload(false);
  }

  return (
    <Grid className={classes.container} container={true} justify="center">
      <Grid item={true} xs={12} md={10} lg={6}>
        <h2>Change Password</h2>
        <Card elevation={4} raised={true} variant="elevation">
          <CardContent>
            <form>
              <Typography variant="overline">Email</Typography>
              <TextField
                placeholder="Email"
                name="email"
                fullWidth={true}
                onChange={handleEmailChange}
                value={email}
                required={true}
                margin="dense"
                helperText={"This field is required"}
                variant="outlined"
                type="email"
                label="email"
                color="primary"
                // error={error.name}
              />
              <Divider variant="fullWidth" />
              <TextField
                placeholder="Old password"
                name="old-password"
                fullWidth={true}
                onChange={handleOldPasswordChange}
                value={oldPassword}
                required={true}
                margin="dense"
                helperText={"This field is required"}
                variant="outlined"
                type="password"
                label="Old password"
                color="primary"
                // error={error.name}
              />
              <Divider variant="fullWidth" />
              <Typography variant="overline">New password</Typography>
              <TextField
                placeholder="New password"
                name="new-password"
                onChange={handleNewPasswordChange}
                fullWidth={true}
                value={newPassword}
                required={true}
                margin="dense"
                helperText={"This field is required"}
                variant="outlined"
                type="password"
                label="New password"
                color="primary"
                // error={error.profession}
              />
              <Divider variant="fullWidth" />
              <Typography variant="overline">Confirm password</Typography>
              <TextField
                placeholder="Comfirm password"
                name="comfirm-password"
                onChange={handleConfirmPasswordChange}
                fullWidth={true}
                value={confirmPassword}
                required={true}
                margin="dense"
                helperText={"This field is required"}
                variant="outlined"
                type="password"
                label="Confirm password"
                color="primary"
                // error={error.profession}
              />
              <Button
                className={classes.buttonColor}
                variant="contained"
                disabled={loading}
                fullWidth={true}
                onClick={handleChangeClick}
              >
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
