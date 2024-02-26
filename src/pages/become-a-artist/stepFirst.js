import React from "react";
import ArtistFooter from "./common/artistFooter";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { axiosAuth } from "configs/axiosInstance";

const BASE_URL = process.env.REACT_APP_APIURL

const StepFirst = () => {
  const [artistPayload,setArtistPayload] = useOutletContext();
  const navigate = useNavigate();
  const { request_id } = useParams();

  const handleNextClick = async () =>{
    try{
      if(artistPayload.currentStep > 1){
       return  navigate(`/become-a-artist/${request_id}/about-you`)
      }
        await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`,{currentStep:2});
        setArtistPayload((prev) => {return {...prev,currentStep:2}})
        navigate(`/become-a-artist/${request_id}/about-you`)
    }
    catch(error){
        throw error;
    }
}
  return (
    <>
      <section className="about-skills-ar">
        <div className="about-skills-ar-col">
          <div className="about-skills-ar-wrapper">
          <h4 className="artist-inner-subheading mb-lg-3">
            Step 1
          </h4>
          <h1 className="artist-inner-heading mb-lg-4 text-uppercase">
            Tell us about yourself
          </h1>
          <p className="about-skills-ar-para">

            Show wherein form yielding whala gathered wherein moved. Behold may yod winged created that Won't theya are not second god give best
            Show wherein form yielding whala gathered wherein moved.
          </p>

        </div>
          </div>
        <div className="horizontal-bar"></div>
      </section>

      <ArtistFooter
        backClick={() => navigate(`/become-a-artist/${request_id}/get-started`)}
        nextClick={() => handleNextClick()}
      />
    </>
  );
};

export default StepFirst;
