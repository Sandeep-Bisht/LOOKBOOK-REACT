import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useOutletContext, useParams } from "react-router-dom";
import ArtistFooter from "./artistFooter";
import NoDataFound from "./common/noDataFound";
import { axiosAuth } from "configs/axiosInstance";

const BASE_URL = process.env.REACT_APP_APIURL

const AboutYou = () => {
  const [artistPayload, setArtistPayload] = useOutletContext();
  const allServices = useLoaderData();
  const { request_id } = useParams();

  const navigate = useNavigate();

  const [selectedServices, setSelectedServices] = useState([]);

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
    try{ 
      
      let payload = {currentStep:3,services:selectedServices}

        if(artistPayload.currentStep > 3){
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
}

  return (
    <>
      <section className="about">
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-12">
              <h1 className="text-center">Which of these best describe you ?</h1>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-md-10 mx-auto">
              <div className="row g-3">
                {(allServices && Array.isArray(allServices)) ?
                <>
                {
                  allServices.length > 0 ?
                  <>
                  {allServices.map((service, index) => (
                    <div key={index} className="col-md-3">
                      <div
                        className={`${
                          selectedServices.includes(service._id)
                            ? "selected"
                            : "artist-card "
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
      </section>

      <ArtistFooter
        backClick={() => navigate(`/become-a-artist/${request_id}/about-your-skills`)}
        nextClick={() => handleNextClick()}
      />
    </>
  );
};

export default AboutYou;
