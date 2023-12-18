import React, { useRef } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import ArtistFooter from './common/artistFooter';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { axiosAuth } from 'configs/axiosInstance';

const BASE_URL = process.env.REACT_APP_APIURL

const Details = () => {

  const [artistPayload, setArtistPayload] = useOutletContext();
  let navigate = useNavigate()
  const { request_id } = useParams();
  const { register, handleSubmit } = useForm();  
  const submitBtn = useRef(null)

  const submitForm = async(data) =>{
    let payload = {
      currentStep:15,...data
    }

    let hasChanged = false;
    
    Object.keys(data).forEach(function(key) {
      if(artistPayload[key]  !== data[key]){
        hasChanged = true;
      }
    });

    if(hasChanged){
      if(artistPayload?.currentStep > 14){
        delete payload.currentStep;
      }
      try{
        await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`,payload);
        setArtistPayload((prev) => {return {...prev,...payload}})
        navigate(`/become-a-artist/${request_id}/review-request`)
      }
      catch(error){
        throw error;
      }
    }
    else{
      if(artistPayload?.currentStep > 14){
        navigate(`/become-a-artist/${request_id}/review-request`)
      }
      else{
        await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`,payload);
        setArtistPayload((prev) => {return {...prev,...payload}})
        navigate(`/become-a-artist/${request_id}/review-request`)
      }
    }
  }

  return (
    <>
    <section className="about">
    <div className="container">
      <div className="row mb-3">
        <div className="col-lg-8 mx-auto">
          <h1 className="text-center">Just one last step</h1>
          <h6 className='text-center'>Short titles work best.Have fun with it - you can always change it later</h6>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className='row g-3 mt-4'>
              <div className='col-md-6'>
                <div className="form-floating">
                  <input type="text" className='form-control' placeholder='Fullname' id="floatingText" defaultValue={artistPayload.fullname ? artistPayload.fullname : ''} {...register("fullname")}/>
                  <label htmlFor="floatingTextarea2">Fullname</label>
                </div>
              </div>
              <div className='col-md-6'>
                <div className="form-floating">
                  <input type="email" className='form-control' placeholder='Email' id="floatingText" defaultValue={artistPayload.email ? artistPayload.email : ''} {...register("email")}/>
                  <label htmlFor="floatingTextarea2">Email</label>
                </div>
              </div>
              <div className='col-md-6'>
                <div className="form-floating">
                  <input type="number" className='form-control' placeholder='Mobile' id="floatingText" defaultValue={artistPayload.mobile ? artistPayload.mobile : ''} {...register("mobile")}/>
                  <label htmlFor="floatingTextarea2">Mobile</label>
                </div>
              </div>
              <div className='col-md-6'>
                <div className="form-floating">
                  <input type="text" className='form-control' placeholder='Alias' id="floatingText" defaultValue={artistPayload.alias ? artistPayload.alias : ''} {...register("alias")}/>
                  <label htmlFor="floatingTextarea2">Alias</label>
                </div>
              </div>
              <div className='col-md-6'>
                <FormControl component="fieldset">
                  <FormLabel component="legend" >Gender</FormLabel>
                    <RadioGroup
                      row
                      {...register("gender")}
                      aria-label="gender"
                      name="gender"
                      defaultValue={artistPayload.gender ? artistPayload.gender : ''}
                    >
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
              </div>
              <div className='col-md-6'>
              <FormLabel component="legend">Date of Birth</FormLabel>
              <TextField
                {...register("dob")}
                variant="outlined"
                name="dob"
                fullWidth
                type="date"
                placeholder="DD/MM/YYYY"
                defaultValue={artistPayload.dob ? artistPayload.dob : ''}
              />
              </div>
              <div className='col-md-6 d-flex align-items-end'>
                <div className="form-floating w-100">
                  <input type="text" className='form-control' placeholder='Instagram ID' id="floatingText" defaultValue={artistPayload.instaId ? artistPayload.instaId : ''} {...register("instaId")}/>
                  <label htmlFor="floatingTextarea2">Instagram ID</label>
                </div>
              </div>
            </div>
          <button type="submit" hidden ref={submitBtn}></button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <ArtistFooter
    backClick={() => navigate(`/become-a-artist/${request_id}/upload-cerificates`)}
    nextClick={() => submitBtn.current.click()}
  />
  </>
  )
}

export default Details