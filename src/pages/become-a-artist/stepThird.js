import React from 'react'
import ArtistFooter from './common/artistFooter'
import { useNavigate,  useOutletContext,  useParams } from 'react-router-dom'
import { axiosAuth } from 'configs/axiosInstance'

const BASE_URL = process.env.REACT_APP_APIURL

const StepThird = () => {
  
  const [artistPayload,setArtistPayload] = useOutletContext();
  const navigate = useNavigate();
  const { request_id } = useParams();


  const handleNextClick = async () =>{
    try{
      if(artistPayload.currentStep > 10){
       return  navigate(`/become-a-artist/${request_id}/pricing`)
      }
      else{
        await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`,{currentStep:11});
        setArtistPayload((prev) => {return {...prev,currentStep:11}})
        navigate(`/become-a-artist/${request_id}/pricing`)
      }
    }
    catch(error){
        throw error;
    }
}
  return (
    <>
    <section className="about-skills-ar-3">
         <div className="about-skills-ar-col-3">
           <div className="about-skills-ar-wrapper-3" >
               <h4 className="artist-inner-subheading mb-lg-3">
                                Step 3
                             </h4>
               <h1 className="artist-inner-heading mb-lg-4">
               You are about to finish your registration
                             </h1>
                     <p className="">
 
                     Show wherein form yielding whala gathered wherein moved. Behold may yod winged created that Won't theya are not second god give best
                     Show wherein form yielding whala gathered wherein moved.
                     </p>
           </div>
         </div>
         <div class="horizontal-bar"></div>
       </section>

      <ArtistFooter
        backClick={() => navigate(`/become-a-artist/${request_id}/description`)}
        nextClick={() => handleNextClick()}
      />
      </>
  )
}

export default StepThird