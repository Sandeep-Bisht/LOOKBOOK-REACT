import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import "styles/thirdForm.css";

const ThirdForm =  ({ formData, setFormData }) => {
  return (
    <section className="thirdform-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="thirdform-heading">
              Which of these best describes your proffesion?
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7 mx-auto">
            <div className="row">
              <div className="col-md-4">
                <div className="artist-card">
                  <div>
                    <AiOutlineHome />
                  </div>
                  <div>
                    <span>Hair</span>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="artist-card">
                  <div>
                    <AiOutlineHome />
                  </div>
                  <div>
                    <span>Make-up</span>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="artist-card">
                  <div>
                    <AiOutlineHome />
                  </div>
                  <div>
                    <span>Dressing</span>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="artist-card">
                  <div>
                    <AiOutlineHome />
                  </div>
                  <div>
                    <span>Tattos</span>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="artist-card">
                  <div>
                    <AiOutlineHome />
                  </div>
                  <div>
                    <span>Message</span>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="artist-card">
                  <div>
                    <AiOutlineHome />
                  </div>
                  <div>
                    <span>Cabin</span>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="artist-card">
                  <div>
                    <AiOutlineHome />
                  </div>
                  <div>
                    <span>Potraits</span>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="artist-card">
                  <div>
                    <AiOutlineHome />
                  </div>
                  <div>
                    <span>Nail art</span>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="artist-card">
                  <div>
                    <AiOutlineHome />
                  </div>
                  <div>
                    <span>Grooming</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    // <div>
    //   <h2>Step 3: Detail Information</h2>
    //   <textarea
    //   className='form-control'
    //     placeholder="Address"
    //     name="address"
    //     value={formData.address}
    //     readOnly
    //   />
    // </div>
  );
};

export default ThirdForm;
