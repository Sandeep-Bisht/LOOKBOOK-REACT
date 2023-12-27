import React from "react";
import { useLoaderData,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { Grid, TextField, Button } from "@mui/material";
import JoditEditor from "jodit-react";
import {axiosAuth} from 'configs/axiosInstance'
import slugify from 'react-slugify';
import { toast } from "react-toastify";

const BASE_URL = process.env.REACT_APP_APIURL;

const UpdateBlog = () => {
  const getBlogById = useLoaderData();

  const { register, handleSubmit } = useForm();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const navigate=useNavigate()
  const [loading,setLoading] = useState(false);
  const [selectFileImage,setSelectFileImage]=useState()
  const [imageUrl, setImageUrl] = useState(
    getBlogById?.featuredImage.thumbnailUrl
  );

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

  const onSubmit = async(data) => {
    setLoading(true)
    const formData = new FormData();
    formData.append("_id",getBlogById._id)
    if(selectFileImage){
       formData.append("updatedFeaturedImage",selectFileImage)
    }
    if(content){
      formData.append("content",content)
   }
   if(data.title)
   {
    const generatedSlug = slugify(data.title);
    formData.append("slug", generatedSlug);
   }
   Object.keys(data).map((key)=>{
    if(key)
    {
      formData.append(key,data[key]);
    }
   })
   try{
     const response = await axiosAuth.put(`${BASE_URL}/blog/blog_update`,formData)
     {
      if(response.statusText=="OK")
      {
        
        toast.success('Blog updated Successfully!');
        setLoading(false)
        navigate("/management/blogs");
      }
     }
   }catch(error){
    toast.warn('Failed to update Blog!');
   }

  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} >
          <Grid item xs={12} md={6} style={{paddingLeft:"0px"}}>
            <TextField
              {...register("title")}
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              defaultValue={getBlogById.title ? getBlogById.title : ""}
            />
            <TextField
              {...register("description")}
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              defaultValue={
                getBlogById.description ? getBlogById.description : ""
              }
              multiline
              rows={4}
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

                  <Button variant="contained" className="ms-2 mt-2" color="secondary" onClick={() => setImageUrl(getBlogById?.featuredImage.thumbnailUrl)}>
                    Reset
                  </Button>
                </div>
              </div>
            </Grid>
            <JoditEditor
              ref={editor}
              value={getBlogById?.content}
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
