import React, { useState } from 'react';
import ArtistFooter from './artistFooter';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'
import { ImCross } from "react-icons/im";
import { FaTrash } from "react-icons/fa6";


const CompleteKYC = () => {
  const { request_id } = useParams();
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
          {aadharFront && (
            <div className="multipale-image-display">
              <div className="dynamic-img-wrapper">
                <img src={URL.createObjectURL(aadharFront)} alt="Aadhar Card Front" style={{ height: "200px", width: "200px" }} className='img-fluid' />
                <button type="button" className="btn dropshadow-gallery" onClick={() => handleRemoveImage(setAadharFront)}>  <FaTrash /></button>
              </div>
            </div>
          )}
          <div>
            <Button
              component="label"
              variant="contained"
              className="mt-2 custom-add-card"
              htmlFor="adhar-front-image"
            >
              
              <input
                hidden
                type="file"
                id="adhar-front-image"
                onChange={handleAadharFrontChange}
                accept="image/*"
              />
               <div className="multipale-image-display">
              <div className="dynamic-img-wrapper">
                <h1>+</h1>
              </div>
            </div>
            </Button>
          </div>
        </div>

        <div className="image-upload">
          <h3>Aadhar Card Back</h3>
          {aadharBack && (
            <div className="multipale-image-display">
              <div className="dynamic-img-wrapper">
                <img src={URL.createObjectURL(aadharBack)} alt="Aadhar Card Back" style={{ height: "200px", width: "200px" }} className='img-fluid' />
                <button type="button" className="btn dropshadow-gallery" onClick={() => handleRemoveImage(setAadharBack)}>  <FaTrash /></button>
              </div>
            </div>
          )}
          <div>
            <Button
              component="label"
              variant="contained"
              className="mt-2 custom-add-card"
              htmlFor="adhar-back-image"
            >
              
              <input
                hidden
                type="file"
                id="adhar-back-image"
                onChange={handleAadharBackChange}
                accept="image/*"
              />
              
              <div className="multipale-image-display">
              <div className="dynamic-img-wrapper">
                <h1>+</h1>
              </div>
            </div>
            </Button>
          </div>
        </div>
        <div className="image-upload">
          <h3>PAN Card</h3>
          {panCard && (
            <div className="multipale-image-display">
              <div className="dynamic-img-wrapper">
                <img src={URL.createObjectURL(panCard)} alt="PAN Card" style={{ height: "200px", width: "200px" }} className='img-fluid' />
                <button type="button" className="btn dropshadow-gallery" onClick={() => handleRemoveImage(setPanCard)}>  <FaTrash /></button>
              </div>
            </div>

          )}
          <div>
            <Button
              component="label"
              variant="contained"
              className="mt-2 custom-add-card"
              htmlFor="pancard-image"
            >
              <input
                hidden
                type="file"
                id="pancard-image"
                onChange={handlePanCardChange}
                accept="image/*"
              />
              <div className="multipale-image-display">
              <div className="dynamic-img-wrapper">
                <h1>+</h1>
              </div>
            </div>
            </Button>
          </div>
        </div>
      </div>


      <ArtistFooter
        backClick={() => navigate(`/become-a-artist/${request_id}/pricing`)}
        nextClick={() => navigate(`/become-a-artist/${request_id}/upload-cerificates`)}
      />
    </>
  );
};

export default CompleteKYC;
