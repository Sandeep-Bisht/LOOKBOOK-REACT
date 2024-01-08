import React from "react";
import CommonButton from "./commonButton";

const ArtistFooter = ({ backClick, nextClick, nextDisabled }) => {
  return (
   <div className="footer">
  <div className="container">
    <div className="row">
      <div className="col-md-12 d-flex justify-content-evenly">
        <CommonButton label="Back" onClick={backClick} />
        <CommonButton label="Next" onClick={nextClick} disabled={nextDisabled}/>
      </div>
    </div>
  </div>
</div>

  );
};

export default ArtistFooter;