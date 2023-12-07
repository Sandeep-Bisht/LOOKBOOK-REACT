// WizardForm.js
import React, { useState } from "react";
import MultiStep from "react-multistep";
import FirstForm from "./FirstForm";
import SecondForm from "SecondForm";
import ThirdForm from "./ThirdForm"
import FourthForm from "./FourthForm";
import FifthForm from "FifthForm";
<<<<<<< HEAD
import Preview from "Preview";
import "./styles/wizardForm.css";
=======
>>>>>>> 512e5a7 (design wizard form ui)

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

=======
    currentLocation:{}
  });

>>>>>>> 512e5a7 (design wizard form ui)
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
<<<<<<< HEAD
     {
      name : "Step 6",
      component: <Preview formData={formData} setFormData={setFormData} />
     }
=======
>>>>>>> 512e5a7 (design wizard form ui)
  ];

  return (
    <section className="wizard-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mx-auto">
            <MultiStep 
<<<<<<< HEAD
            activeStep={0} 
=======
            activeStep={2} 
>>>>>>> 512e5a7 (design wizard form ui)
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

<<<<<<< HEAD
=======

>>>>>>> 512e5a7 (design wizard form ui)

export default WizardForm;
