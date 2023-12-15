import React from "react";
import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { Grid, TextField, Button } from "@mui/material";
import JoditEditor from "jodit-react";
import { useNavigate } from 'react-router-dom'
import { FaTrash } from "react-icons/fa6";


const UpdateBlog = () => {
  const getBlogById = useLoaderData();

  const { register, handleSubmit } = useForm();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const navigate=useNavigate()
  const [Image, setImage] = useState(false);
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
      setImage(true);
    };

    if (file) {
      reader.readAsDataURL(file);
      setSelectFileImage(file);
    }
  };

  console.log(getBlogById, "inside the blog ");
  const onSubmit = (data) => {
    // Handle form submission with updated data
    console.log(data);
    // Add logic to update the blog with the submitted data
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
            <div>
              <img
                src={imageUrl}
                alt="featuredImage"
                style={{ height: "150px", width: "150px" , border:"1px dotted #000"}}
              />
              
               <label htmlFor="featuredImage" fullWidth style={{ marginLeft:"10px"}}>
              <input
                type="file"
                name="featuredImage"
                id="featuredImage"
                accept="image/*"
                hidden
                onChange={handleImageChange}
                
              />


              <div className="multipale-image-display">
                <div className="dynamic-img-wrapper">
                  <h1>+</h1>
                </div>
              </div>
            </label>
            <div>
              {Image && 
                            <div className="showbutton-image">
                            <div className="">
                            <button type="button" className="btn dropshadow-gallery" onClick={()=>setImageUrl(getBlogById?.featuredImage.thumbnailUrl)}>  <FaTrash /></button>
                            </div>
                          </div>
                          }

          
            
            </div>
            </div>
            {/* <label htmlFor="featuredImage" fullWidth>
              <input
                type="file"
                name="featuredImage"
                id="featuredImage"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />

              <div className="multipale-image-display">
                <div className="dynamic-img-wrapper">
                  <h1>+</h1>
                </div>
              </div>
            </label> */}

            {/* <TextField
        
                   {...register("featuredImage")}
                      
               
                        margin="normal"
                        
                        accept="imageUrl/*"
                        style={{ height: '200px', width: '200px' }}
                        InputLabelProps={{
                          shrink: true,
                         
                        }}
                       
                      />
                      <input
                    hidden
                    type="file"
                    accept="featuredImage/*"
                    
                // id="adhar-front-image"
                
                // accept="image/*"
              /> */}
          </Grid>

          {/* <Grid item xs={12} md={6}>
          <TextField
            {...register('description')}
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            defaultValue={getBlogById.description?getBlogById.description:""}
            multiline
            rows={4}
          />
          
        </Grid> */}
          <Grid item xs={12}>
            {/* <Jodit
                        {...register('description')} // Register Jodit editor with React Hook Form
                        onChange={(content) => console.log(content)} // Handle editor content change
                      /> */}
            <JoditEditor
              ref={editor}
              value={content}
              // config={config}
              tabIndex={1} // tabIndex of textarea
              onChange={(newContent) => setContent(newContent)}
            />
          </Grid>
          {/* <Grid item xs={false} md={2} /> */}
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mt-3"
          onClick={()=>navigate("/management/create-blog")} >
          update
        </Button>
      </form>
    </div>
  );
};

export default UpdateBlog;
