import React from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ArtistFooter from "./artistFooter";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CertificateGallery from './components/certificateGallery';
import { axiosAuth } from "configs/axiosInstance";

const BASE_URL = process.env.REACT_APP_APIURL

const Certificates = () => {
  const navigate = useNavigate();
  const { request_id } = useParams();
  const [artistPayload, setArtistPayload] = useOutletContext();

  
  const handleNextClick = async () =>{
    try{
      if(artistPayload.currentStep > 13){
       return  navigate(`/become-a-artist/${request_id}/review-request`)
      }
        await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`,{currentStep:14});
        navigate(`/become-a-artist/${request_id}/review-request`)
    }
    catch(error){
        throw error;
    }
  }

  return (
    <>
      <section>
        <div className="container  pt-4">
          <div className="row">
            <div className="col-md-12">
              <div>
                <h1 className="text-center">
                  Share your achievements
                </h1>
                <h6 className="text-center">You can add more or make changes later.</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="customized-gallery pt-4">
          <div className="container">
            
          <div className="row gallery-row g-3">
          <DndProvider backend={HTML5Backend}>
            <CertificateGallery context={[artistPayload, setArtistPayload, request_id]}/>
          </DndProvider>
          </div>
        </div>
        </div>
      </section>

      <ArtistFooter
        backClick={() => navigate(`/become-a-artist/${request_id}/complete-kyc`)}
        nextClick={() => handleNextClick()}
      />
    </>
  );
};

export default Certificates;
