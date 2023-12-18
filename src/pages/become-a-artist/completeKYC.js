import React, { useState } from 'react';
import ArtistFooter from './common/artistFooter';
import { useOutletContext, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IoAdd } from "react-icons/io5";
import { useDropzone } from 'react-dropzone';
import { axiosAuth } from 'configs/axiosInstance';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { IoMdCloudUpload } from "react-icons/io";

const BASE_URL = process.env.REACT_APP_APIURL

const ImageCard = ({handleDrop, kycDocuments, uploading, name, title, binaryFiles, progress}) => {
  
  const {getRootProps, getInputProps} = useDropzone({
    disabled:uploading, 
    onDrop: (e)=>handleDrop(name,e), 
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.gif', '.avif', '.svg', '.tiff', '.webp']
    },
    multiple:false
  });

  return (<>
          {binaryFiles && binaryFiles[name] ?
          <div className='uploading card  h-100'>
          <img alt='Binary Image' src={URL.createObjectURL(binaryFiles[name])}/>
          <div className='circular-progressbar'>
          <CircularProgressbar
            value={progress}
            strokeWidth={50}
            styles={buildStyles({
              strokeLinecap: "butt",
              trailColor: '#FCF7F2',
              pathColor:"#8C6A54"
            })}
          />
          </div>
          </div>  
          :
          <>
          {kycDocuments && kycDocuments[name] ? 
           <div {...getRootProps({className: 'dropzone custom-kyc-img-wrapper'})}>
            <input {...getInputProps()} />
              <img src={kycDocuments[name]?.url} alt={title} className='img-fluid w-100'/>
            <div className='custom-kyc-update-dropshadow-box'>
            <IoMdCloudUpload />
            </div>
          </div>
          :
          <div {...getRootProps({className: 'dropzone custom-add-more-files-card'})}>
            <input {...getInputProps()} />
            <IoAdd className='fs-1 mb-2'/>
            <h6>{title}</h6>
          </div>
          }
          </>
        }
          </>)
}

const CompleteKYC = () => {
  const { request_id } = useParams();
  let navigate = useNavigate()
  const [artistPayload, setArtistPayload] = useOutletContext()

  const [kycDocuments,setKycDocuments] = useState({adharFront : artistPayload.adharFront ? artistPayload.adharFront : null,
    adharBack : artistPayload.adharBack ? artistPayload.adharBack : null,
    panCard : artistPayload.panCard ? artistPayload.panCard : null,})

  const [uploading,setUploading] = useState(false)
  const [progress,setProgress] = useState(0)
  const [binaryFiles,setBinaryFiles] = useState(null)

  const handleDrop = async (name,files) =>{

    setBinaryFiles({[name]:files[0]});

    const formData = new FormData();
    files.forEach((file) => {
      formData.append(name, file);
    });

    try {
      setUploading(true)
      const response = await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`, formData, {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentCompleted = Math.round((loaded * 100) / total);
          setProgress(percentCompleted);
        }
      });
      
      setBinaryFiles(null)
      setProgress(0)
      setUploading(false)
      setArtistPayload(response?.data?.data);
      setKycDocuments(prev => ({...prev,[name]:response?.data?.data[name]}))
      // Handle response if needed
    } catch (error) {
      // Handle error
      setBinaryFiles(null)
      setProgress(0)
      setUploading(false)
      console.error(error, 'file upload error');
    }
  }

  const handleNextClick = async () =>{
    try{
      if(artistPayload.currentStep > 12){
       return  navigate(`/become-a-artist/${request_id}/upload-cerificates`)
      }
        await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`,{currentStep:13});
        setArtistPayload((prev) => {return {...prev,currentStep:13}})
        navigate(`/become-a-artist/${request_id}/upload-cerificates`)
    }
    catch(error){
        throw error;
    }
  }

  return (
    <>
      <section className="about">
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-12">
              <h1 className="text-center">Complete your KYC</h1>
            </div>
            <div className='col-md-4 p-5'>
              <ImageCard handleDrop={handleDrop} uploading={uploading} name="adharFront" title="Aadhar Front" kycDocuments={kycDocuments} binaryFiles={binaryFiles} progress={progress}/>
              <h6 className='text-center mt-3'>Aadhar Front</h6>
            </div>
            <div className='col-md-4 p-5'>
              <ImageCard handleDrop={handleDrop} uploading={uploading} name="adharBack" title="Aadhar Back" kycDocuments={kycDocuments} binaryFiles={binaryFiles} progress={progress}/>
              <h6 className='text-center mt-3'>Aadhar Back</h6>
            </div>
            <div className='col-md-4 p-5'>
            <ImageCard handleDrop={handleDrop} uploading={uploading} name="panCard" title="Pan Card" kycDocuments={kycDocuments} binaryFiles={binaryFiles} progress={progress}/>
              <h6 className='text-center mt-3'>Pan Card</h6>
            </div>
          </div>
      </div>
      </section>
      <ArtistFooter
        backClick={() => navigate(`/become-a-artist/${request_id}/pricing`)}
        nextClick={() => handleNextClick()}
      />
    </>
  );
};

export default CompleteKYC;
