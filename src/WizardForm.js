// WizardForm.js
import React, { useState } from "react";
import MultiStep from "react-multistep";
import FirstForm from "./FirstForm";
import SecondForm from "SecondForm";
import ThirdForm from "./ThirdForm"
import FourthForm from "./FourthForm";
import FifthForm from "FifthForm";

const WizardForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    currentLocation:{}
  });

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


  const steps = [
    {
      name: "Step 1",
      component: <FirstForm formData={formData} setFormData={setFormData} />,
    },
    {
      name: "Step 2",
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
  ];

  return (
    <section className="wizard-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mx-auto">
            <MultiStep 
            activeStep={2} 
            prevButton={{title: 'Back',style:backButtonStyle}}
            nextButton={{title: 'Next',style:nextButtonStyle}}
            steps={steps} onSubmit={onSubmit} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};



export default WizardForm;
