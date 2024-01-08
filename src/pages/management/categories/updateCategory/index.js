
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
import slugify from 'react-slugify';



const BASE_URL = process.env.REACT_APP_APIURL;

function UpdateCategory() {
  const getCategoryDataById = useLoaderData()
  const { register, handleSubmit } = useForm();
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate()

  const CategoryFormHandler = async (data) => {
    setLoading(true)
    const generatedSlug = slugify(data.title);
    const updateData = {
        _id:getCategoryDataById?.data._id,
        title:data.title,
        slug:generatedSlug,
        description:data.description
    }

    try {
      const response = await axiosAuth.put(`${BASE_URL}/category/update_category`, updateData);
      if (response) {
        
        toast.success('Category updated Successfully!');
        setLoading(false)
        navigate("/management/categories")
      }
    } catch (error) {
      toast.warn('Failed to update Category');
      return error.message || "An error occured while trying to update Category."
      
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
            marginTop: "10px"
          }}
        >
        </Box>
      </Grid>
      <CardContent>
        <form onSubmit={handleSubmit(CategoryFormHandler)}>
          <Grid container spacing={12}>
            <Grid item xs={12}>
              <TextField fullWidth label='Product Name'
                {...register('title')}
                placeholder='Product'
                defaultValue={getCategoryDataById?.data.title ? getCategoryDataById.data.title : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label='Description'
                {...register('description')}
                placeholder='Description'
                defaultValue={getCategoryDataById?.data.description ? getCategoryDataById.data.description : ""}
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
                  {loading ? "updating..." : "update" }
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card></div>
  )
}

export default UpdateCategory