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
      console.error(error, "file upload error");
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

  return (
    <>
       <section className="achivements-ar">
        <div className="container">
          <div className="row">
            <div className="col-md-12 achivements-ar-heading">
                <h4 className="text-center">Share your achievements</h4>
                <p className="text-center">
                  You can add more or make changes later.
                </p>
            </div>
          </div>
        </div>
        <div className="customized-gallery my-5">
          <div className="container">
            <div className="row gallery-row g-3">
              <>
                {(certificates && Array.isArray(certificates) && certificates.length > 0) ||
                (binaryFiles && binaryFiles.length > 0) && Array.isArray(binaryFiles) ? (
                  <>
                    { certificates.map((item, index) => {
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
                    {binaryFiles && Array.isArray(binaryFiles) && binaryFiles.length>0 && binaryFiles.map((item) => {
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
                    <input {...getInputProps()} />
                    <h4>Drag your photos or documents here</h4>
                    <p>
                      <b>
                        <u>Upload from your device</u>
                      </b>
                    </p>
                  </div>
                )}
              </>
            </div>
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
