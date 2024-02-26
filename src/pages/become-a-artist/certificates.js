import React, { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ArtistFooter from "./common/artistFooter";
import { axiosAuth } from "configs/axiosInstance";
import { useDropzone } from "react-dropzone";
import { MdDeleteForever } from "react-icons/md";
import "@css/user/certificate.css"
import { IoAdd, IoEye } from "react-icons/io5";
import PdfIcon from "@core/assets/images/pdfIcon-removebg.png";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useForm } from "react-hook-form";

const BASE_URL = process.env.REACT_APP_APIURL;

const Certificates = () => {
  const navigate = useNavigate();
  const { request_id } = useParams();
  const [artistPayload, setArtistPayload] = useOutletContext();
  const [certificates, setCertificates] = useState(
    artistPayload.certificates ? artistPayload.certificates : []
  );
  const [uploading, setUploading] = useState(false);
  const {register, handleSubmit, formState:{errors},reset} = useForm();
  // const [userDocuments, setUserDocuments] = useState([]);

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

  const removeDocument = async (index) => {
    // Create a copy of the array
    const updatedCertificates = [...certificates];

    // Use splice to remove the item at the specified index
    updatedCertificates.splice(index, 1);

    // Update the state with the new array
    setCertificates(updatedCertificates);

    try {
      const response = await axiosAuth.post(
        `${BASE_URL}/users/updateArtistRequest`,
        { certificates: updatedCertificates }
      );
      setArtistPayload(response?.data?.data);
      setCertificates(response?.data?.data?.certificates);
      // Handle response if needed
    } catch (error) {
      console.error(error, "file upload error");
    }
  };

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

  const documentSubmitHandler = async(data) => {
    const formData = new FormData();

     Object.keys(data).forEach((item)=>{
      if(item=="certificate")
      {
        formData.append(item,data.certificate[0])
      }
      else{
        formData.append(item,data[item])
      }
     })
     try{      
     const response = await axiosAuth.post("/users/artist-request/addCertificates",formData);
     if(response.statusText="OK"){
      reset();
     }

     }catch(error){
      console.log(error,"check the error");
     }
  };
  


  // const documentChangeHandler = (e) => {
  //   const { name, value, files } = e.target;
  //   if (files && files.length > 0) {
  //     const selectedFile = files[0];
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: {
  //         file: selectedFile,
  //         name: selectedFile.name,
  //         size: selectedFile.size,
  //         type: selectedFile.type,
  //       },
  //     }));
  //   } else {
  //     // Handle other inputs like text inputs
  //     setFormData((prev) => ({ ...prev, [name]: value }));
  //   }
  // };

  // const upadateDocumentHandler = (e) => {

  // }

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
                        return (
                          <>
                              <div className="col-5 ms-2 user-certificate-form">
                                {item.title}
                                {/* <form onSubmit={(e) => upadateDocumentHandler(e)}>
                                  <div className="text-start m-auto">
                                    <label htmlFor="title">
                                      Please mention where you received the certification from.
                                    </label>
                                    <div>
                                      <input className="user-certificate-form-input" type="text" name="title" id="title" value={item?.title} onChange={(e) => documentChangeHandler(e)} />
                                    </div>
                                  </div>
                                  <div className="text-start m-auto mt-2">
                                    <label id="certificate">
                                      Upload Certificate
                                    </label>
                                    <div>
                                      <input className="user-certificate-form-input" type="file" id="certificate" name="certificate"  onChange={(e) => documentChangeHandler(e)} />
                                    </div>
                                  </div>
                                  <div className="text-start m-auto mt-3">
                                    <button className="btn usr-common-action-btn" type="submit">Update</button>
                                  </div>
                                </form> */}
                              </div>
                          </>
                        )
                      })
                    }
                    <div className="col-5 ms-2 user-certificate-form">
                      <form onSubmit={handleSubmit(documentSubmitHandler)}>
                        <div className=" text-start m-auto">
                          <label htmlFor="title">
                            Please mention where you received the certification from.
                          </label>
                          <div>
                            <input className="user-certificate-form-input" type="text" name="title" id="title" />
                          </div>
                        </div>
                        <div className="text-start m-auto mt-2">
                          <label id="certificate">
                            Upload Certificate
                          </label>
                          <div>
                            <input className="user-certificate-form-input" type="file" id="certificate" name="certificate" />
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
                          <input className="" type="file" id="certificate" {...register("certificate")}/>
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
