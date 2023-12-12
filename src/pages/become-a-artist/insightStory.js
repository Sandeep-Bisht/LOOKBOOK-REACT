import React, { useRef, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ArtistFooter from "./artistFooter";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useForm } from "react-hook-form";

const InsightStory = () => {
  
  const { register, handleSubmit } = useForm()
  const [artistPayload, setArtistPayload] = useOutletContext();
  const submitBtnRef = useRef(null)
  const { request_id } = useParams();
  let navigate = useNavigate();
  const [experience, setExperience] = useState(1);

  

  const decreaseExperience = () => {
    if (experience > 0) {
      setExperience(experience - 1);
    }
  };

  const increaseExperience = () => {
    setExperience(experience + 1);
  };

  const submitForm = (data) =>{
    console.log(data,'data is this')

  }

  return (
    <>
      <section className="insight-wrapper py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="">
                <h1 className="text-center">
                  Share some insights of your work
                </h1>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit(submitForm)}>
          <div className="col-md-12 mt-4 mb-5">
            <div className="row">
              <div className="col-md-8 mx-auto">
                <div className="insight-card mb-4">
                  <div>Year of experience ?</div>
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
                <div className="insight-card mb-4">
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
                  <MenuItem value="Associate\'s Degree">Associate\'s Degree</MenuItem>
                  <MenuItem value="Bachelor\'s Degree">Bachelor\'s Degree</MenuItem>
                  <MenuItem value="Master\'s Degree">Master\'s Degree</MenuItem>
                  <MenuItem value="Doctorate/Ph.D.">Doctorate/Ph.D.</MenuItem>
                  <MenuItem value="Vocational/Technical Training">Vocational/Technical Training</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                </FormControl>
                  </div>
                </div>
                <hr className="" />
                <div className="insight-card mb-4">
                  <div>How many languages do you speak?</div>
                  <div>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-standard-label">Languages</InputLabel>
                  <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  name="languages"
                  label="Languages"
                  {...register("languages")}
                  > 
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Hindi">Hindi</MenuItem>
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="French">French</MenuItem>
                  <MenuItem value="German">German</MenuItem>
                  <MenuItem value="Italic">Italic</MenuItem>
                  <MenuItem value="Japanese">Japanese</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
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
      </section>

      <ArtistFooter
        backClick={() => navigate(`/become-a-artist/${request_id}/location`)}
        nextClick={() => submitBtnRef.current.click()}
      />
    </>
  );
};

export default InsightStory;
