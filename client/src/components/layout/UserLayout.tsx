import React, { FC } from "react";

import Menubar from "../navigation/MenuBar";
import Footer from "../shared/Footer";

const UserLayout: FC = ({ children }) => {
  return (
    <div>
      <Menubar />
      <div style={{minHeight: '80vh !important'}}>
      {children}
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
