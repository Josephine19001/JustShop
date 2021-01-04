import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Paper,
  Typography,
  TablePagination,
} from "@material-ui/core";

import { UserState } from "../../types";
import { banUser, changeUserRole } from "../../redux/actions/users";
import useStyles from "../Products/style";
import { userCulumns } from "../../interfaces/product";

const Users: FC<{ allUsers: UserState[] }> = ({ allUsers }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const classes = useStyles();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleBanClick = (email: string) => {
    dispatch(banUser(email, history));
    window.location.reload(false);
  };
  const handleRoleChangeClick = (email: string) => {
    dispatch(changeUserRole(email, history));
    window.location.reload(false);
  };
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table arial-label="Countries table">
          <TableHead>
            <TableRow>
              {userCulumns.map((column) => {
                return <TableCell key={column.id}>{column.label}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers
              // .filter((product: { name: string }) =>
              //   product.name.includes(searchProduct)
              // )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user: any) => {
                return (
                  <TableRow>
                    <TableCell>
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell>{user.createAt}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.isBanned == false ? (
                        <Typography
                          variant="body2"
                          style={{ color: "blue", cursor: "pointer" }}
                          onClick={() => handleBanClick(user.email)}
                        >
                          False
                        </Typography>
                      ) : (
                        <Typography
                          variant="body2"
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => handleBanClick(user.email)}
                        >
                          True
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {user.role == "USER" ? (
                        <Typography
                          variant="body2"
                          onClick={() => handleRoleChangeClick(user.email)}
                          style={{ color: "green", cursor: "pointer" }}
                        >
                          User
                        </Typography>
                      ) : (
                        <Typography
                          variant="body2"
                          onClick={() => handleRoleChangeClick(user.email)}
                          style={{ color: "blue", cursor: "pointer" }}
                        >
                          Admin
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
          <Divider />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={allUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Users;
