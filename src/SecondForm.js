import React from "react";
import { useForm, Controller } from "react-hook-form";

const SecondForm = ({ formData, setFormData }) => {
  const { handleSubmit, control, errors } = useForm();

  const handleChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };
  return (
    <>
      <section className="profile-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2>Step 2: Create Profile</h2>
            </div>
            <div className="col-md-6 mb-3">
              <input
                className="form-control"
                type="name"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="tel"
                className="form-control"
                placeholder="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SecondForm;
