import React from "react";
import { useForm } from "react-hook-form";
import { Grid, TextField, Button } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { useState} from "react";
import { axiosAuth } from "configs/axiosInstance";

const UserProfile = () => {
  const { register, handleSubmit } = useForm();
  const userProfile = useLoaderData();
  const [profile,setProfile] = useState(userProfile);
  

  const onSubmit = (data) => {
    setProfile(data); 
    submitProfileHandler(data)
  };

  
 const submitProfileHandler = async (payload) => { 
 
    const formData = new FormData();

    Object.keys(payload).forEach((key)=>{
      if(key == 'image'){
        formData.append(key,payload.image[0]);
      }
      else{
        formData.append(key,payload[key]);
      }
    })


 try {
    const response = await axiosAuth.post('/users/setProfile', formData); 
    console.log(response.data);
 } catch (error) {
  console.log(error.message || "An error occured while submiting the  user  profile data.")
 }
}
  
  return (
    <section
      className="userProfile"
      style={{ border: "1px solid #ccc", padding: "20px" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Grid container spacing={2}>
              <Grid item xs={false} md={2} />
              <Grid item xs={12} md={8}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        {...register("fullName")}
                        label="Full Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        defaultValue={profile.fullName ? profile.fullName : ''}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        {...register("email")}
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        defaultValue={profile.email ? profile.email : ''}
                        disabled ={profile.usertype=="google" ? 'disabled' : ""}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        {...register("mobile")}
                        type="number"
                        label="mobile"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        defaultValue={profile.mobile ? profile.mobile : ''}
                        disabled ={profile.usertype=="mobile" ? 'disabled' : ""}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        {...register("image")}
                        type="file"
                        label="Image"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        {...register("address")}
                        label="Address"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        defaultValue={profile.address ? profile.address : ' '}
                      />
                    </Grid>
                  </Grid>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </form>
              </Grid>
              <Grid item xs={false} md={2} />
            </Grid>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;