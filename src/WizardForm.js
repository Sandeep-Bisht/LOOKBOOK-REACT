// WizardForm.js
import React, { useState } from "react";
import MultiStep from "react-multistep";
import FirstForm from "./FirstForm";
<<<<<<< HEAD
import SecondForm from "SecondForm";
import ThirdForm from "./ThirdForm"
import FourthForm from "./FourthForm";
import FifthForm from "FifthForm";
import Preview from "Preview";
import "./styles/wizardForm.css";
=======
>>>>>>> b71d306 (resolve conflict)

const WizardForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
<<<<<<< HEAD
    currentLocation:{},
    proffesion:[],
    place:[],    
  });

  console.log("check form data", formData)

  const nextButtonStyle = {    
    color : "#fff",
    backgroundColor : "#8C6A54",
    border: "none",
    padding : "5px 10px "

  }

  const backButtonStyle = {
    color : "#fff",
    backgroundColor : "#8C6A54",
    border: "none",
    margin : "5px 5px",
    padding : "5px 10px" 
  }


=======
  });

>>>>>>> b71d306 (resolve conflict)
  const steps = [
    {
      name: "Step 1",
      component: <FirstForm formData={formData} setFormData={setFormData} />,
    },
    {
      name: "Step 2",
<<<<<<< HEAD
      component: <SecondForm formData={formData} setFormData={setFormData} />,
    },
    { name: "Step 3",
     component: <ThirdForm formData={formData} setFormData={setFormData} />
     },
     { name: "Step 4",
     component: <FourthForm formData={formData} setFormData={setFormData} />
     },
     { name: "Step 5",
     component: <FifthForm formData={formData} setFormData={setFormData} />
     },
     {
      name : "Step 6",
      component: <Preview formData={formData} setFormData={setFormData} />
     }
=======
      component: <Step2 formData={formData} setFormData={setFormData} />,
    },
    { name: "Step 3", component: <Step3 formData={formData} /> },
>>>>>>> b71d306 (resolve conflict)
  ];

  return (
    <section className="wizard-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mx-auto">
<<<<<<< HEAD
            <MultiStep 
            activeStep={0} 
            prevButton={{title: 'Back',style:backButtonStyle}}
            nextButton={{title: 'Next',style:nextButtonStyle}}
            steps={steps} onSubmit={onSubmit} 
            />
=======
            <MultiStep steps={steps} onSubmit={onSubmit} />
>>>>>>> b71d306 (resolve conflict)
          </div>
        </div>
      </div>
    </section>
  );
};

<<<<<<< HEAD

=======
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
>>>>>>> b71d306 (resolve conflict)

export default WizardForm;
