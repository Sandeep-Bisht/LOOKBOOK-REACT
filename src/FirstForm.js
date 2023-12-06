import React from "react";
import Artist from "./Images/artist.jpg";
import "./styles/firstForm.css"

const FirstForm = ({ formData, setFormData }) => {

  return (
    <section className="first-form-wrapper">
      <div className="container">
        <div className="row profile-section">
          <div className="col-md-6">
            <h2>Step 1</h2>
            <p>
              Tell us about your place. In this step, we'll ask you which type of
              property you have and if guests will book the entire place or just a
              room. Then let us know the location and how many guests can stay.
            </p>
          </div>
          <div className="col-md-6">
            <div className="about-wizard-pic">
            <img className="img-fluid" src={Artist} alt="text" />
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstForm;
