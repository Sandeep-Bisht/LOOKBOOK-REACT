import React from "react";
import MyButtonComponent from "./button";

const ArtistFooter = ({ backClick, nextClick }) => {
  return (
   <div className="footer">
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-12">
        <div className="footer-line"></div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
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
