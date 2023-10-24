// WizardForm.js
import React, { useState } from "react";
import MultiStep from "react-multistep";
import FirstForm from "./FirstForm";

const WizardForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const steps = [
    {
      name: "Step 1",
      component: <FirstForm formData={formData} setFormData={setFormData} />,
    },
    {
      name: "Step 2",
      component: <Step2 formData={formData} setFormData={setFormData} />,
    },
    { name: "Step 3", component: <Step3 formData={formData} /> },
  ];

  return (
    <section className="wizard-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mx-auto">
            <MultiStep steps={steps} onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </section>
  );
};

// const Step1 = ({ formData, setFormData }) => {
//   const handleChange = (e) => {
//     setFormData({ ...formData, name: e.target.value });
//   };

//   return (
//     <div>
//       <h2>Step 1: Personal Information</h2>
//       <input
//         type="text"
//         placeholder="Name"
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//       />
//     </div>
//   );
// };

const Step2 = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  return (
    <div>
      <h2>Step 2: Artist Information</h2>
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="tel"
        placeholder="Phone Number"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
      />
    </div>
  );
};

const Step3 = ({ formData }) => {
  return (
    <div>
      <h2>Step 3: Detail Information</h2>
      <textarea
        placeholder="Address"
        name="address"
        value={formData.address}
        readOnly
      />
    </div>
  );
};

export default WizardForm;
