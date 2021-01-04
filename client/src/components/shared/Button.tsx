import React, { FC } from "react";

import "./styles.css";

interface IButton {
  onClick: any;
  disabled?: any;
  labelName: string;
  style?: any;
}

const Button: FC<IButton> = ({ onClick, disabled, labelName, style }) => {
  return (
    <button className="btn" onClick={onClick} disabled={disabled} style={style}>
      <span>{labelName}</span>
    </button>
  );
};

Button.displayName = "Button";

export default Button;
