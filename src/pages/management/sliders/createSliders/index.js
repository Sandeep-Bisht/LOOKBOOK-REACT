
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import {useForm} from 'react-hook-form'
import { axiosAuth } from 'configs/axiosInstance'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const BASE_URL = process.env.REACT_APP_APIURL;

// ** Icons Imports

const SlidersForm = () => {
  // ** States

  const {register, handleSubmit} = useForm();
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

  const SlidersFormHandler = async (data) => {
    setLoading(true)
    const formData=new FormData();
   Object.keys(data).map((item) => {
      if (item == 'image') {
        formData.append(item, data[item][0]);
      } else {
        formData.append(item, data[item]);
      }
  }) 
  try {
    const response = await axiosAuth.post(`${BASE_URL}/slider/sliders-create`,formData)
    if(response.statusText=="OK")
    {
      toast.success('Slider Created Successfully!');
      setLoading(false)
      navigate("/management/sliders")
    }
  }
  catch(error)
  {
    toast.warn('Failed to create slider!');
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
        <form onSubmit={handleSubmit(SlidersFormHandler)}>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <TextField fullWidth label='Title'
              {...register('title')}
                placeholder='Title'
                 />
            </Grid>
            <Grid item xs={6}>
              <TextField
                {...register('image')}
                fullWidth
                type="file"
                multiple
                label="SliderImage"
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

export default SlidersForm
