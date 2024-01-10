import React, { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { Grid, TextField, Button, Select, InputLabel, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import JoditEditor from "jodit-react";
import { axiosAuth } from 'configs/axiosInstance'
import slugify from 'react-slugify';
import { toast } from "react-toastify";
import { TagsInput } from "react-tag-input-component";


const BASE_URL = process.env.REACT_APP_APIURL;

const UpdateBlog = () => {
  const getBlogByIdAndCategory = useLoaderData();
  const [blogs, setBlogs] = useState(getBlogByIdAndCategory?.allBlogs)
  const [allCategory, setallCategory] = useState(getBlogByIdAndCategory?.allCategories)
  const { register, handleSubmit } = useForm();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [selectFileImage, setSelectFileImage] = useState()
  const [imageUrl, setImageUrl] = useState(
    blogs?.featuredImage?.thumbnailUrl
  );
  console.log(blogs,'blogs is this')
  const [tags, setTags] = useState(Array.isArray(blogs.tags) ? blogs.tags : null);

  const handleImageChange = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onload = function (event) {
      const imageUrl = event.target.result;
      setImageUrl(imageUrl);
    };

    if (file) {
      reader.readAsDataURL(file);
      setSelectFileImage(file);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
      if (Array.isArray(tags) && tags.length > 0) {
      data.tags = tags;
    } else{
      data.tags=[];
    }

    const formData = new FormData();
    formData.append("_id", blogs._id);
      if (selectFileImage) {
      formData.append("updatedFeaturedImage", selectFileImage);
    }
    if (content) {
      formData.append("content", content);
    }
    if (data.title) {
      const generatedSlug = slugify(data.title);
      formData.append("slug", generatedSlug);
    }
      Object.keys(data).forEach((key) => {
        
      if (key === 'tags' && Array.isArray(data.tags)) {
        
        if(data.tags.length === 0){
          return formData.append("tags", data.tags);
        }

        data.tags.forEach((tag) => {
          formData.append("tags", tag);
        });

      } else {
        formData.append(key, data[key]);
      }
    });
  
    try {
      const response = await axiosAuth.put(`${BASE_URL}/blog/blog_update`, formData);
  
      if (response.statusText === "OK") {
        toast.success('Blog updated Successfully!');
        setLoading(false);
        navigate("/management/blogs");
      }
    } catch (error) {
      toast.warn('Failed to update Blog!');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} >
          <Grid item xs={12} md={6} style={{ paddingLeft: "0px" }}>
            <TextField
              {...register("title")}
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              defaultValue={blogs.title ? blogs.title : ""}
            />
          </Grid>
          <Grid item xs={12} md={6} container alignItems="center" className='d-flex justify-content-center'>
            <div className='updateImg-wrapper'>
              <h6>Featured Image</h6>
              <img
                src={imageUrl}
                alt='image'
                style={{ height: '200px', width: '200px' }}
              />
              <div className='showbutton-image'
              >
                {/* Upload button triggers file input */}

                <Button
                  component="label"
                  variant="contained"
                  className="mt-2"
                  htmlFor="image"
                >
                  Upload
                  <input
                    hidden
                    type="file"
                    id="image"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </Button>

                <Button variant="contained" className="ms-2 mt-2" color="secondary" onClick={() => setImageUrl(blogs?.featuredImage.thumbnailUrl)}>
                  Reset
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              className="w-100"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              {...register("category")}
              label="Category"
              defaultValue={blogs?.category?._id}
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
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
            <TextField
              {...register("description")}
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              defaultValue={
                blogs.description ? blogs.description : ""
              }
              multiline
              rows={4}
            />
          </Grid>
          <JoditEditor
            ref={editor}
            value={blogs?.content}
            // config={config}
            tabIndex={1} // tabIndex of textarea
            onChange={(newContent) => setContent(newContent)}
          />
        </Grid>


        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mt-3"
        >
          {loading ? "updating..." : "update"}
        </Button>

      </form>
    </div>
  );
};

export default UpdateBlog;
