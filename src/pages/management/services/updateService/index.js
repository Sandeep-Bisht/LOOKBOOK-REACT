import React, { useState } from 'react'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import { useForm } from 'react-hook-form'
import { axiosAuth } from 'configs/axiosInstance'
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import {Checkbox} from '@mui/material';


const BASE_URL = process.env.REACT_APP_APIURL;

function UpdateService() {
  const {getServiceDataById, allArtistCategories} = useLoaderData()
  const [selectedCategories,setSelectedCategories] = useState(getServiceDataById?.artist_category && Array.isArray(getServiceDataById?.artist_category) ? getServiceDataById?.artist_category : [] )

  const { register, handleSubmit } = useForm();
  const [selectFileIcon, setSelectFileIcon] = useState()
  const [selectFileImage, setSelectFileImage] = useState()
  const [iconUrl, setIconUrl] = useState(getServiceDataById?.icon.thumbnailUrl)
  const [imageUrl, setImageUrl] = useState(getServiceDataById?.image.thumbnailUrl)
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate()

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
    setLoading(true)
    const formData = new FormData();
    formData.append("_id", getServiceDataById?._id);
    formData.append("title", data?.title);
    formData.append("artist_category", data?.artist_category);

    if (selectFileIcon) {
      formData.append("updatedIcon", selectFileIcon);
    }

    if (selectFileImage) {
      formData.append("updatedImage", selectFileImage);
    } 

    try {
      const response = await axiosAuth.put(`${BASE_URL}/service/services_update`, formData);
      if (response.statusText == "OK") {
        toast.success('Service updated Successfully!');
        setLoading(false)
        navigate("/management/services")
      }
    } catch (error) {
      toast.warn('Failed to update service!');
      return error.message || "An error occured while trying to update services."
    }
  };
  
  const handleCategoryChange = (event) => {
    const selectedCategoriesCopy = event.target.value;
    setSelectedCategories(selectedCategoriesCopy);
  };

  return (
    <div><Card>
      <Grid item xs={12}>
        <Box
          sx={{
            gap: 5,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'end',
            marginRight: "20px",
            marginTop: "12px"
          }}
        >
        </Box>
      </Grid>
      <CardContent>
        <form onSubmit={handleSubmit(ServicesFormHandler)}>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <TextField fullWidth label='Service Name'
                {...register('title')}
                placeholder='Service'
                defaultValue={getServiceDataById?.title ? getServiceDataById.title : ""}
              />
            </Grid>

            <Grid item xs={6}>
            <div>
              <FormControl fullWidth sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Artist Categories
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  name="artist_category"
                  label="Artist categories"
                  className="multi-language-select"
                  defaultValue={getServiceDataById?.artist_category && Array.isArray(getServiceDataById?.artist_category) ? getServiceDataById?.artist_category : [] }
                  {...register("artist_category",{required:true})}
                  multiple
                  onChange={handleCategoryChange}
                >
                  {allArtistCategories && Array.isArray(allArtistCategories) && allArtistCategories.length > 0 && allArtistCategories.map((item,ind)=>{
                    return (<MenuItem value={item._id}>
                    <Checkbox
                      checked={selectedCategories && Array.isArray(selectedCategories) && selectedCategories.includes(item._id) ? true : false}
                    />
                    {item.title}
                  </MenuItem>)
                  })}
                </Select>
              </FormControl>
            </div>

            </Grid>

            <Grid item xs={6} container alignItems="center" className='d-flex justify-content-center'>
              <div className='d-block'>
              <div className='text-center'>
              <label className='ms-1'>Service Icon</label>
              </div>
              <div className='updateImg-wrapper'>
                <img
                  src={iconUrl}
                  alt='icon'
                  style={{ height: '200px', width: '200px' }}
                />
                <div className='showbutton-image'
                >
                  {/* Upload button triggers file input */}

                  <Button
                    component="label"
                    variant="contained"
                    className="mt-2"
                    htmlFor="icon-image"
                  >
                    Upload
                    <input
                      hidden
                      type="file"
                      id="icon-image"
                      onChange={handleFileChangeIcon}
                      accept="image/*"
                    />
                  </Button>

                  <Button variant="contained" className="ms-2 mt-2" color="secondary" onClick={() =>
                     { 
                      setIconUrl(getServiceDataById?.icon.thumbnailUrl)
                      setSelectFileIcon("")}}
                      >
                    Reset
                  </Button>
                </div>
              </div>
              </div>
            </Grid>
            <Grid item xs={6} container alignItems="center" className='d-flex justify-content-center'>
            <div className='d-block'>
              <div className='text-center'>
              <label className='ms-1'>Service Image</label>
              </div>
              <div className='updateImg-wrapper'>
                <img
                  src={imageUrl}
                  alt='image'
                  style={{ height: '200px', width: '200px' }}
                />
                <div className='showbutton-image'
                >
                  {/* Upload button triggers file input */}
                  <Button
                    component="label"
                    className="mt-2"
                    variant="contained"
                    htmlFor="featured-image"
                  >
                    Upload
                    <input
                      hidden
                      type="file"
                      id="featured-image"
                      onChange={handleFileChangeImage}
                      accept="image/*"
                    />
                  </Button>
                  <Button className="ms-2 mt-2" variant="contained" color="secondary" onClick={() =>
                    {
                      setImageUrl(getServiceDataById?.image.thumbnailUrl)
                      setSelectFileImage("")
                    }}
                    >
                    Reset
                  </Button>
                </div>
              </div>
              </div>
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
                  {loading ? "updating..." : "update"}
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