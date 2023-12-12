import React from "react";
import { useNavigate } from "react-router-dom";
import ArtistFooter from "./artistFooter";

const PriceSetup = () => {

    let navigate = useNavigate()
  return (
    <>
      <section className="about">
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-12">
              <h1 className="text-center">Now, set your per-session price</h1>
            </div>
          </div>
        </div>
      </section>

      <ArtistFooter
        backClick={() => navigate("/become-a-artist/finish-setup")}
        nextClick={() => navigate("/become-a-artist/complete-KYC")}
      />
    </>
  );
};

export default PriceSetup;
