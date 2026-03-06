import React from "react";
const Avatar = ({ src, shape = "rounded-full", size = "w-24",...props }) => {
  return (
    <>
      <div className="avatar" {...props}>
        <div className={`${size} ${shape}`}>
          <img src={src} alt="avatar" />
        </div>
      </div>
    </>
  );
};
export default Avatar