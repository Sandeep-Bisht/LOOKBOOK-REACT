
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {Checkbox} from '@mui/material';
import {useForm} from 'react-hook-form'
import { axiosAuth } from 'configs/axiosInstance'
import { useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const BASE_URL = process.env.REACT_APP_APIURL;

// ** Icons Imports

const ServicesForm = () => {
  // ** States
  const allArtistCategories = useLoaderData();

  const {register, handleSubmit} = useForm();
  const [selectedCategories,setSelectedCategories] = useState()
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

  const ServicesFormHandler = async (data) => {
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
    const response = await axiosAuth.post(`${BASE_URL}/service/services-create`,formData)
    if(response.statusText=="OK")
    {
      toast.success('Service Created Successfully!');
      setLoading(false)
      navigate("/management/services")
    }
  }
  catch(error)
  {
    toast.warn('Failed to create service!');
  }
  }

  
  const handleCategoryChange = (event) => {
    const selectedCategoriesCopy = event.target.value;
    setSelectedCategories(selectedCategoriesCopy);
  };

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
        <form onSubmit={handleSubmit(ServicesFormHandler)}>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <TextField fullWidth label='Service Name'
              {...register('title',{required:true})}
                placeholder='Service'
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
                  defaultValue={[]}
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
            <Grid item xs={6}>
            <label className='ms-1'>Service Icon</label>
              <TextField 
                fullWidth
                {...register('icon')}
                type='file'
                label="image"
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                //   placeholder='Icon' 
                 />
            </Grid>
            <Grid item xs={6}>
            <label className='ms-1'>Service Image</label>
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

export default ServicesForm
