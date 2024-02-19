import React, { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ArtistFooter from "./common/artistFooter";
import NoDataFound from "./common/noDataFound";
import { axiosAuth } from "configs/axiosInstance";

const BASE_URL = process.env.REACT_APP_APIURL

const BestServices = () => {
  const [artistPayload, setArtistPayload, allCategories] = useOutletContext();
  const { request_id } = useParams();

  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(artistPayload.featuredCategory ? artistPayload.featuredCategory : null);
  const [attemptedNextWithoutSelection, setAttemptedNextWithoutSelection] = useState(false);
  const options = allCategories.filter((item) => artistPayload?.categories?.includes(item._id));
  
  const handleNextClick = async () =>{
    if(!selectedCategory || selectedCategory == ''){
      return setAttemptedNextWithoutSelection(true);
    }

    setAttemptedNextWithoutSelection(false)

    try{
      if(artistPayload.currentStep > 8 && artistPayload.featuredCategory == selectedCategory){
       return  navigate(`/become-a-artist/${request_id}/description`)
      }
        await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`,{currentStep:9,featuredCategory:selectedCategory});
        setArtistPayload((prev) => {return {...prev,currentStep:9,featuredCategory:selectedCategory}})
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
                {(options && Array.isArray(options)) &&  options.length > 0?
                <>
                  {options.map((category, index) => (
                   <div key={index} className={`col-md-6 ${attemptedNextWithoutSelection && (!selectedCategory || selectedCategory == '') ? 'border-highlight' : ''}`}>
                      <div
                        className={`${
                          category._id == selectedCategory
                            ? "selected"
                            : "artist-card"
                        }`}
                        
                        onClick={() => setSelectedCategory(category._id)}
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
        backClick={() => navigate(`/become-a-artist/${request_id}/insight-your-work`)}
        nextClick={() => handleNextClick()}
      />
    </>
  );
};

export default BestServices;
