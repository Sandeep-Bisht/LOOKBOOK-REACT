import React, { useEffect } from 'react'
import { useState ,useRef} from 'react';
import { useForm } from 'react-hook-form';
import  JoditEditor  from 'jodit-react';
import axios from "axios";

import { Grid, TextField, Button } from "@mui/material";

const BASE_URL = process.env.REACT_APP_APIURL;

const Blog = () => {

  const { register, handleSubmit } = useForm();
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [blogdata, setBlogData] =useState('');

  useEffect (()=>{
    getblog();
  },[])

  const onSubmit = (data) => {
    console.log(data);
  };

  const getblog = async() =>{
    const response = await axios.post(`${process.env.REACT_APP_APIURL}/blog-create`)
  
  if(response)
  {
    setBlogData(response.data.getblog)
  }
}
console.log(blogdata,"check the inside",BASE_URL)


  return (
    <>
      {/* <section>
      <form onSubmit={handleSubmit((data) => console.log(data))} className='blog-form'>
        <div className='container'>
          <div className='row blog-form1'>
            <div className='col-md-6  mx-auto form-wrapper'>
              <label>first name</label>
      <input className='inputFeild'{...register('firstName')} />
      <input {...register('lastName', { required: true })} />
      {errors.lastName && <p>Last name is required.</p>}
      <input {...register('age', { pattern: /\d+/ })} />
      {errors.age && <p>Please enter number for age.</p>}
      <input type="submit" />
      </div>
      </div>
      </div>
    </form>
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
                   {...register("image")}
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
                      {/* <Jodit
                        {...register('description')} // Register Jodit editor with React Hook Form
                        onChange={(content) => console.log(content)} // Handle editor content change
                      /> */}
                      <JoditEditor
			ref={editor}
			value={content}
			// config={config}
			tabIndex={1} // tabIndex of textarea
			onChange={newContent => setContent(newContent)}
		/>
                    </Grid>
                    {/* <Grid item xs={false} md={2} /> */}
      </Grid>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
    </>
  )
}

export default Blog
