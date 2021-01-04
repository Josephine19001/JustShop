import React, { FC } from "react";

import ReturnPolicy from "../../components/ReturnPolicy/index";
import UserLayout from "../../components/layout/UserLayout";

export default function ReturnPolicyPage() {
  return (
    <UserLayout>
      <ReturnPolicy />
    </UserLayout>
  );
}
ReturnPolicyPage.displayName = "ReturnPolicy Page";
