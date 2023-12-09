import React, { useEffect } from 'react'
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
import { useLocation } from 'react-router-dom'

const BASE_URL = process.env.REACT_APP_APIURL;

function UpdateService() {
  const {register, handleSubmit} = useForm();

  const location = useLocation()
  
  useEffect(()=>{
    getServiceById()
  },[])


  const getServiceById = async () => {
    
  try {
    const response = await axiosAuth.post(`${BASE_URL}/service/get_service_by_id`,{_id:location?.state})
    console.log(response,"inside the response")
  }
  catch(error)
  {
    console.log(error,"error")
  }
  }

  const ServicesFormHandler=()=>{
    
  }


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
          <Grid item xs={6}>
            <TextField fullWidth label='Service Name'
            {...register('title')}
              placeholder='Service'
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