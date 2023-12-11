import React, { useEffect, useState , useRef} from 'react'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import {useForm} from 'react-hook-form'
import { axiosAuth } from 'configs/axiosInstance'
import { useLoaderData, useNavigate } from "react-router-dom";


const BASE_URL = process.env.REACT_APP_APIURL;

function UpdateService() {
  const {register, handleSubmit} = useForm();
  const [showButtonsIcon, setShowButtonsIcon] = useState(false);
  const [showButtonsImage,setShowButtonsImage] = useState(false)
  const [selectFileIcon,setSelectFileIcon]=useState()
  const [selectFileImage,setSelectFileImage]=useState()
  const getServiceDataById=useLoaderData()
  const [iconUrl,setIconUrl] = useState(getServiceDataById?.icon.thumbnailUrl)
  const [imageUrl,setImageUrl] = useState(getServiceDataById?.image.thumbnailUrl)
  const fileInputRefIcon = useRef(null);
  const fileInputRefImage = useRef(null);

  const navigate=useNavigate()

  const handleMouseEnterIcon = () => {
    setShowButtonsIcon(true);
  };

  const handleMouseLeaveIcon = () => {
    setShowButtonsIcon(false);
  };
  const handleMouseEnterImage = () => {
    setShowButtonsImage(true);
  };

  const handleMouseLeaveImage = () => {
    setShowButtonsImage(false);
  };

  const handleUploadIcon = () => {
    fileInputRefIcon.current.click();
  };
  const handleUploadImage = () => {
    fileInputRefImage.current.click();
  };

  const handleFileChangeIcon = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
  
    reader.onload = function (event) {
      const imageUrl = event.target.result;
      setIconUrl(imageUrl);
    };
  
    if (file) {
      reader.readAsDataURL(file);
      setSelectFileIcon(file);
    }
  };
  

  const handleFileChangeImage = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
  
    reader.onload = function (event) {
      const imageUrl = event.target.result;
      setImageUrl(imageUrl);
    };
  
    if (file) {
      reader.readAsDataURL(file);
      setSelectFileImage(file);
    }
  };
  

  const ServicesFormHandler = async (data) => {
    const formData = new FormData();
    formData.append("_id", getServiceDataById?._id);
    formData.append("title", data?.title);
  
    if (selectFileIcon) {
      formData.append("updatedIcon", selectFileIcon);
    }
    
    if (selectFileImage) {
      formData.append("updatedImage", selectFileImage);
    }
  
    try {
      const response = await axiosAuth.put(`${BASE_URL}/service/services_update`, formData);
      if(response.status==200)
      {
        navigate("/management/services")
      }
    } catch (error) {
      return error.message || "An error occured while trying to update services."
    }
  };
  
  

  return (
    <div><Card>
    {/* <CardHeader title='Add' titleTypographyProps={{ variant: 'h6' }} /> */}
    <Grid item xs={12}>
      <Box
        sx={{
          gap: 5,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'end',
          marginRight: "20px",
          marginTop: "10px"
        }}
      >
      </Box>
    </Grid>
        <CardContent>
        <form onSubmit={handleSubmit(ServicesFormHandler)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField fullWidth label='Service Name'
              {...register('title')}
                placeholder='Service'
                defaultValue={getServiceDataById?.title?getServiceDataById.title:""}
                 />
            </Grid>
            <Grid item xs={6} container alignItems="center">
      <input
        type="file"
        ref={fileInputRefIcon}
        style={{ display: 'none' }}
        onChange={handleFileChangeIcon}
        accept="image/*"
      />
      <Grid
        item
        xs={12}
        onMouseEnter={handleMouseEnterIcon}
        onMouseLeave={handleMouseLeaveIcon}
        style={{ position: 'relative',textAlign:"center" }}
      >
        <img
          src={iconUrl}
          alt='icon'
          style={{ height: '200px', width: '200px' }}
        />
        {showButtonsIcon && (
          <div  className='showbutton-icon'
          >
            {/* Upload button triggers file input */}
            <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={handleUploadIcon}>
              Upload
            </Button>
            <Button variant="contained" color="secondary" onClick={()=>setIconUrl(getServiceDataById?.icon.thumbnailUrl)}>
              Reset
            </Button>
          </div>
        )}
      </Grid>
    </Grid>
    <Grid item xs={6} container alignItems="center">
      <input
        type="file"
        ref={fileInputRefImage}
        style={{ display: 'none' }}
        onChange={handleFileChangeImage}
        accept="image/*"
      />
      <Grid
        item
        xs={12}
        onMouseEnter={handleMouseEnterImage}
        onMouseLeave={handleMouseLeaveImage}
        style={{ position: 'relative', textAlign:"center" }}
      >
        <img
          src={imageUrl}
          alt='image'
          style={{ height: '200px', width: '200px' }}
        />
        {showButtonsImage && (
          <div  className='showbutton-image'
          >
            {/* Upload button triggers file input */}
            <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={handleUploadImage}>
              Upload
            </Button>
            <Button variant="contained" color="secondary" onClick={()=>setImageUrl(getServiceDataById?.image.thumbnailUrl)}>
              Reset
            </Button>
          </div>
        )}
      </Grid>
    </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Button type='submit' variant='contained' size='large'>
                  update
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>

  </Card>
</div>
  )
}

export default UpdateService