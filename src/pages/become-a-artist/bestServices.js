import React, { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ArtistFooter from "./artistFooter";
import NoDataFound from "./common/noDataFound";
import allServices from "./common/bestOfYou.json"

const BestServices = () => {
  const { request_id } = useParams();

  const navigate = useNavigate();

  const [selectedServices, setSelectedServices] = useState([]);


  const handleChange = (service) => {
    
    // Check if the service is already selected
    const isSelected = selectedServices.includes(service);

    if (isSelected) {
      // If selected, remove it from the list
      setSelectedServices((prevSelected) =>
        prevSelected.filter((item) => item !== service)
      );
    } else {
      if(selectedServices.length < 2){
        setSelectedServices((prevSelected) => [...prevSelected, service]);
      }
      // If not selected, add it to the list
    }
  };
  
  // 8

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
        backClick={() => navigate(`/become-a-artist/${request_id}/gallery`)}
        nextClick={() => navigate(`/become-a-artist/${request_id}/description`)}
      />
    </>
  );
};

export default BestServices;
