import React, { FC } from "react";

import Menubar from "../navigation/MenuBar";
import Footer from "../shared/Footer";

const UserLayout: FC = ({ children }) => {
  return (
    <div>
      <Menubar />
      {children}
      <Footer />
    </div>
  );
};

export default UserLayout;
