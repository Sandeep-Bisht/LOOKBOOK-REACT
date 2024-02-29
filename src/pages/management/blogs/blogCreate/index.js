import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import JoditEditor from 'jodit-react';
import { axiosAuth } from 'configs/axiosInstance'
import slugify from 'react-slugify';
import { Grid, TextField, Button, Select, MenuItem, InputLabel, Checkbox, FormControlLabel, RadioGroup, Radio } from "@mui/material";
import { useNavigate, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TagsInput } from "react-tag-input-component";
import "@css/dashboardBlog.css"
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
const BASE_URL = process.env.REACT_APP_APIURL;

const CreateBlog = () => {
  const allCategory = useLoaderData()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [contentError, setContentError] = useState(false);

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setLoading(true);
    if(!content){
      setContentError(true)
      setLoading(false);
      return;
    }
    else{
      data['content'] = JSON.stringify(content);
      setContentError(false);
    }  
    // Ensure 'tags' exist and is an array before proceeding
    if (tags && Array.isArray(tags) && tags.length > 0) {
      data.tags = tags; // Add tags to 'data' if it exists
    }
    const formData = new FormData();
    const generatedSlug = slugify(data.title);
    formData.append("slug", generatedSlug);
  
    // Appending fields to FormData
    Object.keys(data).forEach((item) => {
      if (item === 'featuredImage') {
        formData.append(item, data.featuredImage[0]);
      }
      if(item == 'tags' && data.tags && Array.isArray(data.tags) && data.tags.length>0)
      {
        for (let item of data.tags) {
           formData.append("tags", item);
        }
      }
       else {
        formData.append(item, data[item]);
      }
    });
  
    try {
      const response = await axiosAuth.post(`${BASE_URL}/blog/blog-create`, formData);  
      if (response.statusText === "OK") {
        toast.success('Blog Created Successfully!');
        setLoading(false);
        navigate("/management/blogs");
      }
    } catch (error) {
      setLoading(false);
      toast.warn('Failed to create Blog!');
    }
  };
  return (
    <>
      {/* <section>
      
    </section> */}
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
            marginTop: "12px"
          }}
        >
        </Box>
      </Grid>
      <CardContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <TextField
              {...register('title' , { required: true })}
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
            />
              {
                errors && errors.title && <span className='common-form-error-msg'>This field is required</span>
              }
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register("featuredImage", {required:true})}
              type="file"
              label="Image"
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            {
                errors && errors.featuredImage && <span className='common-form-error-msg'>This field is required</span>
              }
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              {...register("category", {required:true})}
              label="Category"
              className='w-100'
            >
              {
                allCategory && Array.isArray(allCategory) && allCategory.length > 0 && allCategory.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item._id}>{item.title}</MenuItem>
                  )
                })
              }
            </Select>
            {
              errors && errors.category && <span className='common-form-error-msg'>This field is required</span>
            }
          </Grid>
          <Grid item xs={12} md={6} className="tags-input">
            <InputLabel id="demo-simple-select-label" className='bg-white'>Tags</InputLabel>
            <TagsInput
              {...register("tags")}
              value={tags}
              onChange={setTags}
            />
          </Grid>
          <Grid item xs={12} md={6}>
          <Grid container spacing={5}>
          <Grid item xs={12} md={12}>
          
          <InputLabel id="demo-simple-select-label">Visibility</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              {...register("status")}
              defaultValue="published"
              className='w-100'
            >
              <MenuItem value={'published'}>Published</MenuItem>
              <MenuItem value={'draft'}>Draft</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} md={12}>
          <FormControlLabel
              control={
                <Checkbox
                  {...register("onlyForArtist")}
                  color="primary"
                  inputProps={{
                    "aria-label": "Only for artist",
                  }}
                />
              }
              label="Only for artist"
              labelPlacement="end" // Adjust label placement if needed
            />
          </Grid>
          </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register('description')}
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <JoditEditor
              ref={editor}
              value={content}
              tabIndex={1}
              onChange={newContent => {setContent(newContent); content ? setContentError(false) : setContentError(true) }}
            />
             {
                contentError && <span className='common-form-error-msg'>This field is required</span>
              }
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" className="mt-3">
          {loading ? "Submiting..." : "Submit"}
        </Button>
      </form>
      </CardContent>
    </Card>
    </>
  )
}

export default CreateBlog
