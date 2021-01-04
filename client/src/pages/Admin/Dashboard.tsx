import React, { FC } from "react";

import Dashboard from "../../components/Dashboard/Dashboard";
import AdminLayout from "../../components/layout/AdminLayout";

const DashboardPage: FC = () => {
  return (
    <AdminLayout>
      <Dashboard />
    </AdminLayout>
  );
};

DashboardPage.displayName = "DashboardPage Page";

export default DashboardPage;
