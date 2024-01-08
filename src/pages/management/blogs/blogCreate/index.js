import React,{  useState,useRef} from 'react';
import {  useForm } from 'react-hook-form';
import  JoditEditor  from 'jodit-react';
import {axiosAuth} from 'configs/axiosInstance'
import slugify from 'react-slugify';
import { Grid, TextField, Button, Select, MenuItem, InputLabel } from "@mui/material";
import { useNavigate, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';

const BASE_URL = process.env.REACT_APP_APIURL;

const CreateBlog = () => {
  const allCategory = useLoaderData()
  const { register, handleSubmit } = useForm();
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setLoading(true);
    data['content'] = JSON.stringify(content);
    let formData = new FormData();
      const generatedSlug = slugify(data.title);
    formData.append("slug", generatedSlug);
    Object.keys(data).forEach((item) => {
      if (item === 'featuredImage') {
        formData.append(item, data.featuredImage[0]);
      } else {
        formData.append(item, data[item]);
      }
    });
    try {
      const response = await axiosAuth.post(`${BASE_URL}/blog/blog-create`, formData);
      if(response.statusText=="OK")
      {
        toast.success('Blog Created Successfully!');
        setLoading(false)
        navigate("/management/blogs")
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
        <Grid item xs={12} md={6}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          {...register("category")}
          label="Category"
        >
          {
            allCategory && allCategory.data.length>0 && allCategory.data.map((item,index)=>{
              return (
                <MenuItem key={index} value={item._id}>{item.title}</MenuItem>
              )
            })
          }
        </Select>
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
