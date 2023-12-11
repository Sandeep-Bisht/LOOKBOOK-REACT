import React, { useState } from 'react';
import ArtistFooter from './artistFooter';
import { useNavigate } from 'react-router-dom';

const CompleteKYC = () => {
    let navigate = useNavigate()
  const [aadharFront, setAadharFront] = useState(null);
  const [aadharBack, setAadharBack] = useState(null);
  const [panCard, setPanCard] = useState(null);

  const handleAadharFrontChange = (event) => {
    const file = event.target.files[0];
    setAadharFront(file);
  };

  const handleAadharBackChange = (event) => {
    const file = event.target.files[0];
    setAadharBack(file);
  };

  const handlePanCardChange = (event) => {
    const file = event.target.files[0];
    setPanCard(file);
  };

  const handleRemoveImage = (setImage) => {
    setImage(null);
  };

  return (
    <>
      <section className="about">
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-12">
              <h1 className="text-center">Complete your KYC</h1>
            </div>
          </div>
        </div>
      </section>

      <div className="image-upload-container">
        <div className="image-upload">
          <h3>Aadhar Card Front</h3>
          <input type="file" accept="image/*" onChange={handleAadharFrontChange} />
          {aadharFront && (
            <div className="image-preview">
              <img src={URL.createObjectURL(aadharFront)} alt="Aadhar Card Front"  className='img-fluid'/>
              <button onClick={() => handleRemoveImage(setAadharFront)}>Remove</button>
            </div>
          )}
        </div>

        <div className="image-upload">
          <h3>Aadhar Card Back</h3>
          <input type="file" accept="image/*" onChange={handleAadharBackChange} />
          {aadharBack && (
            <div className="image-preview">
              <img src={URL.createObjectURL(aadharBack)} alt="Aadhar Card Back"  className='img-fluid'/>
              <button onClick={() => handleRemoveImage(setAadharBack)}>Remove</button>
            </div>
          )}
        </div>

        <div className="image-upload">
          <h3>PAN Card</h3>
          <input type="file" accept="image/*" onChange={handlePanCardChange} />
          {panCard && (
            <div className="image-preview">
              <img src={URL.createObjectURL(panCard)} alt="PAN Card"  className='img-fluid'/>
              <button onClick={() => handleRemoveImage(setPanCard)}>Remove</button>
            </div>
          )}
        </div>
      </div>


      <ArtistFooter
        backClick={() => navigate("/become-a-artist/pricing")}
        nextClick={() => navigate("/become-a-artist/upload-cerificates")}
      />
    </>
  );
};

export default CompleteKYC;
