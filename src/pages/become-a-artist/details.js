import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
  const [handlerNumberEdit,setHandlerNumberEdit] = useState(false);
  const [handlerEmailEdit,setHandlerEmailEdit] = useState(false);
  const [mobileToVerify, setMobileToVerify] = useState('');
  const [emailToVerify, setEmailToVerify] = useState('');

  let navigate = useNavigate();
  const { request_id } = useParams();
  // const { register, handleSubmit } = useForm();
  const submitBtn = useRef(null);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in 'YYYY-MM-DD' format

  const submitForm = async (data) => {
    let payload = {
      currentStep: 15,
      ...data,
    };

    let hasChanged = false;

    Object.keys(data).forEach(function (key) {
      if (artistPayload[key] !== data[key]) {
        hasChanged = true;
      }
    });

    if (hasChanged) {
      if (artistPayload?.currentStep > 14) {
        delete payload.currentStep;
      }
      try {
        await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`, payload);
        setArtistPayload((prev) => {
          return { ...prev, ...payload };
        });
        navigate(`/become-a-artist/${request_id}/review-request`);
      } catch (error) {
        throw error;
      }
    } else {
      if (artistPayload?.currentStep > 14) {
        navigate(`/become-a-artist/${request_id}/review-request`);
      } else {
        await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`, payload);
        setArtistPayload((prev) => {
          return { ...prev, ...payload };
        });
        navigate(`/become-a-artist/${request_id}/review-request`);
      }
    }
  };

  const verifyMobileHandler = (mobile)=>{
        console.log(mobile, "check the  mobile number");
  }

  const verifyEmailHandler = (email)=>{
    console.log(email,"check email erery time")
  }

  return (
    <>
      <section className="about">
        <div className="container">
          <div className="row mb-3">
            <div className="col-lg-8 mx-auto">
              <h1 className="text-center">Just one last step</h1>
              <h6 className="text-center">
                Short titles work best.Have fun with it - you can always change
                it later
              </h6>
              <form onSubmit={handleSubmit(submitForm)}>
                <div className="row g-3 mt-4">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <Controller
                        name="fullname"
                        defaultValue={artistPayload.fullname ? artistPayload.fullname : ''}
                        control={control}
                        rules={{
                          required: "Fullname is required",
                        }}
                        render={({ field }) => (
                          <>
                            <input
                              {...field}
                              type="text"
                              className={`form-control ${
                                errors.fullname ? "is-invalid" : ""
                              }`}
                              placeholder="Fullname"
                              id="floatingText"
                            />
                            {errors.fullname && (
                              <div className="invalid-feedback">
                                {errors.fullname.message}
                              </div>
                            )}
                          </>
                        )}
                      />
                      <label htmlFor="floatingText">Fullname</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <Controller      
                        defaultValue={artistPayload.alias ? artistPayload.alias : ''}
                        name="alias"
                        control={control}
                        rules={{
                          required: "Alias is required",
                        }}
                        render={({ field }) => (
                          <>
                            <input
                              {...field}
                              type="text"
                              className={`form-control ${
                                errors.alias ? "is-invalid" : ""
                              }`}
                              placeholder="Alias"
                              id="floatingText"
                            />
                            {errors.alias && (
                              <div className="invalid-feedback">
                                {errors.alias.message}
                              </div>
                            )}
                          </>
                        )}
                      />
                      <label htmlFor="floatingText">Alias</label>
                    </div>
                     </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-7">
                      <div className="form-floating">
                      <Controller
                        defaultValue={artistPayload.mobile ? artistPayload.mobile : ''}
                        name="mobile"
                        control={control}
                        rules={{
                          required: "Mobile is required",
                        }}
                        render={({ field }) => (
                          <>
                            <input
                              {...field}
                              type="number"
                              className={`form-control ${
                                errors.mobile ? "is-invalid" : ""
                              }`}
                              placeholder="Mobile"
                              id="floatingText"
                              onChange={(e) => {
                                field.onChange(e);
                                setMobileToVerify(e.target.value);
                              }}
                              readOnly={handlerNumberEdit} 
                             />
                            {errors.mobile && (
                              <div className="invalid-feedback">
                                {errors.mobile.message}
                              </div>
                            )}
                          </>
                        )}
                      />
                      <label htmlFor="floatingText">Mobile</label>
                    </div>
                      </div>
                      <div className="col-md-5 d-flex align-items-center">
                        {
                          artistPayload.mobile!=="" ? 
                          <button className="btn" style={{background:"#8c6a54", color:"#fff",borderRadius:"25px",height:"35px"}} onClick={setHandlerNumberEdit(true)}>Edit</button>
                          :
                          <button className="btn ms-2" style={{background:"#8c6a54", color:"#fff",borderRadius:"25px",height:"35px"}} onClick={() => verifyMobileHandler(mobileToVerify)}>Verify</button>
                        }
                    </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-7">
                      <div className="form-floating">
                      <Controller
                        name="email"
                        defaultValue={artistPayload.email ? artistPayload.email : ''}
                        control={control}
                        rules={{
                          required: "Email is required",
                        }}
                        render={({ field }) => (
                          <>
                            <input
                              {...field}
                              type="email"
                              className={`form-control ${
                                errors.email ? "is-invalid" : ""
                              }`}
                              placeholder="Email"
                              id="floatingText"
                              onChange={(e) => {
                                field.onChange(e);
                                setEmailToVerify(e.target.value);
                              }}
                              readOnly={handlerEmailEdit}
                            />
                            {errors.email && (
                              <div className="invalid-feedback">
                                {errors.email.message}
                              </div>
                            )}
                          </>
                        )}
                      />
                      <label htmlFor="floatingText">Email</label>
                    </div>
                      </div>
                      <div className="col-md-5 d-flex align-items-center">
                        {
                          artistPayload.email!=="" ?
                          <button className="btn ms-2" style={{background:"#8c6a54", color:"#fff",borderRadius:"25px",height:"35px"}} onClick={setHandlerEmailEdit(true)}>Edit</button>
                          :
                          <button className="btn" style={{background:"#8c6a54", color:"#fff",borderRadius:"25px",height:"35px"}} onClick={() => verifyEmailHandler(emailToVerify)}>Verify</button>
                        }
                    </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                  
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Gender</FormLabel>
                      <Controller
                        name="gender"
                        control={control}
                        defaultValue={
                          artistPayload.gender ? artistPayload.gender : ""
                        }
                        rules={{ required: "Please select a gender" }}
                        render={({ field }) => (
                          <RadioGroup row aria-label="gender" {...field}>
                            <FormControlLabel
                              value="male"
                              control={<Radio />}
                              label="Male"
                            />
                            <FormControlLabel
                              value="female"
                              control={<Radio />}
                              label="Female"
                            />
                            <FormControlLabel
                              value="other"
                              control={<Radio />}
                              label="Other"
                            />
                          </RadioGroup>
                        )}
                      />
                      {errors.gender && (
                        <div style={{ color: "red", marginTop: "8px" }}>
                          {errors.gender.message}
                        </div>
                      )}
                    </FormControl>
                  </div>

                  <div className="col-md-6">
                    <FormLabel component="legend">Date of Birth</FormLabel>
                    <Controller
                      name="dob"
                      control={control}
                      defaultValue={artistPayload.dob ? artistPayload.dob : ""}
                      rules={{
                        required: "Date of Birth is required",
                        max: {
                          value: currentDate,
                          message: "DOB must be today or earlier",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          variant="outlined"
                          name="dob"
                          fullWidth
                          type="date"
                          placeholder="DD/MM/YYYY"
                          error={!!errors.dob}
                          helperText={errors.dob ? errors.dob.message : ""}
                          inputProps={{
                            max: currentDate, 
                          }}
                        />
                      )}
                    />
                  </div>
                   <div className="col-md-6 d-flex align-items-end">
                    <div className="form-floating w-100">
                      <Controller
                        name="instaId"
                        control={control}
                        defaultValue={
                          artistPayload.instaId ? artistPayload.instaId : ""
                        }
                        rules={{
                          required: "InstaId is required",
                        }}
                        render={({ field }) => (
                          <>
                            <input
                              {...field}
                              type="text"
                              className={`form-control ${
                                errors.instaId ? "is-invalid" : ""
                              }`}
                              placeholder="InstaId"
                              id="floatingText"
                            />
                            {errors.instaId && (
                              <div className="invalid-feedback">
                                {errors.instaId.message}
                              </div>
                            )}
                          </>
                        )}
                      />
                      <label htmlFor="floatingText">Instagram ID</label>
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
        backClick={() =>
          navigate(`/become-a-artist/${request_id}/upload-cerificates`)
        }
        nextClick={() => submitBtn.current.click()}
      />
    </>
  );
};

export default Details;
