import React, { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ArtistFooter from "./common/artistFooter";
import { axiosAuth } from "configs/axiosInstance";
import { useDropzone } from "react-dropzone";
import { MdDeleteForever } from "react-icons/md";
import "@css/user/certificate.css"
import { IoAdd, IoEye } from "react-icons/io5";
import PdfIcon from "@core/assets/images/pdfIcon.png";
import DocIcon from "@core/assets/images/docIcon.png";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button'





const BASE_URL = process.env.REACT_APP_APIURL;

const Certificates = () => {
  const navigate = useNavigate();
  const { request_id } = useParams();
  const [artistPayload, setArtistPayload] = useOutletContext();
  const [certificates, setCertificates] = useState(
    artistPayload.certificates ? artistPayload.certificates : []
  );
  // const [uploading, setUploading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { register:registerUpdate, handleSubmit:handleUpdate, formState: { errors:updateErrors }, reset:resetUpdate, setValue } = useForm();
  
  const [editableCertificate,setEditableCertificate] = useState();
  const [editableIndex,setEditableIndex] = useState();
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);



  // const [selectFileImage, setSelectFileImage] = useState()
  // const [imageUrl, setImageUrl] = useState(editableCertificate?.certificate?.mimetype == "application/pdf" ? PdfIcon :  editableCertificate?.certificate?.mimetype?.startsWith('image/') || editableCertificate?.certificate?.fileType === "image" ? editableCertificate?.certificate?.url : DocIcon);  // const [userDocuments, setUserDocuments] = useState([]);

  // const handleDrop = async (files) => {
  //   setBinaryFiles(files);

  //   const formData = new FormData();
  //   files.forEach((file) => {
  //     formData.append("certificates", file);
  //   });

  //   try {
  //     setUploading(true);
  //     const response = await axiosAuth.post(
  //       `${BASE_URL}/users/updateArtistRequest`,
  //       formData,
  //       {
  //         onUploadProgress: (progressEvent) => {
  //           const { loaded, total } = progressEvent;
  //           const percentCompleted = Math.round((loaded * 100) / total);
  //           setProgress(percentCompleted);
  //         },
  //       }
  //     );

  //     setBinaryFiles([]);
  //     setProgress(0);
  //     setUploading(false);
  //     setArtistPayload(response?.data?.data);
  //     setCertificates(response?.data?.data?.certificates);
  //     // Handle response if needed
  //   } catch (error) {
  //     // Handle error
  //     setBinaryFiles([]);
  //     setProgress(0);
  //     setUploading(false);
  //   }
  // };

  const handleFileChangeImage = async(e) => {

    const copyEditableCertificate = {...editableCertificate['certificate']}
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = function (event) {
      const imageUrl = event.target.result;
      const formData = new FormData()
      formData.append("certificate",file)
      try{
        setUploading(true);
        const response =  axiosAuth.post(
          "/users/uploadDocument",
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const { loaded, total } = progressEvent;
              const percentCompleted = Math.round((loaded * 100) / total);
              setProgress(percentCompleted);
            },
          }
        );
        if(response){
          copyEditableCertificate['mimetype'] = file.type; 
          copyEditableCertificate['url'] = imageUrl;
          setEditableCertificate(prev => ({...prev,certificate:copyEditableCertificate}));
        }
      }catch(error){
         console.log(error,"error")
      }
    };

    if (file) {
      reader.readAsDataURL(file);
      setValue("updatedCertificate",file)
    }

  };
  // console.log(editableCertificate,'editable certificate is this ')

  // const removeDocument = async (index) => {
  //   // Create a copy of the array
  //   const updatedCertificates = [...certificates];

  //   // Use splice to remove the item at the specified index
  //   updatedCertificates.splice(index, 1);

  //   // Update the state with the new array
  //   setCertificates(updatedCertificates);

  //   try {
  //     const response = await axiosAuth.post(
  //       `${BASE_URL}/users/updateArtistRequest`,
  //       { certificates: updatedCertificates }
  //     );
  //     setArtistPayload(response?.data?.data);
  //     setCertificates(response?.data?.data?.certificates);
  //     // Handle response if needed
  //   } catch (error) {
  //     console.error(error, "file upload error");
  //   }
  // };

  // function getExtension(filename) {
  //   return filename.split(".").pop();
  // }

  // const { getRootProps, getInputProps } = useDropzone({
  //   disabled: uploading,
  //   onDrop: handleDrop,
  //   accept: {
  //     "image/*": [
  //       ".jpeg",
  //       ".png",
  //       ".jpg",
  //       ".gif",
  //       ".avif",
  //       ".svg",
  //       ".tiff",
  //       ".webp",
  //     ],
  //     "application/pdf": [".pdf"],
  //   },
  // });
// console.log(editableCertificate,"editableCertificate editableCertificate editableCertificate",imageUrl)

  const handleNextClick = async () => {
    try {
      if (artistPayload.currentStep > 13) {
        return navigate(`/become-a-artist/${request_id}/personal-details`);
      }
      await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`, {
        currentStep: 14,
      });
      setArtistPayload((prev) => {
        return { ...prev, currentStep: 14 };
      });
      navigate(`/become-a-artist/${request_id}/personal-details`);
    } catch (error) {
      throw error;
    }
  };

  const documentSubmitHandler = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((item) => {
      if (item == "certificate") {
        formData.append(item, data.certificate[0])
      }
      else {
        formData.append(item, data[item])
      }
    })
    try {
      const response = await axiosAuth.post("/users/artist-request/addCertificates", formData);
      if (response.statusText = "OK") {
        setCertificates(response?.data?.data?.certificates)
        reset();
      }

    } catch (error) {
      console.log(error, "check the error");
    }
  };
  
  const updateCertificate = (data)=>{
  }

  return (
    <>
      <section className="achivements-ar">
        <div className="container">
          <div className="row">
            <div className="col-md-12 achivements-ar-heading">
              <h4 className="text-center">Share Your Certification</h4>
              <p className="text-center">
                You can add more or make changes later.
                <br />
              </p>
            </div>
          </div>
        </div>
        <div className="customized-gallery my-5">
          <div className="container">
            {
              certificates && Array.isArray(certificates) && certificates.length > 0 ?
                <div className="row">
                  <div className="col-6 text-center m-auto">
                    <div className="row">
                      {
                        certificates.map((item, index) => {
                          if (!item.title || !item.certificate) return null;
                          return (
                            <>
                              <div className="col-md-5 ms-2 mt-3">
                                <div className="usr-certificate">
                                  <div className="user-certificate-form">
                                    {
                                      item.certificate?.mimetype == "application/pdf" ?
                                        // <a href={item.url} target="_blank" rel="noopener noreferrer">
                                        <img src={PdfIcon} alt='certificate' className="img-fluid w-100 usr-certificate-pdf-icon" />
                                        :
                                        item.certificate?.mimetype?.startsWith('image/') || item.certificate?.fileType === "image"
                                          ?
                                          <img src={item.certificate?.url} alt="certificates" className="img-fluid usr-certificate-image-icon" />
                                          :
                                          <img src={DocIcon} alt="certificates" className="img-fluid usr-certificate-image-icon" />
                                    }
                                    <p className="usr-certificate-title">{item.title}</p>
                                    <div className="usr-certificate-actions-wrapper text-center">
                                      <div class="dropstart">
                                        <button class="dropdown-toggle bg-white usr-join-action-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                          ...
                                        </button>
                                        <ul class="dropdown-menu">
                                          <li><button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModalToggle" onClick={()=>{setEditableCertificate(item);setEditableIndex(index);setValue('title',item.title);setValue("updatedCertificate",null);}} >Edit</button></li>
                                          <li><button class="dropdown-item" href="#">View</button></li>
                                          <li><button class="dropdown-item" href="#">Remove</button></li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )
                        })
                      }
                      <div className="col-md-5 ms-2 mt-3">
                        <div className="usr-certificate">
                          <div className="user-certificate-form">
                            <form onSubmit={handleSubmit(documentSubmitHandler)}>
                              <div className=" text-start m-auto">
                                <label htmlFor="title">
                                  Please mention where you received the certification from.
                                </label>
                                <div>
                                  <input className="user-certificate-form-input" type="text" {...register("title")} id="title" />
                                </div>
                              </div>
                              <div className="text-start m-auto mt-2">
                                <label id="certificate">
                                  Upload Certificate
                                </label>
                                <div>
                                  <input className="user-certificate-form-input form-control" type="file" id="certificate" {...register("certificate")} />
                                </div>
                              </div>
                              <div className="text-start m-auto mt-3">
                                <button className="btn usr-common-action-btn" type="submit">Add More</button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                :
                <div className="row">
                  <form onSubmit={handleSubmit(documentSubmitHandler)}>
                    <div className="col-6 m-auto d-block" style={{ border: "1px dotted", padding: "40px" }}>
                      <div className="col-6 text-start m-auto">
                        <label htmlFor="title">
                          Please mention where you received the certification from.
                        </label>
                        <div>
                          <input className="" type="text" id="title" {...register("title")} />
                        </div>
                      </div>
                      <div className="col-6 text-start m-auto mt-2">
                        <label id="certificate">
                          Upload Certificate
                        </label>
                        <div>
                          <input className="" type="file" id="certificate" {...register("certificate")} />
                        </div>
                      </div>
                      <div className="col-6 text-start m-auto mt-3">
                        <button className="btn usr-common-action-btn" type="submit">Add More</button>
                      </div>
                    </div>
                  </form>
                </div>
            }
          </div>
        </div>
        <div className="horizontal-bar"></div>
        
        <div class="modal modal-lg fade usr-artist-single-modal" id="exampleModalToggle" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalToggleLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered text-center">
            <div class="modal-content">
              <div class="modal-body">
              <div className='modal-btn-wrapper justify-content-end d-flex'>
                <button type="button" class=" common-modal-dismiss-btn" data-bs-dismiss="modal" aria-label="Close" onClick={()=>resetUpdate()}>
                <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 15 15" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor"></path></svg>
                </button>
                </div>
                {editableIndex && editableIndex >= 0 && certificates[editableIndex] &&  editableCertificate && editableCertificate?.title && editableCertificate?.certificate ? 
                
                <form onSubmit={handleUpdate(updateCertificate)}>
                <div className='user-address-location-wrapper'>
                  <div className='d-block'>
                    <div className='updateImg-wrapper'>
                    {
                      editableCertificate.certificate?.mimetype == "application/pdf" ?
                        <img src={PdfIcon} alt='certificate' className="img-fluid w-100 usr-certificate-pdf-icon" />
                      :
                      editableCertificate.certificate?.mimetype?.startsWith('image/') || editableCertificate.certificate?.fileType == "image"
                      ?
                      <img src={editableCertificate.certificate?.url} alt="certificates" className="img-fluid usr-certificate-image-icon" />
                      :
                      <img src={DocIcon} alt="certificates" className="img-fluid usr-certificate-image-icon" />
                    }
                      <div className='showbutton-image'
                      >
                        {/* Upload button triggers file input */}
                        <Button
                          component="label"
                          className="mt-2"
                          variant="contained"
                          htmlFor="updatedCertificate"
                        >
                          Upload
                          <input
                            hidden
                            type="file"
                            id="updatedCertificate"
                            name="updatedCertificate"
                            {...registerUpdate("updatedCertificate")}
                            onChange={handleFileChangeImage}
                            accept="image/*"
                          />
                        </Button>
                        <Button className="ms-2 mt-2" variant="contained" color="secondary" 
                        onClick={() =>{setValue("updatedCertificate",null);setEditableCertificate(prev => ({...prev,certificate:certificates[editableIndex]['certificate']}))}}
                        >
                          Reset
                        </Button>
                      </div>
                    </div>
                    <div className="circular-progressbar">
                        <CircularProgressbar
                          value={progress}
                          strokeWidth={50}
                          styles={buildStyles({
                            strokeLinecap: "butt",
                            trailColor: "#FCF7F2",
                            pathColor: "#8C6A54",
                          })}
                        />
                      </div>
                    <div className='text-start'>
                      <div>
                      <label htmlFor="id" className='mt-2'>Title</label>
                      </div>
                      <input className="form-control" type="text" name="title"
                      {...registerUpdate("title",{required:"This Field is required."})} id="title"
                      />
                      {updateErrors && updateErrors.title && <span>{updateErrors.title.message}</span>}
                    </div>
                    <div className="text-start">
                      <button type="submit" className="btn usr-common-action-btn">Update</button>
                    </div>
                  </div>
                </div>
                </form>
                :
                "No Data found"
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <ArtistFooter
        backClick={() =>
          navigate(`/become-a-artist/${request_id}/complete-kyc`)
        }
        nextClick={() => handleNextClick()}
      />
    </>
  );
};

export default Certificates;
