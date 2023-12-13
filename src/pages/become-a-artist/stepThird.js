import React from 'react'
import ArtistFooter from './artistFooter'
import { useNavigate,  useParams } from 'react-router-dom'
import SkillIMG from '@core/assets/images/kit-removebg.png'

const StepThird = () => {
  const { request_id } = useParams();

    let navigate = useNavigate()
  return (
    <>
    <section className="about-skills-ar">
         <div className="container">
           <div className="row align-items-center" >
               <div className="col-lg-6">
               <h2 className="artist-inner-subheading mb-lg-3">
                                Step 3
                             </h2>
               <h1 className="artist-inner-heading mb-lg-4">
                                  You are about to finish you registration
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
        backClick={() => navigate(`/become-a-artist/${request_id}/description`)}
        nextClick={() => navigate(`/become-a-artist/${request_id}/pricing`)}
      />
      </>
  )
}

export default StepThird