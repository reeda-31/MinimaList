import React from "react";

const Button = ({children, onClick, variant = "btn-secondary", outline = false,className="" }) => {
  return (
    <button
      className={`btn ${outline ? "btn-outline" : ""} ${variant} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;