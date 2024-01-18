import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams, useLoaderData } from "react-router-dom";
import ArtistFooter from "./common/artistFooter";

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

import { axiosAuth } from "configs/axiosInstance";

const BASE_URL = process.env.REACT_APP_APIURL;

const Details = () => {
  const [artistPayload, setArtistPayload] = useOutletContext();
  const userProfile = useLoaderData();
  const [updating,setUpdating] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let navigate = useNavigate();
  const { request_id } = useParams();
  const submitBtn = useRef(null);


  let currentDate = new Date();
  currentDate.setFullYear(new Date().getFullYear() - 15);
  currentDate = new Date(currentDate).toISOString().split("T")[0];
   // Get the current date in 'YYYY-MM-DD' format
   

  const  areValuesEqual = (obj1, obj2) => {
    // Get the keys of obj1
    const keysObj1 = Object.keys(obj1);
  
    // Iterate through the keys of obj1
    for (let key of keysObj1) {
      // Check if the key exists in obj2
      if (!(key in obj2)) {
        return false;
      }
  
      // Compare the values of the keys
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
  
    // All values are equal
    return true;
  }


  const submitForm = async (data) => {
    setUpdating(true)
    try {
      const profileSame = areValuesEqual(data, userProfile);

      if(profileSame){
        return nextClick();
      }

      const response = await axiosAuth.post("/users/setProfile", data);
      if(response.statusText=="OK")
      {
        nextClick()

      }
    } catch (error) {
      console.log(
        error.message ||
        "An error occured while submiting the  user  profile data."
      );
    }
    finally{
      setUpdating(false)
    }

  }

  const nextClick = async () =>{
    setUpdating(true)
    try{
      if(artistPayload.currentStep > 14){
       return  navigate(`/become-a-artist/${request_id}/review-request`)
      }
      else{
        await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`,{currentStep:15});
        setArtistPayload((prev) => {return {...prev,currentStep:15}})
        navigate(`/become-a-artist/${request_id}/review-request`)
      }
    }
    catch(error){
        throw error;
    }
    finally{
      setUpdating(false)
    }
  }


  return (
    <>
      <section className="last-step-ar">
        <div className="container">
          <div className="last-step-ar-heading">
              <h4 className="text-center">Just one last step</h4>
              <p className="text-center">Please fill out the details below</p>
          </div>
          <div className="row my-5">
            <div className="col-lg-8 mx-auto">
              <form onSubmit={handleSubmit(submitForm)}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <TextField
                      {...register("fullName", { required: "Fullname is required." })}
                      name="fullName"
                      label="Full Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      defaultValue={userProfile.fullName || ""}
                    />
                    {errors.fullName && (
                    <div className="invalid-feedback">
                      {errors.fullName.message}
                    </div>)}
                  </div>
                  <div className="col-md-6">
                    <TextField
                        {...register("alias", { required: "Alias is required." })}
                        name="alias"
                        label="Alias"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        defaultValue={userProfile.alias || ""}
                      />
                      {errors.alias && (
                      <div className="invalid-feedback">
                        {errors.alias.message}
                      </div>)}
                  </div>
                  <div className="col-md-6">
                    <TextField
                        {...register("mobile", 
                        { required: "Mobile is required.",
                         pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Please enter a valid 10-digit mobile number",
                        } })}
                        name="mobile"
                        label="Mobile"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        defaultValue={userProfile.mobile || ""}
                      />
                      {errors.mobile && (
                      <div className="invalid-feedback">
                        {errors.mobile.message}
                      </div>)}
                  </div>
                  <div className="col-md-6">
                  <TextField
                      {...register("email", 
                      { required: "Email is required.", 
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Please enter a valid email address",
                      } })}
                      name="email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      defaultValue={userProfile.email || ""}
                    />
                    {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>)}
                  </div>
                  <div className="col-md-6">
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Gender</FormLabel>
                          <RadioGroup row aria-label="gender" name="gender" defaultValue={userProfile.gender || ""} > 
                            <FormControlLabel
                              value="male"
                              control={<Radio {...register("gender", { required: "Gender is required" })}/>}
                              label="Male"
                            />
                            <FormControlLabel
                              value="female"
                              control={<Radio {...register("gender", { required: "Gender is required" })}/>}
                              label="Female"
                            />
                            <FormControlLabel
                              value="other"
                              control={<Radio {...register("gender", { required: "Gender is required" })}/>}
                              label="Other"
                            />
                          </RadioGroup>
                      {errors.gender && (
                        <div style={{ color: "red", marginTop: "8px" }}>
                          {errors.gender.message}
                        </div>
                      )}
                    </FormControl>
                  </div>

                  <div className="col-md-6">
                    <FormLabel component="legend">Date of Birth</FormLabel>
                        <TextField
                          {...register("dob", { required: "DOB is required." })}
                          variant="outlined"
                          name="dob"
                          fullWidth
                          type="date"
                          placeholder="DD/MM/YYYY"
                          defaultValue={userProfile.dob || ""} 
                          inputProps={{
                            max: currentDate, 
                          }}
                        />
                    {errors.dob && (
                    <div className="invalid-feedback">
                      {errors.dob.message}
                    </div>)}
                  </div>
                   <div className="col-md-6">
                   <TextField
                      {...register("instaId", { required: "Instagram ID is required." })}
                      name="instaId"
                      label="Instagram ID"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      defaultValue={userProfile.instaId || ""}
                    />
                    {errors.instaId && (
                    <div className="invalid-feedback">
                      {errors.instaId.message}
                    </div>)}
                  </div>
                </div>
                <button type="submit" hidden ref={submitBtn}></button>
              </form>
            </div>
          </div>
        </div>
        <div>
    </div>
    <div className="horizontal-bar"></div>
    </section>

      <ArtistFooter
        backClick={() =>
          navigate(`/become-a-artist/${request_id}/upload-cerificates`)
        }
        nextClick={() => submitBtn.current.click()}
        nextDisabled={updating}
      />
    </>
  );
};

export default Details;
