import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from '@core/assets/images/main-logo.png'

const BecomeAristHeader = () => {
  const navigate = useNavigate();
  return (
    <section className="artist-header">
      <div className="container-fluid">
        <div className="row  became-artist">
          <div className="col-md-6">
          <Link className="navbar-brand" to="/">
            <span className="main-logo">
              <h1>
              <img src={Logo} className="img-fluid" width={240}/>
              </h1>
            </span>
          </Link>
          </div>
          <div className="col-md-6 save-exit-button">
            <button className="btn px-3" type="button" onClick={()=>navigate('/')}>Save & Exit</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeAristHeader;