import React from "react";
import { Link, useNavigate } from "react-router-dom";

const BecomeAristHeader = () => {
  const navigate = useNavigate();
  return (
    <section className="artist-header">
      <div className="container">
        <div className="row  became-artist">
          <div className="col-md-6">
          <Link className="navbar-brand" to="/">
            <span className="main-logo">
              <h1>
              <img src="images/main-logo.png" className="img-fluid" height={35}/>
              </h1>
            </span>
          </Link>
          </div>
          <div className="col-md-6 save-exit-button">
            <button className="btn" type="button" onClick={()=>navigate('/')}>Save & Exit</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeAristHeader;
