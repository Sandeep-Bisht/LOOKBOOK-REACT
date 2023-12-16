import React, { useRef } from 'react'
import ArtistFooter from './artistFooter'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { axiosAuth } from 'configs/axiosInstance';

const BASE_URL = process.env.REACT_APP_APIURL

const Description = () => {

  const [artistPayload, setArtistPayload] = useOutletContext();
  let navigate = useNavigate()
  const { request_id } = useParams();
  const { register, handleSubmit } = useForm();  
  const submitBtn = useRef(null)
  
  const submitForm = async({description}) =>{
    if(description == artistPayload.description){
      navigate(`/become-a-artist/${request_id}/finish-setup`)
    }
    else{
      let payload = {
        currentStep:10,description
      }
  
      if(artistPayload?.currentStep > 9){
        delete payload.currentStep;
      }

      try{
        await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`,payload);
        setArtistPayload((prev) => {return {...prev,...payload}})
        navigate(`/become-a-artist/${request_id}/finish-setup`)
      }
      catch(error){
        throw error;
      }

    }
  }

  return (
    <>
      <section className="about">
        <div className="container">
          <div className="row mb-3">
            <div className="col-lg-8 mx-auto">
              <h1 className="text-center">Create your description</h1>
              <h6 className='text-center'>Short titles work best.Have fun with it - you can always change it later</h6>
              <form onSubmit={handleSubmit(submitForm)}>
              <div className='description-box mt-lg-5'>
                <div className="form-floating">
                  <textarea className="form-control resize-none" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: 150 }} defaultValue={artistPayload.description ? artistPayload.description : ''} 
                  {...register("description")}/>
                  <label htmlFor="floatingTextarea2">Comments</label>
                </div>
              </div>
              <button type="submit" hidden ref={submitBtn}></button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <ArtistFooter
        backClick={() => navigate(`/become-a-artist/${request_id}/you-are-best-in`)}
        nextClick={() => submitBtn.current.click()}
      />
    </>
  )
}

export default Description
