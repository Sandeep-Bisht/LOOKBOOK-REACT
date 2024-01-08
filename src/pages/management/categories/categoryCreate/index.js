
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
import slugify from 'react-slugify';


const BASE_URL = process.env.REACT_APP_APIURL;

// ** Icons Imports

const CategoryForm = () => {
  // ** States

  const {register, handleSubmit} = useForm();
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

  const CategoryFormHandler = async (data) => {
    setLoading(true)
    const generatedSlug = slugify(data.title);
    const categoryData = {
      title: data.title,
      slug: generatedSlug,
      description: data.description,
    };
  try {
    const response = await axiosAuth.post(`${BASE_URL}/category/category_create`,categoryData)
    if(response)
    {
      toast.success('Category Created Successfully!');
      setLoading(false)
      navigate("/management/categories")
    }
  }
  catch(error)
  {
    toast.warn('Failed to create category!');
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
            <Grid item xs={12}>
              <TextField fullWidth label='Category Name'
              {...register('title')}
                placeholder='Category Name'
                 />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('description')}
                fullWidth
                placeholder='Description'
                label='Description'
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

export default CategoryForm
