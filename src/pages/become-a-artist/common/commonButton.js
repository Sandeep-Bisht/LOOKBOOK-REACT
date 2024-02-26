import React from 'react'

const CommonButton = ({ onClick, label, disabled}) => {
    return (
        <button className={`${label == "Back" ? "usr-common-action-btn": "usr-common-filled-btn"} mb-3 me-3 px-5`} onClick={onClick} disabled={disabled}>
          {label}
        </button>
    );
  }

export default CommonButton