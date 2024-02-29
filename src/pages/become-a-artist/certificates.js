import React, { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ArtistFooter from "./common/artistFooter";
import { axiosAuth } from "configs/axiosInstance";
import "@css/user/certificate.css"
import PdfIcon from "@core/assets/images/pdfIcon.png";
import DocIcon from "@core/assets/images/docIcon.png";
import { IoMdAdd } from "react-icons/io";
import { useForm } from "react-hook-form";
import { BsThreeDots } from "react-icons/bs";

const BASE_URL = process.env.REACT_APP_APIURL;

const Certificates = () => {
  const navigate = useNavigate();
  const { request_id } = useParams();
  const [artistPayload, setArtistPayload] = useOutletContext();
  const [certificates, setCertificates] = useState(
    artistPayload.certificates ? artistPayload.certificates : []
  );

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [uploading,setUploading] = useState(false)

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

  const updateArtistRequest = async(payload) =>{
    try{
      await axiosAuth.post('/users/updateArtistRequest',payload);
    }
    catch(error){
      console.log("Error updating request.")
    }
  }

  const addNewCertificate = async (data) =>{
    if(uploading) return null;

    setUploading(true)
    const formData = new FormData();
    const {title} = data;
    formData.append('certificate',data.certificate[0])
    try{
      const uploadDocument = await axiosAuth.post('/users/uploadDocument',formData);
      const allCertificatesCopy = [...certificates]
      allCertificatesCopy.push({title, certificate: uploadDocument.data[0]['response']});
      setCertificates(allCertificatesCopy);
      setArtistPayload(prev => ({...prev,certificates:allCertificatesCopy }))
      updateArtistRequest({certificates:allCertificatesCopy});
      setUploading(false)
      reset();
    }
    catch(error){
      console.log("Error uploading Document")
      setUploading(false)
    }
  }

  const handleRemoveCertificate = (index) =>{
    var certificatesCopy = [...certificates];
    certificatesCopy.splice(index, 1);
    setCertificates(certificatesCopy);
    updateArtistRequest({certificates:certificatesCopy});
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

            <div className="row">
              <div className="col-6 text-center m-auto">
                <div className="row">
                  {
                    certificates && Array.isArray(certificates) && certificates.length > 0 ?
                      <>
                        {
                          certificates.map((item, index) => {
                            if (!item.title || !item.certificate) return null;
                            return (
                              <>
                                <div className="col-md-6">
                                  <div className="usr-certificate">
                                      {
                                        item.certificate?.mimetype == "application/pdf" ?
                                          <img src={PdfIcon} alt='certificate' className="img-fluid w-100 usr-certificate-pdf-icon" />
                                          :
                                          item.certificate?.mimetype?.startsWith('image/') || item.certificate?.fileType === "image"
                                            ?
                                            <img src={item.certificate?.url} alt="certificates" className="img-fluid usr-certificate-image-icon" />
                                            :
                                            <img src={DocIcon} alt="certificates" className="img-fluid usr-certificate-image-icon" />
                                      }
                                      <div class="ar-action-btn-wrapper">
                                      <button
                                        className="ar-action-dropdown-btn"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <BsThreeDots/>
                                      </button>
                                      <ul class="dropdown-menu">
                                        <li>
                                            <a
                                              class="dropdown-item"
                                              href={item.certificate?.url}
                                              target="_blank"
                                            >
                                              View
                                            </a>
                                          </li>
                                          <li>
                                            <span
                                              class="dropdown-item"
                                              onClick={()=>handleRemoveCertificate(index)}
                                            >
                                              Remove
                                            </span>
                                          </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <p className="usr-certificate-title">{item.title}</p>
                                </div>
                              </>
                            )
                          })
                        }
                      </>
                      :
                      null
                  }
                  <div className={`col-md-6 ${certificates.length > 0 ? '' : 'mx-auto'}`}>
                    <div className="usr-certificate-form-wrapper">
                      <form onSubmit={handleSubmit(addNewCertificate)}>
                        <div className="input-form-group text-start">
                          <label htmlFor="title">
                            Please mention where you received the certification from *
                          </label>
                          <input type="text" id="title" className="form-control" {...register("title",{required:'This Field is required.'})} />
                          {errors && errors.title && <span>{errors.title.message}</span>}
                        </div>
                        <div className="input-form-group text-start mt-3">
                          <label htmlFor="certificate">
                            Certificate *
                          </label>
                            <input type="file" id="certificate" className="form-control" {...register("certificate",{required:'This Field is required.'})} accept=".pdf,.png,.jpg,.jpeg,.webp"/>
                            {errors && errors.certificate && <span>{errors.certificate.message}</span>}
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-3">
                          <button className="usr-common-action-btn" type="submit" disabled={uploading ? true : false}>
                            {uploading ? 'Uploading...' : <>
                            <IoMdAdd  className="me-2"/>Add {certificates && Array.isArray(certificates) && certificates.length > 0 && 'More'}
                            </>}
                            </button>
                        </div>
                      </form>

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal modal-lg fade usr-artist-single-modal" id="editModalToggle" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editModalToggleLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body">
                <div className='modal-btn-wrapper justify-content-end d-flex'>
                <button type="button" class=" common-modal-dismiss-btn" data-bs-dismiss="modal" aria-label="Close">
                <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 15 15" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor"></path></svg>
                </button>
                </div>

            </div>
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
