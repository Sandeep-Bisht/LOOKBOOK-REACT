// ** React Imports
import { useState,useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import {useForm}  from 'react-hook-form'
import axios from 'axios'
import { axiosPrivate } from 'configs/api'
import { json,useNavigate } from 'react-router-dom'
const BASE_URL = process.env.REACT_APP_APIURL;


// ** Icons Imports

const ProductForm = () => {
  // ** States
  const {register,handleSubmit}=useForm();


  const productsFormHandler = async (data) => {
    const formData=new FormData();

   Object.keys(data).map((item) => {
      if (item === 'image' || item === 'icon') {
        formData.append(item, data[item][0]);
      } else {
        formData.append(item, data[item]);
      }
  })
  try {
    const response = await axiosPrivate.post(`${BASE_URL}/product/product-create`,data)
  }
  catch(error)
  {
    console.log(error,"error")
  }
}

  return (
    <Card>
      {/* <CardHeader title='Add' titleTypographyProps={{ variant: 'h6' }} /> */}
      <CardContent>
        <form onSubmit={handleSubmit(productsFormHandler)}>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <TextField fullWidth label='Product Name'
              {...register('title')}
              placeholder='Product name' 
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth
              {...register('icon')}
              type='file'
            //   placeholder='Icon' 
              />
            </Grid>
            <Grid item xs={6}>
            <TextField
        {...register('image')}
        fullWidth
        type="file"
        multiple
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
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default ProductForm
