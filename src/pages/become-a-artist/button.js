import React from "react";

const MyButtonComponent = ({ onClick, label }) => {
  return (
    <div className="my-componenet-button">
      <button className="get-started-button" onClick={onClick}>
        {label}
      </button>
    </div>
  );
};

export default MyButtonComponent;
