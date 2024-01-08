import React, { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ArtistFooter from "./common/artistFooter";
import NoDataFound from "./common/noDataFound";
import { axiosAuth } from "configs/axiosInstance";

const BASE_URL = process.env.REACT_APP_APIURL

const BestServices = () => {
  const [artistPayload, setArtistPayload, allServices] = useOutletContext();
  const { request_id } = useParams();

  const navigate = useNavigate();

  const [selectedService, setSelectedService] = useState(artistPayload.featuredService ? artistPayload.featuredService : null);
  const [attemptedNextWithoutSelection, setAttemptedNextWithoutSelection] = useState(false);
  const options = allServices.filter((item) => artistPayload?.services?.includes(item._id));
  
  const handleNextClick = async () =>{
    if(!selectedService || selectedService == ''){
      return setAttemptedNextWithoutSelection(true);
    }

    setAttemptedNextWithoutSelection(false)

    try{
      if(artistPayload.currentStep > 8 && artistPayload.featuredService == selectedService){
       return  navigate(`/become-a-artist/${request_id}/description`)
      }
        await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`,{currentStep:9,featuredService:selectedService});
        setArtistPayload((prev) => {return {...prev,currentStep:9,featuredService:selectedService}})
        navigate(`/become-a-artist/${request_id}/description`)
    }
    catch(error){
        throw error;
    }
  }

  return (
    <>
      <section className="about best-in-wrapper">
        <div className="container h-min-75vh">
          <div className="row mb-3">
            <div className="col-md-12 about-heading">
              <h4 className="text-center">Which of these your are best in ?</h4>
            </div>
          </div>

          <div className="row my-5 w-75 mx-auto">
            <div className="col-md-10 mx-auto">
              <div className="row g-3">
                {(options && Array.isArray(options)) ?
                <>
                {
                  options.length > 0 ?
                  <>
                  {options.map((service, index) => (
                   <div key={index} className={`col-md-6 ${attemptedNextWithoutSelection && (!selectedService || selectedService == '') ? 'border-highlight' : ''}`}>
                      <div
                        className={`${
                          service._id == selectedService
                            ? "selected"
                            : "artist-card"
                        }`}
                        
                        onClick={() => setSelectedService(service._id)}
                      >
                        <div  >
                          <img 
                            src={service.icon.thumbnailUrl}
                            alt={service.title}
                            className="img-fluid about-images"
                          />
                        </div>
                        <div className="card-title">
                          <span>{service.title}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  </> : 
                  <NoDataFound/>
                }
                </> : <NoDataFound/>}
               
              </div>
            </div>
          </div>
        </div>
        <div className="horizontal-bar"></div>
      </section>

      <ArtistFooter
        backClick={() => navigate(`/become-a-artist/${request_id}/gallery`)}
        nextClick={() => handleNextClick()}
      />
    </>
  );
};

export default BestServices;
