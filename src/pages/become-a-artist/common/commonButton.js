import React from 'react'

const CommonButton = ({ onClick, label, disabled}) => {
    return (
      <div className="my-componenet-button">
        <button className="get-started-button mb-3" onClick={onClick} disabled={disabled}>
          {label}
        </button>
      </div>
    );
  }

export default CommonButton