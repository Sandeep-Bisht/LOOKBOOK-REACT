import React, { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useState, useRef } from "react";
import { Grid, TextField, Button, Select, InputLabel, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import JoditEditor from "jodit-react";
import { axiosAuth } from 'configs/axiosInstance'
import slugify from 'react-slugify';
import { toast } from "react-toastify";
import { TagsInput } from "react-tag-input-component";
import CardContent from '@mui/material/CardContent'



const BASE_URL = process.env.REACT_APP_APIURL;

const UpdateBlog = () => {
  const getBlogByIdAndCategory = useLoaderData();
  const [blogs, setBlogs] = useState(getBlogByIdAndCategory?.allBlogs)
  const [allCategory, setallCategory] = useState(getBlogByIdAndCategory?.allCategories)
  const { register, handleSubmit, formState:{errors}  } = useForm();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [selectFileImage, setSelectFileImage] = useState()
  const [imageUrl, setImageUrl] = useState(
    blogs?.featuredImage?.thumbnailUrl
  );
  const [tags, setTags] = useState(blogs?.tags && Array.isArray(blogs.tags) && blogs.tags.length > 0 ? blogs.tags[0]!="undefined" && blogs.tags[0]!="" && blogs.tags : null);
  const [contentError, setContentError] = useState(false);

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
    if(!content){
      setLoading(false);
      setContentError(true)
      return
    }
    else{
      formData.append("content", content);
      setContentError(false);
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
  const stripHtmlTags = (html)=> {
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
}

  return (
    <div><Card>
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
        <Grid container spacing={2} >
          <Grid item xs={12} md={6} style={{ paddingLeft: "0px" }}>
            <TextField
              {...register("title" ,{required:true})}
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              defaultValue={blogs.title ? blogs.title : ""}
            />
            {
           errors && errors.title && <span className="common-form-error-msg">This field is required</span>
            }
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

                <Button variant="contained" className="ms-2 mt-2" color="secondary" onClick={() =>
                  {
                    setImageUrl(blogs?.featuredImage.thumbnailUrl)
                    setSelectFileImage("")
                  }}>
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
              {...register("category", {required:true})}
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
            {
              errors && errors.category && <span className='common-form-error-msg'>This field is required</span>
            }
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
              defaultValue={blogs?.status ? blogs.status : "published"}
              className='w-100'
            >
              <MenuItem value={'published'}>Published</MenuItem>
              <MenuItem value={'draft'}>Draft</MenuItem>
            </Select>
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
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  {...register("forArtist")}
                  color="primary"
                  inputProps={{
                    "aria-label": "Only for artist",
                  }}
                  defaultChecked={blogs?.forArtist ? blogs?.forArtist : null}
                />
              }
              label="Only for artist"
              labelPlacement="end" // Adjust label placement if needed
            />
          </Grid>
          <Grid item xs={12}>
          <JoditEditor
            ref={editor}
            value={stripHtmlTags(blogs?.content)}
            // config={config}
            tabIndex={1} // tabIndex of textarea
            onChange={(newContent) => {setContent(newContent); content || blogs?.content ? setContentError(false) : setContentError(true)}}
          />
          {
              contentError && <span className='common-form-error-msg'>This field is required</span>
              }
              </Grid>
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
      </CardContent>
    </Card>
    </div>
  );
};

export default UpdateBlog;
