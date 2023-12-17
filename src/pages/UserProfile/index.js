import React from "react";
import { useForm } from "react-hook-form";
import { Grid, TextField, Button } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { axiosAuth } from "configs/axiosInstance";
import ToastNotification from 'toastNotification/toastNatification'
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import Close from "mdi-material-ui/Close";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const UserProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const userProfile = useLoaderData();
  const [profile, setProfile] = useState(userProfile);
  const [imgSrc, setImgSrc] = useState(userProfile?.image?.thumbnailUrl ? userProfile.image.thumbnailUrl : "/images/avatars/1.png");
  const [successStatus,setSuccessStatus] = useState(false)
  const [loading,setLoading] = useState(false);

  const ImgStyled = styled("img")(({ theme }) => ({
    width: 120,
    height: 120,
    marginRight: theme.spacing(6.25),
    borderRadius: theme.shape.borderRadius,
  }));

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result);
      reader.readAsDataURL(files[0]);
    }
  };

  const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      textAlign: "center",
    },
  }));


  const ResetButtonStyled = styled(Button)(({ theme }) => ({
    marginLeft: theme.spacing(4.5),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginLeft: 0,
      textAlign: "center",
      marginTop: theme.spacing(4),
    },
  }));

  const onSubmit = (data) => {
    console.log(data,'data of form')
    submitProfileHandler(data);
  };

  const submitProfileHandler = async (payload) => {
    setLoading(true);
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      if (key == "image") {
        formData.append(key, payload.image[0]);
      } else {
        formData.append(key, payload[key]);
      }
    });

    try {
      const response = await axiosAuth.post("/users/setProfile", formData);
      if(response.status==200)
      {
        setSuccessStatus(true);
        setLoading(false)
      }
    } catch (error) {
      console.log(
        error.message ||
        "An error occured while submiting the  user  profile data."
      );
    }
  };

  const profileImage = register("image");

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ImgStyled src={imgSrc} alt="/images/avatars/1.png" />
              <Box>
                <ButtonStyled
                  component="label"
                  variant="contained"
                  htmlFor="account-settings-upload-image"
                >
                  Upload New Photo
                  <input
                    hidden
                    {...profileImage}
                    type="file"
                    onChange={e => {
                      profileImage.onChange(e);
                      handleImageUpload(e);
                    }}
                    accept="image/png, image/jpeg"
                    id="account-settings-upload-image"
                  />
                </ButtonStyled>
                <ResetButtonStyled
                  color="error"
                  variant="outlined"
                  onClick={() => setImgSrc(userProfile?.image?.thumbnailUrl ? userProfile.image.thumbnailUrl : "/images/avatars/1.png")}
                >
                  Reset
                </ResetButtonStyled>
                <Typography variant="body2" sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register("fullName")}
              name="fullName"
              label="Full Name"
              variant="outlined"
              fullWidth
              margin="normal"
              defaultValue={profile.fullName || ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please enter a valid email address",
                },
              })}
              type="email"
              label="Email"
              variant="outlined"
              name="email"
              fullWidth
              margin="normal"
              defaultValue={profile.email || ""}
              InputProps={{
                readOnly: profile.usertype == "google" || profile.usertype == "email",
              }}
            />
            {/* {errors.email && (
              <span style={{ color: "red" }}>{errors.email.message}</span>
            )} */}
          </Grid>
          <Grid item xs={12} sm={6}>
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
              label="Mobile"
              variant="outlined"
              fullWidth
              margin="normal"
              defaultValue={profile.mobile || ""}
              InputProps={{
                readOnly: profile.usertype === "mobile",
              }}
            />
            {/* {errors.mobile && (
              <span style={{ color: "red" }}>{errors.mobile.message}</span>
            )} */}
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                {...register("gender")}
                aria-label="gender"
                name="gender"
                defaultValue={profile.gender || ""}
              >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormLabel component="legend">Date of Birth</FormLabel>
            <TextField
              {...register("dob")}
              variant="outlined"
              name="dob"
              fullWidth
              type="date"
              placeholder="DD/MM/YYYY"
              defaultValue={profile.dob || ""}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" sx={{ marginRight: 3.5 }}>
              {loading ? "Updating..." : "Update Changes"}
            </Button>
            <Button type="reset" variant="outlined" color="secondary" onClick={reset}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
      {
            successStatus &&
            <ToastNotification
            content="Profile Updated Successfully"
            appearance="success"
            autoDismiss={false}/>
          }
    </CardContent>
  );
};

export default UserProfile;
