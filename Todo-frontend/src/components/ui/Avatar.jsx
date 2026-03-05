import React from "react";
const Avatar = ({ src, shape = "rounded-full", size = "w-24" }) => {
  return (
    <>
      <div className="avatar">
        <div className={`${size} ${shape}`}>
          <img src={src} alt="avatar" />
        </div>
      </div>
    </>
  );
};
export default Avatar