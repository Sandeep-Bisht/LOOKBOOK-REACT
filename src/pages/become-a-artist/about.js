import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ArtistFooter from "./common/artistFooter";
import NoDataFound from "./common/noDataFound";
import { axiosAuth } from "configs/axiosInstance";

const BASE_URL = process.env.REACT_APP_APIURL

const AboutYou = () => {
  const [artistPayload, setArtistPayload, allCategories] = useOutletContext();
  const { request_id } = useParams();

  const navigate = useNavigate();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [attemptedNextWithoutSelection, setAttemptedNextWithoutSelection] = useState(false);

  useEffect(()=>{
    if(artistPayload){
      if(artistPayload.categories && Array.isArray(artistPayload.categories)){
        setSelectedCategories(artistPayload.categories);
      }
    }
  },[artistPayload])

  const handleChange = (category) => {
    // Check if the service is already selected
    const isSelected = selectedCategories.includes(category);
    setAttemptedNextWithoutSelection(false);

    if (isSelected) {
      // If selected, remove it from the list
      setSelectedCategories((prevSelected) =>
        prevSelected.filter((item) => item !== category)
      );
    } else {
      // If not selected, add it to the list
      setSelectedCategories((prevSelected) => [...prevSelected, category]);
    }
  };
  
  const handleNextClick = async () =>{

    if(selectedCategories.length > 0){
    try{       
      let payload = {currentStep:3,categories:selectedCategories}

        if(artistPayload.currentStep > 2){
            delete payload.currentStep;
        }

        if(artistPayload.categories && Array.isArray(artistPayload.categories)){
          const areEqual = selectedCategories.every((element, index) => element === artistPayload.categories[index]);
         

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
                {(allCategories && Array.isArray(allCategories)) && allCategories.length > 0?
                  <>
                  { allCategories.map((category, index) => (
                   <div key={index} className={`col-md-6 ${attemptedNextWithoutSelection ? 'border-highlight' : ''}`}>
                      <div
                        className={`${
                          selectedCategories.includes(category._id)
                            ? "selected"
                            : "artist-card"
                        }`}
                        
                        onClick={() => handleChange(category._id)}
                      >
                        <div  >
                          <img 
                            src={category.icon.thumbnailUrl}
                            alt={category.title}
                            className="img-fluid about-images"
                          />
                        </div>
                        <div className="card-title">
                          <span>{category.title}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  </> : 
                  <NoDataFound/>
                }               
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