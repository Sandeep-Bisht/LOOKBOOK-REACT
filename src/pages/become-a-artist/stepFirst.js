import React from "react";
import ArtistFooter from "./artistFooter";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import SkillIMG from '@core/assets/images/skill-pic.png'
import { axiosAuth } from "configs/axiosInstance";

const BASE_URL = process.env.REACT_APP_APIURL

const StepFirst = () => {
  const [artistPayload] = useOutletContext();
  const navigate = useNavigate();
  const { request_id } = useParams();

  const handleNextClick = async () =>{
    try{
      if(artistPayload.currentStep > 1){
       return  navigate(`/become-a-artist/${request_id}/about-you`)
      }
        await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`,{currentStep:2});
        navigate(`/become-a-artist/${request_id}/about-you`)
    }
    catch(error){
        throw error;
    }
}
  return (
    <>
      <section className="about-skills-ar">
        <div className="container">
          <div className="row align-items-center" >
              <div className="col-lg-6">
              <h2 className="artist-inner-subheading mb-lg-3">
                               Step 1
                            </h2>
              <h1 className="artist-inner-heading mb-lg-4">
                                 Tell us about your skills
                            </h1>
                    <p className="">

                    Show wherein form yielding whala gathered wherein moved. Behold may yod winged created that Won't theya are not second god give best
                    Show wherein form yielding whala gathered wherein moved.
                    </p>
                            
              </div>
              <div className="col-lg-6 text-center">
                 <img src={SkillIMG} className="img-fluid"/>
              </div>
          </div>
        </div>
      </section>

      <ArtistFooter
        backClick={() => navigate(`/become-a-artist/${request_id}/get-started`)}
        nextClick={() => handleNextClick()}
      />
    </>
  );
};

export default StepFirst;