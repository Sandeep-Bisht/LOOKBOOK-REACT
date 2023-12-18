import React, { useState } from 'react';
import ArtistFooter from './artistFooter';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'
import { FaTrash } from "react-icons/fa6";
import { axiosAuth } from 'configs/axiosInstance';

const BASE_URL = process.env.REACT_APP_APIURL

const CompleteKYC = () => {
  const { request_id } = useParams();
  let navigate = useNavigate()
  const [aadharFront, setAadharFront] = useState(null);
  const [aadharBack, setAadharBack] = useState(null);
  const [panCard, setPanCard] = useState(null);
  const [uploading,setUploading] = useState(false)
  const [progress, setProgress] = useState(0);


  const handleAadharFrontChange = (event) => {
    const file = event.target.files[0];
    setAadharFront(file);
    handleUploadAdharFront(file);
  };

  const handleAadharBackChange = (event) => {
    const file = event.target.files[0];
    setAadharBack(file);
    handleUploadAdharBack(file);

  };

  const handlePanCardChange = (event) => {
    const file = event.target.files[0];
    setPanCard(file);
    handleUploadPanCard(file)
  };

  const handleRemoveImage = (setImage) => {
    setImage(null);
  };

  const handleUploadAdharFront = async (file) => {

    const formData = new FormData();
      formData.append('adharFront', file);

    try {
      setUploading(true)
      const response = await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`, formData, {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentCompleted = Math.round((loaded * 100) / total);
          setProgress(percentCompleted);
        },
      });
      setProgress(0)
      setUploading(false)
    } catch (error) {
      setProgress(0)
      setUploading(false)
      console.error(error, 'file upload error');
    }
  };

  const handleUploadAdharBack = async (file) => {

    const formData = new FormData();
      formData.append('adharBack', file);

    try {
      setUploading(true)
      const response = await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`, formData, {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentCompleted = Math.round((loaded * 100) / total);
          setProgress(percentCompleted);
        },
      });
      setProgress(0)
      setUploading(false)
    } catch (error) {
      setProgress(0)
      setUploading(false)
      console.error(error, 'file upload error');
    }
  };

  const handleUploadPanCard = async (file) => {

    const formData = new FormData();
      formData.append('panCard', file);

    try {
      setUploading(true)
      const response = await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`, formData, {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentCompleted = Math.round((loaded * 100) / total);
          setProgress(percentCompleted);
        },
      });
      setProgress(0)
      setUploading(false)
    } catch (error) {
      setProgress(0)
      setUploading(false)
      console.error(error, 'file upload error');
    }
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
        <div className="image-upload-container">
        <div className="image-upload">
          {aadharFront ? (
            <div className="multipale-image-display">
              <div className="dynamic-img-wrapper">
                <img src={URL.createObjectURL(aadharFront)} alt="Aadhar Card Front" style={{ height: "200px", width: "200px" }} className='img-fluid' />
                <Button
                    component="label"
                    variant="contained"
                    className="mt-2 kyc-upload-btn d-none"
                    htmlFor="adhar-front-image"
                  >
                    Upload
                    <input
                      hidden
                      type="file"
                      id="adhar-front-image"
                      onChange={handleAadharFrontChange}
                      accept="image/*"
                    />
                  </Button>
              </div>
            </div>
          )
        :
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
        <div>{progress}</div>
      </div>
        }
        
        <h6>Aadhar Front</h6>
        </div>

        <div className="image-upload">
          {aadharBack ? (
            <div className="multipale-image-display">
              <div className="dynamic-img-wrapper">
                <img src={URL.createObjectURL(aadharBack)} alt="Aadhar Card Back" style={{ height: "200px", width: "200px" }} className='img-fluid' />
                <Button
                    component="label"
                    variant="contained"
                    className="mt-2 kyc-upload-btn d-none"
                    htmlFor="adhar-back-image"
                  >
                    Upload
                    <input
                      hidden
                      type="file"
                      id="adhar-back-image"
                      onChange={handleAadharBackChange}
                      accept="image/*"
                    />
                  </Button>
              </div>
            </div>
          )
        :
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
        <div>{progress}</div>
      </div>
        }
        
        <h6>Aadhar Back</h6>
        </div>
        <div className="image-upload">
          {panCard ? (
            <div className="multipale-image-display">
              <div className="dynamic-img-wrapper">
                <img src={URL.createObjectURL(panCard)} alt="PAN Card" style={{ height: "200px", width: "200px" }} className='img-fluid' />
                <Button
                    component="label"
                    variant="contained"
                    className="mt-2 kyc-upload-btn d-none"
                    htmlFor="pancard-image"
                  >
                    Upload
                    <input
                      hidden
                      type="file"
                      id="pancard-image"
                      onChange={handlePanCardChange}
                      accept="image/*"
                    />
                  </Button>
              </div>
            </div>

          )
        :
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
        <div>{progress}</div>
      </div>
      }
      
      <h6>PAN Card</h6>
        </div>
      </div>
      </div>
      </section>
      <ArtistFooter
        backClick={() => navigate(`/become-a-artist/${request_id}/pricing`)}
        nextClick={() => navigate(`/become-a-artist/${request_id}/upload-cerificates`)}
      />
    </>
  );
};

export default CompleteKYC;
