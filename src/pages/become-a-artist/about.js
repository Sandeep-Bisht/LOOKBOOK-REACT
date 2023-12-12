import React, { useState } from "react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import ArtistFooter from "./artistFooter";
import { AiOutlineHome } from "react-icons/ai";

const AboutYou = () => {
  const [configuration, setConfiguration] = useOutletContext();
  const [artistPayload, setArtistPayload] = useOutletContext();
  const allServices = useLoaderData();

  const navigate = useNavigate();
  console.log(configuration, "about page config", allServices);

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
      // If not selected, add it to the list
      setSelectedServices((prevSelected) => [...prevSelected, service]);
    }
  };

  console.log("I am getting the selected service data here", selectedServices)
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
            <div className="col-md-7 mx-auto">
              <div className="row">
                {allServices &&
                  allServices.length > 0 &&
                  allServices.map((service, index) => (
                    <div key={index} className="col-md-4">
                      <div
                        className={`artist-card ${
                          selectedServices.includes(service.title)
                            ? "selected"
                            : ""
                        }`}
                        onClick={(e) => handleChange(service.title)}
                      >
                        <div className="">
                          <img
                            src={service.icon.thumbnailUrl}
                            alt={service.title}
                            className="img-fluid"
                          />
                        </div>
                        <div>
                          <span>{service.title}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ArtistFooter
        backClick={() => navigate("/become-a-artist/about-your-skills")}
        nextClick={() => {
          // Access the selected services in the next step
          console.log("Selected Services:", selectedServices);
          navigate("/become-a-artist/describe-yourself");
        }}
      />
    </>
  );
};

export default AboutYou;
