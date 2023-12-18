import {  useState,useRef} from 'react';
import {  useForm } from 'react-hook-form';
import  JoditEditor  from 'jodit-react';
import {axiosAuth} from 'configs/axiosInstance'
import slugify from 'react-slugify';
import { Grid, TextField, Button } from "@mui/material";
import ToastNotification from 'toastNotification/toastNatification';
import { useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_APIURL;

const CreateBlog = () => {

  const { register, handleSubmit } = useForm();
  const [successStatus,setSuccessStatus] = useState(false);
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
        setSuccessStatus(true);
        setLoading(false)
        navigate("/management/blogs")
      }
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
    {
      successStatus && 
      <ToastNotification
      content="Blog Created Successfully"
      appearance="success"
      autoDismiss={false}
      />
    }
    </>
  )
}

export default CreateBlog
