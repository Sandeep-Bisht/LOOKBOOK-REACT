
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import {useForm}  from 'react-hook-form'
import { axiosAuth } from 'configs/axiosInstance'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const BASE_URL = process.env.REACT_APP_APIURL;


// ** Icons Imports

const ProductForm = () => {
  // ** States
  const {register,handleSubmit}=useForm();
  const [loading,setLoading] = useState(false)

  const navigate =useNavigate()


  const productsFormHandler = async (data) => {
    setLoading(true)
    const formData=new FormData();
   Object.keys(data).map((item) => {
      if (item === 'image' || item === 'icon') {
        formData.append(item, data[item][0]);
      } else {
        formData.append(item, data[item]);
      }
  })
  try {
    const response = await axiosAuth.post(`${BASE_URL}/product/product-create`,formData)
    if(response.statusText=="OK")
    {
      toast.success('Product Created Successfully!');
      setLoading(false)
      navigate("/management/products")
    }
  }
  catch(error)
  {
    toast.warn('Failed to create product!');
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
            <label className='ms-1'>Brand Icon</label>
              <TextField fullWidth
              {...register('icon')}
              type='file'
            //   placeholder='Icon' 
              />
            </Grid>
            <Grid item xs={6}>
            <label className='ms-1'>Brand Image</label>
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
                 {loading ? "Submiting..." : "Submit"}
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
