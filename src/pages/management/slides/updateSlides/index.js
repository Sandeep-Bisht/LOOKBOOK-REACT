import React, { useEffect, useState, useRef } from 'react'
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
import { InputLabel, Select, MenuItem } from '@mui/material'


const BASE_URL = process.env.REACT_APP_APIURL;

function UpdateSlider() {
  const getSlidesDataById = useLoaderData()
  const { register, handleSubmit } = useForm();
  const [selectFileImage, setSelectFileImage] = useState()
  const [imageUrl, setImageUrl] = useState(getSlidesDataById?.image.thumbnailUrl)
  const [loading, setLoading] = useState(false);



  const navigate = useNavigate()


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
  const SlidesFormHandler = async (data) => {
    setLoading(true)
    const formData = new FormData();
    formData.append("_id", getSlidesDataById?._id);
    if (selectFileImage) {
      formData.append("updatedImage", selectFileImage);
    }
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    })
    try {
      const response = await axiosAuth.put(`${BASE_URL}/slides/slides_update`, formData);
      if (response.statusText == "OK") {
        toast.success('Slides updated Successfully!');
        setLoading(false)
        navigate("/management/slides")
      }
    } catch (error) {
      toast.warn('Failed to update Slides!');
      return error.message || "An error occured while trying to update Slides."
    }
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
        <form onSubmit={handleSubmit(SlidesFormHandler)}>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <TextField fullWidth label='Slides Name'
                {...register('title')}
                placeholder='Slides title'
                defaultValue={getSlidesDataById?.title ? getSlidesDataById.title : ""}
              />
              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-label" className='ps-3 mt-2'>Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  {...register("status")}
                  defaultValue={getSlidesDataById?.status}
                  className='w-100'
                >
                  <MenuItem value={'active'}>Active</MenuItem>
                  <MenuItem value={'deactive'}>DeActivate</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Grid item xs={6} container alignItems="center" className='d-flex justify-content-center'>
              <div className='d-block'>
                <div className='text-center'>
                  <label className='ms-1'>Slider Image</label>
                </div>
                <div className='updateImg-wrapper'>
                  <img
                    src={imageUrl}
                    alt='image'
                    style={{ height: '200px', width: '200px' }}
                    className='img-fluid'
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
                    <Button className="ms-2 mt-2" variant="contained" color="secondary" onClick={() => {
                      setImageUrl(getSlidesDataById?.image.thumbnailUrl)
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

export default UpdateSlider