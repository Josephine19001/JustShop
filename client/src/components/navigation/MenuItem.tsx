import React, { FC } from "react";
import { Link } from "react-router-dom";

interface IList {
  label: string;
  href: string;
  id: any;
}

const style = {
  textDecoration: "none",
  color: "black",
};

const MenuItem: FC<IList> = ({ label, href }) => {
  return (
    <li className="menu-list">
      <Link style={style} to={href} className="link">
        <span className="label">{label}</span>
      </Link>
    </li>
  );
};

MenuItem.displayName = "MenuItem";

export default MenuItem;
