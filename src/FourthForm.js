import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import "styles/fourthForm.css";

const FourthForm = ({ formData, setFormData }) => {

  const [location] = useState([])

  const handleChange = (place) => {
    console.log("value", place)
    const index = location.indexOf(place);
    if (index !== -1) {
      // Element found, remove it using splice
      location.splice(index, 1);
    } else {
      location.push(place)
    }
   
    console.log(location,"check array")
    setFormData({...formData, place : location})
  };

  return (
    <section className="fourthForm-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3>What type of place will guests have?</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
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
  );
};

export default FourthForm;
