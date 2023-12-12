import React from "react";
import MyButtonComponent from "./button";

const ArtistFooter = ({ backClick, nextClick }) => {
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
        <MyButtonComponent label="Back" onClick={backClick} />
      </div>
      <div className="col-md-6 footer-next-button">
        <MyButtonComponent label="Next" onClick={nextClick} />
      </div>
    </div>
  </div>
</div>

  );
};

export default ArtistFooter;
