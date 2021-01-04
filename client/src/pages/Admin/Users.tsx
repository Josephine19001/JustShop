import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "../../types";
import { getAllUsers } from "../../redux/actions/users";
import AdminLayout from "../../components/layout/AdminLayout";
import Users from "../../components/Users/User";

export default function UsersPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  const { allUsers } = useSelector((state: AppState) => state.users);
  return (
    <AdminLayout>
      {allUsers ? <Users allUsers={allUsers} /> : <div>No User Found</div>}
    </AdminLayout>
  );
}
