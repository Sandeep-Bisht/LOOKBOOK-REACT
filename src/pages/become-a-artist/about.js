import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ArtistFooter from "./common/artistFooter";
import NoDataFound from "./common/noDataFound";
import { axiosAuth } from "configs/axiosInstance";

const BASE_URL = process.env.REACT_APP_APIURL

const AboutYou = () => {
  const [artistPayload, setArtistPayload, allServices] = useOutletContext();
  const { request_id } = useParams();

  const navigate = useNavigate();

  const [selectedServices, setSelectedServices] = useState([]);
  const [attemptedNextWithoutSelection, setAttemptedNextWithoutSelection] = useState(false);

  useEffect(()=>{
    if(artistPayload){
      if(artistPayload.services && Array.isArray(artistPayload.services)){
        setSelectedServices(artistPayload.services);
      }
    }
  },[artistPayload])

  const handleChange = (service) => {
    // Check if the service is already selected
    const isSelected = selectedServices.includes(service);
    setAttemptedNextWithoutSelection(false);

    if (isSelected) {
      // If selected, remove it from the list
      setSelectedServices((prevSelected) =>
        prevSelected.filter((item) => item !== service)
      );
    } else {
      // If not selected, add it to the list
      setSelectedServices((prevSelected) => [...prevSelected, service]);
    }
  };
  
  const handleNextClick = async () =>{

    if(selectedServices.length > 0){
    try{       
      let payload = {currentStep:3,services:selectedServices}

        if(artistPayload.currentStep > 2){
            delete payload.currentStep;
        }

        if(artistPayload.services && Array.isArray(artistPayload.services)){
          const areEqual = selectedServices.every((element, index) => element === artistPayload.services[index]);
         

          if(areEqual){
            return navigate(`/become-a-artist/${request_id}/describe-yourself`)
          }
          else{
            
            await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`,payload);
            setArtistPayload((prev) => {return {...prev,...payload}})
            navigate(`/become-a-artist/${request_id}/describe-yourself`)
          }

        }else{
          await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`,payload);
          setArtistPayload((prev) => {return {...prev,...payload}})
          navigate(`/become-a-artist/${request_id}/describe-yourself`)
        }
    }
    catch(error){
        throw error;
    }
    }else{
      // alert("Please select teh service")
      setAttemptedNextWithoutSelection(true);
    }
}

  return (
    <>
      <section className="about">
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-12 about-heading">
              <h4 className="text-center">Which of these best describe you ?</h4>
            </div>
          </div>

          <div className="row my-5 w-75 mx-auto">
            <div className="col-md-10 mx-auto">
              <div className="row g-3">
                {(allServices && Array.isArray(allServices)) ?
                <>
                {
                  allServices.length > 0 && Array.isArray(allServices)?
                  <>
                  { allServices.map((service, index) => (
                   <div key={index} className={`col-md-6 ${attemptedNextWithoutSelection ? 'border-highlight' : ''}`}>
                      <div
                        className={`${
                          selectedServices.includes(service._id)
                            ? "selected"
                            : "artist-card"
                        }`}
                        
                        onClick={() => handleChange(service._id)}
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
        backClick={() => navigate(`/become-a-artist/${request_id}/about-your-skills`)}
        nextClick={() => handleNextClick()}
        // nextDisabled={selectedServices.length > 0 ? false : true}
      />
    </>
  );
};

export default AboutYou;