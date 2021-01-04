import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "../../types";
import { getUserByEmail } from "../../redux/actions/users";
import AdminLayout from "../../components/layout/AdminLayout";
import ChangePassword from "../../components/ChangePassword/ChangePassword";

export default function ChangePasswordPage() {
  return (
    <AdminLayout>
      <ChangePassword />>
    </AdminLayout>
  );
}
