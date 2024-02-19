import { axiosAuth } from 'configs/axiosInstance';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'

const BASE_URL = process.env.REACT_APP_APIURL;

const AddArtistCategories = () => {
    
    const {register, handleSubmit} = useForm();
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const CategoryFormHandler = async (data) => {
        setLoading(true)
        const formData=new FormData();
       Object.keys(data).map((item) => {
          if (item == 'image' || item == 'icon') {
            formData.append(item, data[item][0]);
          } else {
            formData.append(item, data[item]);
          }
      }) 
      try {
        const response = await axiosAuth.post(`${BASE_URL}/artist-categories/artist-category-create`,formData)
        if(response.statusText=="OK")
        {
          toast.success('Artist Category Created Successfully!');
          setLoading(false)
          navigate("/management/artist-categories")
        }
      }
      catch(error)
      {
        toast.warn('Failed to create Artist Category!');
      }
      }

    return (
        <>
        <Card>
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
            <form onSubmit={handleSubmit(CategoryFormHandler)}>
              <Grid container spacing={5}>
                <Grid item xs={6}>
                  <TextField fullWidth label='Title'
                  {...register('title',{required:true})}
                    placeholder='Title'
                     />
                </Grid>
                <Grid item xs={6}>
                <label className='ms-1'>Icon</label>
                  <TextField 
                    {...register('icon')}
                    fullWidth
                    type='file'
                    label="image"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                     />
                </Grid>
                <Grid item xs={6}>
                <label className='ms-1'>Featured Image</label>
                  <TextField
                    {...register('image')}
                    fullWidth
                    type="file"
                    label="FeatureImage"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
    
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
                      {loading ? "Submiting..." : "Submit"}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
        </> 
      )
}

export default AddArtistCategories