import React from 'react'
import ArtistFooter from './common/artistFooter'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { axiosAuth } from 'configs/axiosInstance'

const BASE_URL = process.env.REACT_APP_APIURL

const StepSecond = () => {

  const [artistPayload,setArtistPayload] = useOutletContext();
  const navigate = useNavigate();
  const { request_id } = useParams();


  const handleNextClick = async () =>{
    try{
      if(artistPayload.currentStep > 5){
       return  navigate(`/become-a-artist/${request_id}/gallery`)
      }
        await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`,{currentStep:7});
        setArtistPayload((prev) => {return {...prev,currentStep:6}})
        navigate(`/become-a-artist/${request_id}/gallery`)
    }
    catch(error){
        throw error;
    }
}

  return (
    <>
   <section className="about-skills-ar-2">
        <div className="about-skills-ar-col-2">
          <div className="about-skills-ar-wrapper-2" >
              <h4 className="artist-inner-subheading mb-lg-3">
                               Step 2
                            </h4>
              <h1 className="artist-inner-heading mb-lg-4 text-uppercase">
                                 Make your work stand out
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
        backClick={() => navigate(`/become-a-artist/${request_id}/location`)}
        nextClick={() => handleNextClick()}
      />
      </>
  )
}

export default StepSecond