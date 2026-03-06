import React from "react";

const Button = ({children, onClick, variant = "btn-secondary", outline = false,className="",...props }) => {
  return (
    <button
      className={`btn ${outline ? "btn-outline" : ""} ${variant} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;