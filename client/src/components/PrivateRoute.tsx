import React, { FC } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { AppState } from "../types";

export const AdminRoute: FC<{ path: string }> = ({
  children,
  path,
  ...rest
}) => {
  const { currentUser, isAuthenticated } = useSelector(
    (state: AppState) => state.authentication
  );

  return (
    <Route
      {...rest}
      exact
      render={({ location }) =>
        currentUser && isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export const UserRoute: FC<{ component: FC; path: string }> = ({
  component,
  path,
  ...rest
}) => {
  const { currentUser } = useSelector(
    (state: AppState) => state.authentication
  );

  return currentUser !== null ? (
    <Route exact path={path} component={component} {...rest} />
  ) : (
    <Redirect to={"/signin"} />
  );
};
