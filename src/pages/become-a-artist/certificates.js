import React, { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ArtistFooter from "./common/artistFooter";
import { axiosAuth } from "configs/axiosInstance";
import { useDropzone } from "react-dropzone";
import { MdDeleteForever } from "react-icons/md";
import { IoAdd, IoEye } from "react-icons/io5";
import PdfIcon from "@core/assets/images/pdfIcon-removebg.png";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const BASE_URL = process.env.REACT_APP_APIURL;

const Certificates = () => {
  const navigate = useNavigate();
  const { request_id } = useParams();
  const [artistPayload, setArtistPayload] = useOutletContext();
  const [certificates, setCertificates] = useState(
    artistPayload.certificates ? artistPayload.certificates : []
  );
  const [uploading, setUploading] = useState(false);
  const [binaryFiles, setBinaryFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({});
  const [userDocuments, setUserDocuments] = useState([]);

  const handleDrop = async (files) => {
    setBinaryFiles(files);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("certificates", file);
    });

    try {
      setUploading(true);
      const response = await axiosAuth.post(
        `${BASE_URL}/users/updateArtistRequest`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentCompleted = Math.round((loaded * 100) / total);
            setProgress(percentCompleted);
          },
        }
      );

      setBinaryFiles([]);
      setProgress(0);
      setUploading(false);
      setArtistPayload(response?.data?.data);
      setCertificates(response?.data?.data?.certificates);
      // Handle response if needed
    } catch (error) {
      // Handle error
      setBinaryFiles([]);
      setProgress(0);
      setUploading(false);
    }
  };

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

  function getExtension(filename) {
    return filename.split(".").pop();
  }

  const { getRootProps, getInputProps } = useDropzone({
    disabled: uploading,
    onDrop: handleDrop,
    accept: {
      "image/*": [
        ".jpeg",
        ".png",
        ".jpg",
        ".gif",
        ".avif",
        ".svg",
        ".tiff",
        ".webp",
      ],
      "application/pdf": [".pdf"],
    },
  });


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

  const documentSubmitHandler = (e) => {
    e.preventDefault();
      const formDataCopy = { ...formData };
      for (let key in formDataCopy) {
      if (formDataCopy[key]?.file instanceof File) {
        formDataCopy[key] = {
          name: formDataCopy[key].file.name,
          size: formDataCopy[key].file.size,
          type: formDataCopy[key].file.type,
        };
      }
    }
      setUserDocuments(prev => ([...prev, formDataCopy]));
      setFormData({});
  };
  


  const documentChangeHandler = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: {
          file: selectedFile,
          name: selectedFile.name,
          size: selectedFile.size,
          type: selectedFile.type,
        },
      }));
    } else {
      // Handle other inputs like text inputs
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  

  const upadateDocumentHandler = (e) => {

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
              userDocuments && Array.isArray(userDocuments) && userDocuments.length > 0 ?
                <div className="row">
                  <div className="col-6 text-center m-auto">
                  <div className="row">
                    {
                      userDocuments.map((item, index) => {
                        return (
                          <>
                              <div className="col-6">
                                <form onSubmit={(e) => upadateDocumentHandler(e)}>
                                  <div className="text-start m-auto">
                                    <label htmlFor="title">
                                      Please mention where you received the certification from.
                                    </label>
                                    <div>
                                      <input className="" type="text" name="title" id="title" value={item?.title} onChange={(e) => documentChangeHandler(e)} />
                                    </div>
                                  </div>
                                  <div className="text-start m-auto mt-2">
                                    <label id="certificate">
                                      Upload Certificate
                                    </label>
                                    <div>
                                      <input className="" type="file" id="certificate" name="certificate"  onChange={(e) => documentChangeHandler(e)} />
                                    </div>
                                  </div>
                                  <div className="text-start m-auto mt-3">
                                    <button className="btn usr-common-action-btn" type="submit">Update</button>
                                  </div>
                                </form>
                              </div>
                          </>
                        )
                      })
                    }
                    <div className="col-6">
                      <form onSubmit={(e) => documentSubmitHandler(e)}>
                        <div className=" text-start m-auto">
                          <label htmlFor="title">
                            Please mention where you received the certification from.
                          </label>
                          <div>
                            <input className="" type="text" name="title" id="title" value={formData?.title} onChange={(e) => documentChangeHandler(e)} />
                          </div>
                        </div>
                        <div className="text-start m-auto mt-2">
                          <label id="certificate">
                            Upload Certificate
                          </label>
                          <div>
                            <input className="" type="file" id="certificate" name="certificate" onChange={(e) => documentChangeHandler(e)} />
                          </div>
                        </div>
                        <div className="text-start m-auto mt-3">
                          <button className="btn usr-common-action-btn" type="submit">Add More</button>
                        </div>
                      </form>
                    </div>
                    </div>
                  </div>
                </div> :
                <div className="row">
                  <form onSubmit={(e) => documentSubmitHandler(e)}>
                    <div className="col-6 m-auto d-block" style={{ border: "1px dotted", padding: "40px" }}>
                      <div className="col-6 text-start m-auto">
                        <label htmlFor="title">
                          Please mention where you received the certification from.
                        </label>
                        <div>
                          <input className="" type="text" name="title" id="title" value={formData?.title} onChange={(e) => documentChangeHandler(e)} />
                        </div>
                      </div>
                      <div className="col-6 text-start m-auto mt-2">
                        <label id="certificate">
                          Upload Certificate
                        </label>
                        <div>
                          <input className="" type="file" id="certificate" name="certificate" onChange={(e) => documentChangeHandler(e)} />
                        </div>
                      </div>
                      <div className="col-6 text-start m-auto mt-3">
                        <button className="btn usr-common-action-btn" type="submit">Add More</button>
                      </div>
                    </div>
                  </form>
                </div>
            }
            {/* <div className="row gallery-row g-3">
                <>
                  {(certificates && Array.isArray(certificates) && certificates.length > 0) ||
                    (binaryFiles && Array.isArray(binaryFiles) && binaryFiles.length > 0) ? (
                    <>
                      {certificates.map((item, index) => {
                        return (
                          <div className="col-md-6 p-3">
                            <div className="custom-kyc-img-wrapper">
                              {getExtension(item.name).toLowerCase() === "pdf" ? (
                                <>
                                  <img
                                    src={PdfIcon}
                                    alt={item.name}
                                    className="img-fluid w-100"
                                  />
                                  <div className="custom-kyc-update-dropshadow-box">
                                    <div>
                                      <MdDeleteForever
                                        onClick={() => removeDocument(index)}
                                        className="me-3"
                                      />
                                      <a href={item.url} target="_blank">
                                        <IoEye />
                                      </a>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <img
                                    src={item.url}
                                    alt={item.name}
                                    className="img-fluid w-100"
                                  />
                                  <div
                                    className="custom-kyc-update-dropshadow-box"
                                    onClick={() => removeDocument(index)}
                                  >
                                    <MdDeleteForever />
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      {binaryFiles && Array.isArray(binaryFiles) && binaryFiles.length > 0 && binaryFiles.map((item) => {
                        let src =
                          item.type == "application/pdf"
                            ? PdfIcon
                            : URL.createObjectURL(item);
                        return (
                          <div className="col-md-6 p-3">
                            <div className="custom-kyc-img-wrapper">
                              <img
                                src={src}
                                alt="binary File"
                                className="img-fluid w-100"
                              />
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
                            </div>
                          </div>
                        );
                      })}
                      <div className="col-6 p-3">
                        <div
                          {...getRootProps({
                            className: "custom-add-more-files-card",
                          })}
                        >
                          <input {...getInputProps()} />
                          <IoAdd className="fs-1 mb-2" />
                          <h6>Add more</h6>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div
                      {...getRootProps({
                        className: `dropzone col-12 custom-index-dropzone `
                      })}

                    >
                      <label>Drag your photos or documents here</label>
                      <input {...getInputProps()} />
                      <p>
                        <b>
                          <div>
                            <u>Upload from your device</u>
                          </div>
                        </b>
                      </p>
                    </div>
                  )}
                </>
              </div> */}
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
