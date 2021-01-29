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

import useStyles from "../ChangePassword/style";
import { AppState } from "../../types";
import { updateProfile } from "../../redux/actions/auth";

const UpdateProfile: FC = () => {
  const { loading, currentUser } = useSelector(
    (state: AppState) => state.authentication
  );
  const [firstName, setFirstName] = useState(currentUser?.firstName);
  const [lastName, setLastName] = useState(currentUser?.lastName);
  const [email, setEmail] = useState(currentUser?.email);
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleFirstNameChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFirstName(event.currentTarget.value);
  };
  const handleEmailChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(event.currentTarget.value);
  };
  const handleLastNameChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLastName(event.currentTarget.value);
  };

  function handleChangeClick(event: React.FormEvent) {
    event.preventDefault();

    dispatch(
      updateProfile({
        firstName,
        lastName,
        email,
      })
    );
  }
  return (
    <Grid className={classes.container} container={true} justify="center">
      <Grid item={true} xs={12} md={10} lg={6}>
        <h2>Update Profile</h2>
        <Card elevation={4} raised={true} variant="elevation">
          <CardContent>
            <form>
              <Typography variant="overline">First Name</Typography>
              <TextField
                placeholder="First Name"
                name="firstName"
                fullWidth={true}
                onChange={handleFirstNameChange}
                value={firstName}
                margin="dense"
                variant="outlined"
                type="text"
                label="firstName"
                color="primary"
              />
              <Divider variant="fullWidth" />
              <TextField
                placeholder="Last Name"
                name="lastName"
                fullWidth={true}
                onChange={handleLastNameChange}
                value={lastName}
                margin="dense"
                variant="outlined"
                type="texr"
                label="Last Name"
                color="primary"
              />
              <Divider variant="fullWidth" />
              <Typography variant="overline">Email</Typography>
              <TextField
                placeholder="Email"
                name="email"
                onChange={handleEmailChange}
                fullWidth={true}
                value={email}
                required={true}
                margin="dense"
                variant="outlined"
                type="text"
                label="Email"
                color="primary"
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

export default UpdateProfile;
