
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

const BASE_URL = process.env.REACT_APP_APIURL;

// ** Icons Imports

const ServicesForm = () => {
  // ** States

  const {register, handleSubmit} = useForm();

  const ServicesFormHandler = async (data) => {
    console.log(data,"check the data inside the services")
    const formData=new FormData();

   Object.keys(data).map((item) => {
      if (item == 'image' || item == 'icon') {
        formData.append(item, data[item][0]);
      } else {
        formData.append(item, data[item]);
      }
  })
  try {
    const response = await axiosAuth.post(`${BASE_URL}/service/services-create`,formData)
  }
  catch(error)
  {
    console.log(error,"error")
  }
  }

  return (
    <Card>
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

export default ServicesForm
