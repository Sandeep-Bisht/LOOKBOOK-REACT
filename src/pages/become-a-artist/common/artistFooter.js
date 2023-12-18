import React from "react";
import CommonButton from "./commonButton";

const ArtistFooter = ({ backClick, nextClick, nextDisabled }) => {
  return (
   <div className="footer fixed-bottom">
  <div className="container-fluid p-0">
    <div className="row">
      <div className="col-md-12 px-0">
        <div className="footer-line"></div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6 ps-5">
        <CommonButton label="Back" onClick={backClick} />
      </div>
      <div className="col-md-6 footer-next-button">
        <CommonButton label="Next" onClick={nextClick} disabled={nextDisabled}/>
      </div>
    </div>
  </div>
</div>

  );
};

export default ArtistFooter;
