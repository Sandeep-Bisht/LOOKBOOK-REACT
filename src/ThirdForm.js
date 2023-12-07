<<<<<<< HEAD
import React, { useState } from "react";
=======
import React from "react";
>>>>>>> 512e5a7 (design wizard form ui)
import { AiOutlineHome } from "react-icons/ai";
import "styles/thirdForm.css";

const ThirdForm =  ({ formData, setFormData }) => {
<<<<<<< HEAD

  const [artistArray] = useState([])

  const handleChange = (proffesion) => {
    console.log("value", proffesion)
    const index = artistArray.indexOf(proffesion);
    if (index !== -1) {
      // Element found, remove it using splice
      artistArray.splice(index, 1);
    } else {
      artistArray.push(proffesion)
    }
   
    console.log(artistArray,"check array")
    setFormData({...formData, proffesion : artistArray})
  };

  

=======
>>>>>>> 512e5a7 (design wizard form ui)
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
<<<<<<< HEAD
                <div className="artist-card"  onClick={(e)=> handleChange("Hair")}>
                  <div>
                    <AiOutlineHome />
                  </div>
                  <div >
=======
                <div className="artist-card">
                  <div>
                    <AiOutlineHome />
                  </div>
                  <div>
>>>>>>> 512e5a7 (design wizard form ui)
                    <span>Hair</span>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
<<<<<<< HEAD
                <div className="artist-card"  onClick={(e)=> handleChange("MakeUp")}>
                  <div>
                    <AiOutlineHome />
                  </div>
                  <div >
=======
                <div className="artist-card">
                  <div>
                    <AiOutlineHome />
                  </div>
                  <div>
>>>>>>> 512e5a7 (design wizard form ui)
                    <span>Make-up</span>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
<<<<<<< HEAD
                <div className="artist-card"  onClick={(e)=> handleChange("Dressing")}>
=======
                <div className="artist-card">
>>>>>>> 512e5a7 (design wizard form ui)
                  <div>
                    <AiOutlineHome />
                  </div>
                  <div>
                    <span>Dressing</span>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
<<<<<<< HEAD
                <div className="artist-card"  onClick={(e)=> handleChange("Tattos")}>
=======
                <div className="artist-card">
>>>>>>> 512e5a7 (design wizard form ui)
                  <div>
                    <AiOutlineHome />
                  </div>
                  <div>
                    <span>Tattos</span>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
<<<<<<< HEAD
                <div className="artist-card"  onClick={(e)=> handleChange("Message")}>
=======
                <div className="artist-card">
>>>>>>> 512e5a7 (design wizard form ui)
                  <div>
                    <AiOutlineHome />
                  </div>
                  <div>
                    <span>Message</span>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
<<<<<<< HEAD
                <div className="artist-card"  onClick={(e)=> handleChange("Cabin")}>
=======
                <div className="artist-card">
>>>>>>> 512e5a7 (design wizard form ui)
                  <div>
                    <AiOutlineHome />
                  </div>
                  <div>
                    <span>Cabin</span>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
<<<<<<< HEAD
                <div className="artist-card"  onClick={(e)=> handleChange("Potraits")}>
=======
                <div className="artist-card">
>>>>>>> 512e5a7 (design wizard form ui)
                  <div>
                    <AiOutlineHome />
                  </div>
                  <div>
                    <span>Potraits</span>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
<<<<<<< HEAD
                <div className="artist-card"  onClick={(e)=> handleChange("NailArt")}>
=======
                <div className="artist-card">
>>>>>>> 512e5a7 (design wizard form ui)
                  <div>
                    <AiOutlineHome />
                  </div>
                  <div>
                    <span>Nail art</span>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
<<<<<<< HEAD
                <div className="artist-card"  onClick={(e)=> handleChange("Grooming")}>
=======
                <div className="artist-card">
>>>>>>> 512e5a7 (design wizard form ui)
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
