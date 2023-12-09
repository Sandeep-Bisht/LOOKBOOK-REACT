import React from "react";
import { useNavigate } from "react-router-dom";
import ArtistFooter from "./artistFooter";
import { AiOutlineHome } from "react-icons/ai";

const DescribeYourself = () => {
  let navigate = useNavigate();

  const handleChange = (place) => {
 
  };

  return (
    <>
      <section className="describe-yourself">
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-12">
              <div className="">
                <h1 className="text-center">Which brand you used ?</h1>
              </div>
            </div>
          </div>

          <div className="row mb-5">
          <div className="col-md-12 ">
            <div className="row">
              <div className="col-md-7 mx-auto">
                <div className="artist-card" onClick={(e)=> handleChange("Entire-place")}>
                  <div className="card-body">
                    <h5 class="_6pu6cc">An entire place</h5>
                    <div>
                      <span>Guests have the whole place to themselves.</span>
                    </div>
                  </div>
                  <div className="card-icon">
                    <AiOutlineHome />
                  </div>
                </div>
              </div>

              <div className="col-md-7 mx-auto">
                <div className="artist-card">
                  <div className="card-body" onClick={(e)=> handleChange("Room")}>
                    <h5 class="_6pu6cc">A room</h5>
                    <div>
                      <span>
                        Guests have their own room in a home, plus access to
                        shared spaces.
                      </span>
                    </div>
                  </div>
                  <div className="card-icon">
                    <AiOutlineHome />
                  </div>
                </div>
              </div>

              <div className="col-md-7 mx-auto">
                <div className="artist-card">
                  <div className="card-body" onClick={(e)=> handleChange("Shared-room")}>
                    <h5 class="_6pu6cc">A shared room</h5>
                    <div>
                      <span>
                        Guests sleep in a room or common area that may be shared
                        with you or others.
                      </span>
                    </div>
                  </div>
                  <div className="card-icon">
                    <AiOutlineHome />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        </div>
      </section>

      <ArtistFooter
        backClick={() => navigate("/become-a-artist/about-you")}
        nextClick={() => navigate("/become-a-artist/location")}
      />
    </>
  );
};

export default DescribeYourself;
