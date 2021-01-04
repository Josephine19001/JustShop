import React, { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  TablePagination,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import "./style.ts";
import { ProductState } from "../../types";
import { deleteProduct } from "../../redux/actions/products";
import useStyles from "./style";
import columns from "../../interfaces/product";

const Products: FC<{ allProducts: ProductState[] }> = ({ allProducts }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const { searchProduct } = useSelector((state: AppState) => state.products);
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
  const handleDeleteClick = (id: string, name: string) => {
    alert(`Are you sure you want to delete ${name}?`);
    dispatch(deleteProduct(id, history));
    window.location.reload(false);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table arial-label="Countries table">
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                return <TableCell key={column.id}>{column.label}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {allProducts
              // .filter((product: { name: string }) =>
              //   product.name.includes(searchProduct)
              // )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product: any) => {
                return (
                  <TableRow>
                    <TableCell>
                      <img
                        width="100px"
                        src={product.image}
                        alt={product.name}
                      ></img>
                    </TableCell>
                    <TableCell>
                      {/* <Link
                        to={`/product/${product.name}`}
                        className={classes.link}
                      > */}
                      {product.name}
                      {/* </Link> */}
                    </TableCell>

                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.variants}</TableCell>
                    <TableCell>{product.sizes}</TableCell>
                    {product.quantity < 1 ? (
                      <TableCell style={{ color: "red" }}>
                        Out of Stock
                      </TableCell>
                    ) : (
                      <TableCell style={{ color: "blue" }}>
                        {product.quantity}
                      </TableCell>
                    )}
                    <TableCell>
                      <DeleteIcon
                        onClick={() =>
                          handleDeleteClick(product._id, product.name)
                        }
                        style={{ cursor: "pointer", color: "red" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`/product/${product._id}`}
                        style={{
                          textDecorationColor: "none",
                          color: "green",
                          cursor: "pointer",
                        }}
                      >
                        <EditIcon />
                      </Link>
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
        count={allProducts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Products;
