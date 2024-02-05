import React, { useState } from "react";
import "@css/user/profile.css";
import { useForm } from "react-hook-form";
import { TextField, Select, Button } from "@mui/material";
import { MenuItem, InputLabel, FormControl } from "@mui/material";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import boyProfile from "@core/assets/contact/boyImage.png";
import commenProfile from "@core/assets/contact/withoutGender.jpg"
import girlProfile from "@core/assets/contact/girlImageIcon.jpg"
import { axiosAuth } from "configs/axiosInstance";

const EditProfile = () => {
  const userProfile = useLoaderData();
  const [imgSrc, setImgSrc] = useState(userProfile?.image ? userProfile?.image.thumbnailUrl :  userProfile?.gender=="male" ? boyProfile : userProfile?.gender=="female" ? girlProfile : commenProfile);
  const [userData, setUserData] = useState(userProfile);
  const [loading,setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(userProfile.image && userProfile.image);
  let navigate = useNavigate()


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm();

  const onSubmit = (data) => {
     data.image = profileImage;
    submitProfileHandler(data);
  };

  const submitProfileHandler = async (payload) => {
    setLoading(true);
    const formData = new FormData();

    
    Object.keys(payload).forEach((key) => {
      if (key == "image") {
        formData.append(key, payload.image);
      } else {
        formData.append(key, payload[key]);
      }
    });


    try {
      const response = await axiosAuth.post("/users/setProfile", formData);
      if(response.statusText=="OK")
      {
        toast.success('Profile updated Successfully!');
        setLoading(false)
        navigate("/user/profile")
      }
        if(response.duplicateKey=="email"){
          setError('email',{
            type:"manual",
            message:"This email is already exits"
          })
        }
        else if(response.duplicateKey=="alias"){
          setError('email',{
            type:"manual",
            message:"This alias is already exits"
          })
        }
    } catch (error) {
      toast.warn('Failed to update profile!');
    }
  };



  const handleImageUpload = (file) => {
    
    const reader = new FileReader();
    const { files } = file.target;
    
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result);
      reader.readAsDataURL(files[0]);
      setImgSrc(files[0].name)
      setProfileImage(files[0]);

    }
  };


const handleAliasChange = (newValue) => {
  const regex =/^[a-z_-]*$/;
  if (regex.test(newValue)) {
    clearErrors("")
    } else {
    setError("alias", {
      type: "manual",
      message: "Invalid alias. Please use only lowercase letters, underscores, and hyphens."
    });
  }
};

  return (
    <div>
      <section className="usr-new-profile">
        <div className="container view-details">
          <div className="row">
            <div className="col-md-12 usr-new-profile-name">
              <h1>Edit your details</h1>
            </div>
          </div>
          <div className="row usr-new-profile-edit">
            <div className="col-md-5 mb-3">
              <div className="usr-new-profile-photo">
                <img src={ imgSrc && imgSrc} className="img-fluid" />
                <div className="edit_image_button">
                  <label htmlFor="account-settings-upload-image">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="23"
                      viewBox="0 0 20 23"
                      fill="none"
                    >
                      <path
                        d="M2.5 14.5501V17.0835C2.5 17.3168 2.68333 17.5001 2.91667 17.5001H5.45C5.55833 17.5001 5.66667 17.4585 5.74167 17.3751L14.8417 8.28346L11.7167 5.15846L2.625 14.2501C2.54167 14.3335 2.5 14.4335 2.5 14.5501ZM17.2583 5.8668C17.5833 5.5418 17.5833 5.0168 17.2583 4.6918L15.3083 2.7418C14.9833 2.4168 14.4583 2.4168 14.1333 2.7418L12.6083 4.2668L15.7333 7.3918L17.2583 5.8668Z"
                        fill="#6D5D4C"
                      />
                    </svg>
                    Update Profile Picture
                  </label>
                  <input
                    hidden
                    // {...profileImage}
                    type="file"
                    onChange={e => {
                      
                      handleImageUpload(e);
                    }}
                    accept="image/png, image/jpeg"
                    id="account-settings-upload-image"
                  />
                  
                </div>
                <div className="user-new-profile-update-details">
                  <h6>{userData?.fullName ? userData.fullName : "John Doe"}</h6>
                  <p>{userData?.fullName ? userData.email : "example@gmail.com"}</p>
                </div>
              </div>
            </div>
            <div className="col-md-7 mb-3">
              <div className="user-update-form">
                {/* ================== Form start here ========================  */}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-6">
                    <TextField
                    {...register("fullName", {
                      required: "FullName is required",
                    })}
                    name="fullName"
                    label="Enter your Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    defaultValue={userData?.fullName || ""}
                  />
                    <TextField
                    {...register("mobile", {
                      required: "Mobile number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Please enter a valid 10-digit mobile number",
                      },
                    })}
                    name="mobile"
                    type="number"
                    label="Enter your Mobile Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    defaultValue={userData?.mobile || ""}
                    InputProps={{
                      readOnly: userData?.usertype === "mobile",
                    }}
                  />
                    <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel id="gender-label">Select a Gender</InputLabel>
                    <Select
                      labelId="gender-label"
                      label="Select a Gender"
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                      defaultValue={userData?.gender || ""} // Set an empty string as the default value
                    >
                      <MenuItem value="" disabled>
                        Select a gender
                      </MenuItem>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                    {/* {errors.gender && (
                      <span style={{ color: "red" }}>
                        {errors.gender.message}
                      </span>
                    )} */}
                  </FormControl>
                  <div className="row">
                      <div className="col-6">
                      <button className="user-update-form-button mt-2">
                    Update
                  </button>
                      </div>
                      <div className="col-6">
                      <Link to="/user/profile" type="button" className="user-update-form-button text-center link-cancle-button mt-2">
                    Cancle
                  </Link>
                      </div>
                    </div>
                    </div>
                    <div className="col-6">
                    <TextField
                    {...register("alias")}
                    name="alias"
                    label="Alias"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    defaultValue={userData?.alias || ""}
                    onChange={(e) => handleAliasChange(e.target.value)}
                    error={Boolean(errors.alias)}
                    helperText={errors.alias?.message}
                  />  
                    <TextField
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Please enter a valid email address",
                      },
                    })}
                    type="email"
                    label="Enter your Email"
                    variant="outlined"
                    name="email"
                    fullWidth
                    margin="normal"
                    defaultValue={userData?.email || ""}
                    InputProps={{
                      readOnly:
                        userData?.usertype == "google" ||
                        userData?.usertype == "email",
                    }}
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
      <FormControl fullWidth variant="outlined" margin="normal">
        <TextField
        className="my-0"
          {...register("dob")}
          labelId="dob"
          label="Date of Birth"
          variant="outlined"
          name="dob"
          fullWidth
          type="date"
          margin="normal"
          // placeholder="Date of Birth"
          defaultValue={userData?.dob || ""}
          InputLabelProps={{
            shrink: true,
          }}
        />

      </FormControl>
                      </div>
                  </div>
                </form>

                {/* =================Form ends ======================= */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
