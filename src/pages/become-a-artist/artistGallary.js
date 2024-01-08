import React, {useState} from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ArtistFooter from "./common/artistFooter";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Gallery from "./components/gallery";
import { axiosAuth } from "configs/axiosInstance";

const BASE_URL = process.env.REACT_APP_APIURL

const ArtistGallery = () => {
  const navigate = useNavigate();
  const { request_id } = useParams();
  const [artistPayload, setArtistPayload] = useOutletContext();
  const [attemptedNextWithoutSelection, setAttemptedNextWithoutSelection] = useState(false);
  
  const handleNextClick = async () =>{
    if(artistPayload && artistPayload.gallery && Array.isArray(artistPayload.gallery) && artistPayload.gallery.length > 2){
    try{
      if(artistPayload.currentStep > 6){
       return  navigate(`/become-a-artist/${request_id}/insight-your-work`)
      }
        await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`,{currentStep:7});
        
        setArtistPayload((prev) => {return {...prev,currentStep:7}})
        navigate(`/become-a-artist/${request_id}/insight-your-work`)
    }
    catch(error){
        throw error;
    }
    }else{
      setAttemptedNextWithoutSelection(true)
    }
  }

  return (
    <>
      <section className="customized-gallery-ar">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="customized-gallery-ar-heading">
                <h4 className="text-center">
                  Share some insights of your work
                </h4>
                <h6 className="text-center">You'll need 3 photos to get started. You can add more or make changes later.</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="customized-gallery my-5">
          <div className="container">
            
          <div className="row gallery-row g-3">
          <DndProvider backend={HTML5Backend}>
            <Gallery context={[artistPayload, setArtistPayload, request_id]} className={`${attemptedNextWithoutSelection ? 'gallary-error' : "gallary-no-error" }` }/>
           
          </DndProvider>
          </div>
        </div>
        </div>
        <div className="horizontal-bar"></div>
      </section>

      <ArtistFooter
        backClick={() => navigate(`/become-a-artist/${request_id}/stand-out`)}
        nextClick={() => handleNextClick()}
      />
    </>
  );
};

export default ArtistGallery;
