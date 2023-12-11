import {  useState,useRef} from 'react';
import {  useForm } from 'react-hook-form';
import  JoditEditor  from 'jodit-react';
import {axiosAuth} from 'configs/axiosInstance'
import slugify from 'react-slugify';

import { Grid, TextField, Button } from "@mui/material";

const BASE_URL = process.env.REACT_APP_APIURL;

const CreateBlog = () => {

  const { register, handleSubmit } = useForm();
  const editor = useRef(null);
  const [content, setContent] = useState('');
  // const [projectList, setProjectList] = useState([])

  const onSubmit = async (data) => {
    data['content'] = JSON.stringify(content);
  
    let formData = new FormData();
  
    // Generate slug and add it to the form data
    const generatedSlug = slugify(data.title);
    formData.append("slug", generatedSlug);
  
    // Append other form data items
    console.log(data,"check inside")
    Object.keys(data).forEach((item) => {
      if (item === 'featuredImage') {
        formData.append(item, data.featuredImage[0]);
      } else {
        formData.append(item, data[item]);
      }
    });
    
  
    try {
      const response = await axiosAuth.post(`${BASE_URL}/blog/blog-create`, formData);
      console.log(response.data, 'success');
    } catch (error) {
      console.log(error.message || 'error found', 'error');
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
        submit
      </Button>
    </form>
    </>
  )
}

export default CreateBlog
