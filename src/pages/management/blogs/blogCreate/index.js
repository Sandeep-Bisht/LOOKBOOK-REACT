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
const BASE_URL = process.env.REACT_APP_APIURL;

const CreateBlog = () => {
  const allCategory = useLoaderData()
  const { register, handleSubmit } = useForm();
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setLoading(true);
    data['content'] = JSON.stringify(content);
  
    // Ensure 'tags' exist and is an array before proceeding
    if (Array.isArray(tags) && tags.length > 0) {
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
      if(item == 'tags')
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
      toast.warn('Failed to create Blog!');
    }
  };
  
  return (
    <>
      {/* <section>
      
    </section> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <TextField
              {...register('title')}
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
            />

          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register("featuredImage")}
              type="file"
              label="Image"
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              {...register("category")}
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
          </Grid>
          <Grid item xs={12} md={6} className="tags-input">
            <InputLabel id="demo-simple-select-label">Tags</InputLabel>
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
              onChange={newContent => setContent(newContent)}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" className="mt-3">
          {loading ? "Submiting..." : "Submit"}
        </Button>
      </form>
    </>
  )
}

export default CreateBlog
