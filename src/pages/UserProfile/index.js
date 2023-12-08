import React from "react";
import { useForm } from "react-hook-form";
import { Grid, TextField, Button } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { axiosAuth } from "configs/axiosInstance";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import Close from "mdi-material-ui/Close";

const UserProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userProfile = useLoaderData();
  const [profile, setProfile] = useState(userProfile);
  const [imgSrc, setImgSrc] = useState("/images/avatars/1.png");
  const [openAlert, setOpenAlert] = useState(true);

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
    console.log(payload.image[0],'profile data to update')
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
      console.log(response.data);
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
              <ImgStyled src={imgSrc} alt="Profile Pic" />
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
                  onClick={() => setImgSrc("/images/avatars/1.png")}
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
              label="Full Name"
              variant="outlined"
              fullWidth
              margin="normal"
              defaultValue={profile.fullName ? profile.fullName : ""}
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
              fullWidth
              margin="normal"
              defaultValue={profile.email ? profile.email : ""}
              disabled={profile.usertype == "google" ? "disabled" : ""}
            />
            {errors.email && (
              <span style={{ color: "red" }}>{errors.email.message}</span>
            )}
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
              type="number"
              label="Mobile"
              variant="outlined"
              fullWidth
              margin="normal"
              defaultValue={profile.mobile ? profile.mobile : ""}
              InputProps={{
                readOnly: profile.usertype == "mobile" ? true : false,
              }}
              
            />
            {errors.mobile && (
              <span style={{ color: "red" }}>{errors.mobile.message}</span>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...register("address")}
              label="Address"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              defaultValue={profile.address ? profile.address : " "}
            />
          </Grid>

          {openAlert ? (
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Alert
                severity="warning"
                sx={{ "& a": { fontWeight: 400 } }}
                action={
                  <IconButton
                    size="small"
                    color="inherit"
                    aria-label="close"
                    onClick={() => setOpenAlert(false)}
                  >
                    <Close fontSize="inherit" />
                  </IconButton>
                }
              >
                <AlertTitle>
                  Your email is not confirmed. Please check your inbox.
                </AlertTitle>
                <Link href="/" onClick={(e) => e.preventDefault()}>
                  Resend Confirmation
                </Link>
              </Alert>
            </Grid>
          ) : null}

          {/* <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button> */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button type="reset" variant="outlined" color="secondary">
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  );
};

export default UserProfile;
