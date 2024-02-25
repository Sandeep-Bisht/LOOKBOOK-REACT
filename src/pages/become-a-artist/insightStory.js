import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ArtistFooter from "./common/artistFooter";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useForm } from "react-hook-form";
import { axiosAuth } from "configs/axiosInstance";
import {Checkbox,FormGroup,FormControlLabel} from '@mui/material';

const BASE_URL = process.env.REACT_APP_APIURL

const InsightStory = () => {
  
  const { register, handleSubmit } = useForm();  
  const [artistPayload, setArtistPayload] = useOutletContext();
  const [selectLanguages,setSelectLanguages] = useState(artistPayload?.languages ? artistPayload?.languages : []);
  const submitBtnRef = useRef(null)
  const { request_id } = useParams();
  let navigate = useNavigate();
  const [experience, setExperience] = useState(0);
  
  useEffect(()=>{
    if(artistPayload && artistPayload?.experience){
      setExperience(artistPayload?.experience);
      
    }
  },[artistPayload])

  const decreaseExperience = () => {
    if (experience > 0) {
      setExperience(experience - 1);
    }
  };

  const increaseExperience = () => {
    setExperience( 1 + + experience);
  };

  const updatePayload = async (payload)=>{
    try{
    await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`,payload);
    setArtistPayload((prev) => {return {...prev,...payload}})
    navigate(`/become-a-artist/${request_id}/you-are-best-in`)
    }
    catch(error){
      throw error;
    }
  }

  const handleNextClick = async ({education,languages}) =>{

    let payload = {
      currentStep:8,experience,education,languages
    }

    if(!Array.isArray(languages)){
      delete payload.languages;
    }

    if(artistPayload?.currentStep > 7){
      delete payload.currentStep;
    }

    try{
        if(artistPayload?.experience || artistPayload?.education || artistPayload?.languages){
            if(artistPayload?.experience == experience && artistPayload?.education == education && Array.isArray(artistPayload?.languages)){
              let areEqual = false;
              
              if(!Array.isArray(languages)){
                areEqual = true
              }
              else{
                areEqual = languages.every((element, index) => element === artistPayload?.languages[index]);
              }

              if(areEqual){
                return navigate(`/become-a-artist/${request_id}/you-are-best-in`)
              }
              else{
                  updatePayload(payload)
              }
            }
            else{
              updatePayload(payload);
          }

        }else{
          updatePayload(payload);
        }
    }
    catch(error){
        throw error;
    }
  }

  const handleLanguageChange = (event) => {
    const selectedLanguagesCopy = event.target.value;
    setSelectLanguages(selectedLanguagesCopy);
  };

  const submitForm = (data) =>{
    handleNextClick(data);
  }

  return (
    <>
      <section className="insight-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="insight-wrapper-heading text-center">
                <h4 className="">
                  Share Some More Details
                </h4>
              </div>
            </div>
          </div>
          <form className="my-5" onSubmit={handleSubmit(submitForm)}>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-8 mx-auto">
                <div className="insight-card mb-5">
                  <div>Years of experience ?</div>
                  <div className="d-flex align-items-center">
                    <span
                      className="plus-button me-3"
                      onClick={decreaseExperience}
                    >
                      -
                    </span>
                    {experience}
                    <span
                      className="plus-button ms-3"
                      onClick={increaseExperience}
                    >
                      +
                    </span>
                  </div>
                </div>
                <hr className="" />
                <div className="insight-card mb-5">
                  <div>Level of education ?</div>
                  <div>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-standard-label">Education Level</InputLabel>
                  <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  name="education"
                  label="Education Level"
                  {...register("education")}
                  defaultValue={artistPayload?.education ? artistPayload?.education : ''}
                  > 
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="High School">High School</MenuItem>
                  <MenuItem value="Associate's Degree">Associate's Degree</MenuItem>
                  <MenuItem value="Bachelor's Degree">Bachelor's Degree</MenuItem>
                  <MenuItem value="Master's Degree">Master's Degree</MenuItem>
                  <MenuItem value="Doctorate Ph.D.">Doctorate Ph.D.</MenuItem>
                  <MenuItem value="Vocational Technical Training">Vocational Technical Training</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                </FormControl>
                  </div>
                </div>
                <hr className="" />
                <div className="insight-card mb-5">
      <div>How many languages do you speak?</div>
      <div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Languages
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            name="languages"
            label="Languages"
            className="multi-language-select"
            defaultValue={artistPayload?.languages || []}
            {...register("languages")}
            multiple
            onChange={handleLanguageChange}
          >
            <MenuItem value="Hindi">
              <Checkbox
                checked={selectLanguages.includes('Hindi') || false}
              />
              Hindi
            </MenuItem>
            <MenuItem value="English">
              <Checkbox
                checked={selectLanguages.includes('English') || false}
              />
              English
            </MenuItem>
            <MenuItem value="French">
              <Checkbox
                checked={selectLanguages.includes('French') || false}
              />
              French
            </MenuItem>
            <MenuItem value="German">
              <Checkbox
                checked={selectLanguages.includes('German') || false}
              />
              German
            </MenuItem>
            <MenuItem value="German">
              <Checkbox
                checked={selectLanguages.includes('German') || false}
              />
              Spanish
            </MenuItem>
            <MenuItem value="German">
              <Checkbox
                checked={selectLanguages.includes('German') || false}
              />
              Indonesian
            </MenuItem>
            <MenuItem value="German">
              <Checkbox
                checked={selectLanguages.includes('German') || false}
              />
              Japanese
            </MenuItem>
            {/* Add more languages as needed */}
          </Select>
        </FormControl>
      </div>
    </div>
                <hr className="" />
              </div>
            </div>
          </div>
          <button type="submit" className="d-none" ref={submitBtnRef}></button>
          </form>
        </div>
        <div className="horizontal-bar"></div>
      </section>

      <ArtistFooter
        backClick={() => navigate(`/become-a-artist/${request_id}/gallery`)}
        nextClick={() => submitBtnRef.current.click()}
      />
    </>
  );
};

export default InsightStory;
