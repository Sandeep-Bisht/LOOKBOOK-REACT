import React, { useState, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import "@css/user/singleBlog.css"
import { useForm } from "react-hook-form"
import TextField from "@mui/material/TextField";
import NoDataFound from 'pages/become-a-artist/common/noDataFound'
import instagram from "@core/assets/footer/instagram.png"
import facebook from "@core/assets/footer/Facebook.png"
import twitter from "@core/assets/footer/twitter.png"
import linkedin from "@core/assets/footer/LinkedIn.png"
import youtube from "@core/assets/footer/youtube.png"
import copyurl from "@core/assets/footer/copyurl.png"
import { axiosLocal } from 'configs/axiosInstance';
import { truncateDescription } from 'configs/truncateDescription';

const SingleBlog = ()=> {

  useEffect(()=>{
    getBlogByCategoryId()
  },[])

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
    const blogData = useLoaderData()

    const [allCategory,setAllCategory] = useState();



    const getBlogByCategoryId = async()=>{
      const response = await axiosLocal.get(`blog/get_blog_by_category_id/${blogData?.category}`)
      if(response)
      {
        setAllCategory(response.data);
      }
    }

   
    const onSubmit = (data) => console.log(data)
    return (
        <>
            {blogData && blogData._id
                ?
                <section class="usr-single-blogs">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6 usr-single-blogs-image">
                                <div class="background-image">
                                    <img src={blogData?.featuredImage.url} class="img-fluid w-100" />
                                
                                
                                </div>
                                <div className="usr-single-blogs-social-icons">
                                    <div className="social-icons">
                                    <ul className="usr-icon-list px-0">
                                        <div className='social-link common-cursor-pointer'>
                                        <li><a><img src={instagram} alt='blog-social-icon' /></a></li>
                                        </div>
                                        <div className='social-link common-cursor-pointer'>
                                        <li><a><img src={facebook} alt='blog-social-icon' /></a></li>
                                        </div>
                                        <div className='social-link common-cursor-pointer'>
                                        <li><a><img src={twitter} alt='blog-social-icon' /></a></li>
                                        </div>
                                        <div className='social-link common-cursor-pointer'>
                                        <li><a><img src={linkedin} alt='blog-social-icon' /></a></li>
                                        </div>
                                        <div className='social-link common-cursor-pointer'>
                                        <li><a><img src={youtube} alt='blog-social-icon' /></a></li>
                                        </div>
                                        <div className='social-link common-cursor-pointer'>
                                        <li><a><img src={copyurl} alt='blog-social-icon' /></a></li>
                                        </div>
                                    </ul>
                                    </div>
                                    <div className="reviews">
                                        <a href="" className="views">50 Views</a>
                                        <a href="" className="comments">2 Comments</a>
                                        <a href="" className="likes">
                                            <svg xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.5"
                                                    d="M9.99984 18.2917L8.7915 17.1917C4.49984 13.3 1.6665 10.725 1.6665 7.58333C1.6665 5.00833 3.68317 3 6.24984 3C7.69984 3 9.0915 3.675 9.99984 4.73333C10.9082 3.675 12.2998 3 13.7498 3C16.3165 3 18.3332 5.00833 18.3332 7.58333C18.3332 10.725 15.4998 13.3 11.2082 17.1917L9.99984 18.2917Z" />
                                                <path
                                                    d="M9.99984 18.2917L8.7915 17.1917C4.49984 13.3 1.6665 10.725 1.6665 7.58333C1.6665 5.00833 3.68317 3 6.24984 3C7.69984 3 9.0915 3.675 9.99984 4.73333C10.9082 3.675 12.2998 3 13.7498 3C16.3165 3 18.3332 5.00833 18.3332 7.58333C18.3332 10.725 15.4998 13.3 11.2082 17.1917L9.99984 18.2917Z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                               
                                <div className="usr-single-blogs-comments ">
    <h3>Comments</h3>
    <div className="comments">
      <h6 className="comment-name">John Doe</h6>
      <p className="comment">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad dolore nisi
        nobis hic optio quidem accusamus voluptate illo obcaecati commodi ipsa possimus, ea,
        officiis blanditiis alias molestias expedita distinctio explicabo?</p>
    </div>
    <div className="comments">
      <h6 className="comment-name">John Doe</h6>
      <p className="comment">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad dolore nisi
        nobis hic optio quidem accusamus voluptate illo obcaecati commodi ipsa possimus, ea,
        officiis blanditiis alias molestias expedita distinctio explicabo?</p>
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>

        <div className='row mb-3'>
            <div className='col-md-6'>
    <TextField variant="outlined" id="outlined-basic" label="firstname" {...register("firstName", { required: true })} fullWidth></TextField>
    {errors.name && (<span style={{color:"red"}}>This field is required</span>)}
    </div>
    <div className='col-md-6'><TextField variant="outlined" id="outlined-basic" label="lastname" {...register("lastName", { required: true } )} fullWidth></TextField>
    {errors.name && (<span style={{color:"red"}}>This field is required</span>)}
    </div> </div>
      <TextField rows={5} variant="outlined" fullWidth multiline label="Write a comment....." defaultValue={""} className='input-control'/>
      <button className="post-comments-button">Post</button>
    </form>
  </div>

                            </div>
                            <div className="col-md-6 usr-single-blogs-content">
                                <h3>{blogData?.title}</h3>
                                <p dangerouslySetInnerHTML={{ __html: blogData?.content }}></p>

                                <div className="usr-single-blogs-tags-recents-posts">
  {
    Array.isArray(blogData.tags) && blogData.tags.length>0 ? 
  
    <div className="tags mb-5">
      <h3>Tags</h3>
      {
       blogData.tags.map((item,index)=>{
          return(
            <a href>{item}</a>
          )
        })
      }
    </div>
    :
    null
}

    <div className="recents-posts">
      <div className="recents-posts-heading">
        <h3>Recent Posts</h3>
        <a herf>Load All</a>
      </div>
      <div className="row">
        {allCategory && Array.isArray(allCategory) && allCategory.map((item,index)=>{
          if(index>0 && index<3)
          return(
            <div className="col-md-6">
            <div className="usr-recent-post-card">
              <div className="usr-card-image">
                <img src={item.featuredImage.url} alt="image" />
              </div>
              <div className="usr-recent-post-card-body">
                <h6 className="usr-recent-post-card-title">{item?.title}</h6>
                <p className="usr-recent-post-card-para">{truncateDescription(item?.description,45)}</p>
              </div>
              <div className="usr-recent-post-card-review">
                <div className="reviews">
                  <div className="view">
                    <a href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" width={19} height={11} viewBox="0 0 19 11" fill="none">
                        <path d="M9.26798 2.26121C7.54018 2.26121 6.12652 3.67487 6.12652 5.40268C6.12652 7.13048 7.54018 8.54414 9.26798 8.54414C10.9958 8.54414 12.4094 7.13048 12.4094 5.40268C12.4094 3.67487 10.9958 2.26121 9.26798 2.26121ZM9.26798 7.75877C7.97213 7.75877 6.91189 6.69853 6.91189 5.40268C6.91189 4.10682 7.97213 3.04658 9.26798 3.04658C10.5638 3.04658 11.6241 4.10682 11.6241 5.40268C11.6241 6.69853 10.5638 7.75877 9.26798 7.75877ZM17.9855 5.1278L16.297 3.41963C14.4318 1.53475 11.9382 0.494141 9.26798 0.494141C6.59774 0.494141 4.1042 1.53475 2.23896 3.41963L0.550422 5.1278C0.393349 5.28487 0.393349 5.52048 0.550422 5.67756L2.23896 7.38573C4.1042 9.2706 6.59774 10.3112 9.26798 10.3112C11.9382 10.3112 14.4318 9.2706 16.297 7.38573L17.9855 5.67756C18.1426 5.52048 18.1426 5.28487 17.9855 5.1278ZM15.7473 6.83597C14.0194 8.56377 11.7223 9.52585 9.26798 9.52585C6.81371 9.52585 4.51652 8.56377 2.78871 6.83597L1.37506 5.40268L2.78871 3.96938C4.51652 2.24158 6.81371 1.27951 9.26798 1.27951C11.7223 1.27951 14.0194 2.24158 15.7473 3.96938L17.1609 5.40268L15.7473 6.83597Z" fill="#6D5D4C" />
                      </svg>2</a>
                  </div>
                  <div className="comment">
                    <a href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                        <path d="M15.3486 0.922852H1.21202C0.996043 0.922852 0.819336 1.09956 0.819336 1.31553V10.7399C0.819336 10.9559 0.996043 11.1326 1.21202 11.1326H4.35348V13.4887C4.35348 13.8421 4.7658 14.0188 5.02104 13.7636L7.69129 11.1326H15.3486C15.5646 11.1326 15.7413 10.9559 15.7413 10.7399V1.31553C15.7413 1.09956 15.5646 0.922852 15.3486 0.922852ZM14.9559 10.3472H7.53421C7.43604 10.3472 7.33787 10.3865 7.25934 10.465L5.13885 12.5463V10.7399C5.13885 10.5239 4.96214 10.3472 4.74617 10.3472H1.6047V1.70822H14.9559V10.3472Z" fill="#6D5D4C" />
                      </svg>0</a>
                  </div>
                  <div className="share">
                    <a href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 21 21" fill="none">
                        <path d="M11.3564 3.0918L10.702 3.42312V5.49289C8.53045 5.41517 6.40857 6.15359 4.75446 7.56266C2.45563 9.58334 1.29395 12.8761 1.29395 17.3797L2.0834 17.527C2.16521 17.3266 4.05909 12.6634 10.702 12.4794V14.9786L11.3564 15.3059L19.1283 9.53016V8.8716L11.3564 3.0918ZM11.5201 14.1646V12.0621L11.111 11.6531C6.03886 11.6531 3.37598 14.1442 2.16521 15.7967C2.40246 12.3526 3.44961 9.79604 5.28213 8.18031C6.73349 6.95706 8.57488 6.29392 10.4729 6.31098C10.8329 6.31098 11.0497 6.33552 11.0578 6.33552L11.5201 5.92648V4.23712L18.1957 9.19883L11.5201 14.1646Z" fill="#6D5D4C" />
                      </svg></a>
                  </div>
                </div>
                <div className="favorite">
                  <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} viewBox="0 0 20 21" fill="none">
                      <path opacity="0.5" d="M9.91429 18.051L8.72806 16.9711C4.5149 13.1506 1.7334 10.6228 1.7334 7.53855C1.7334 5.01066 3.71318 3.03906 6.23289 3.03906C7.65637 3.03906 9.02258 3.70171 9.91429 4.74069C10.806 3.70171 12.1722 3.03906 13.5957 3.03906C16.1154 3.03906 18.0952 5.01066 18.0952 7.53855C18.0952 10.6228 15.3137 13.1506 11.1005 16.9711L9.91429 18.051Z" fill="#FCF7F2" stroke="#6D5D4C" strokeWidth="0.981707" />
                      <path d="M9.91429 18.051L8.72806 16.9711C4.5149 13.1506 1.7334 10.6228 1.7334 7.53855C1.7334 5.01066 3.71318 3.03906 6.23289 3.03906C7.65637 3.03906 9.02258 3.70171 9.91429 4.74069C10.806 3.70171 12.1722 3.03906 13.5957 3.03906C16.1154 3.03906 18.0952 5.01066 18.0952 7.53855C18.0952 10.6228 15.3137 13.1506 11.1005 16.9711L9.91429 18.051Z" stroke="#6D5D4C" strokeWidth="0.981707" />
                    </svg></a>
                </div>
              </div>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  </div>


                            </div>
                        </div>
                        
      {/* <div className="row"> */}
  {/* <div className="col-md-6 usr-single-blogs-comments ">
    <h3>Comments</h3>
    <div className="comments">
      <h6 className="comment-name">John Doe</h6>
      <p className="comment">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad dolore nisi
        nobis hic optio quidem accusamus voluptate illo obcaecati commodi ipsa possimus, ea,
        officiis blanditiis alias molestias expedita distinctio explicabo?</p>
    </div>
    <div className="comments">
      <h6 className="comment-name">John Doe</h6>
      <p className="comment">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad dolore nisi
        nobis hic optio quidem accusamus voluptate illo obcaecati commodi ipsa possimus, ea,
        officiis blanditiis alias molestias expedita distinctio explicabo?</p>
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>

        <div className='row mb-3'>
            <div className='col-md-6'>
    <TextField variant="outlined" id="outlined-basic" label="firstname" {...register("firstName", { required: true })} fullWidth></TextField>
    {errors.name && (<span style={{color:"red"}}>This field is required</span>)}
    </div>
    <div className='col-md-6'><TextField variant="outlined" id="outlined-basic" label="lastname" {...register("lastName", { required: true } )} fullWidth></TextField>
    {errors.name && (<span style={{color:"red"}}>This field is required</span>)}
    </div> </div>
      <TextField rows={5} variant="outlined" fullWidth multiline label="Write a comment....." defaultValue={""} className='input-control'/>
      <button className="post-comments-button">Post</button>
    </form>
  </div> */}
  
  {/* <div className="col-md-6 usr-single-blogs-tags-recents-posts">
  {
    Array.isArray(blogData.tags) && blogData.tags.length>0 ? 
  
    <div className="tags">
      <h3>Tags</h3>
      {
       blogData.tags.map((item,index)=>{
          return(
            <a href>{item}</a>
          )
        })
      }
    </div>
    :
    null
}

    <div className="recents-posts">
      <div className="recents-posts-heading">
        <h3>Recent Posts</h3>
        <a herf>Load All</a>
      </div>
      <div className="row">
        {allCategory && Array.isArray(allCategory) && allCategory.map((item,index)=>{
          if(index>0 && index<3)
          return(
            <div className="col-md-6">
            <div className="usr-recent-post-card">
              <div className="usr-card-image">
                <img src={item.featuredImage.url} alt="image" />
              </div>
              <div className="usr-recent-post-card-body">
                <h6 className="usr-recent-post-card-title">{item?.title}</h6>
                <p className="usr-recent-post-card-para">{truncateDescription(item?.description,45)}</p>
              </div>
              <div className="usr-recent-post-card-review">
                <div className="reviews">
                  <div className="view">
                    <a href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" width={19} height={11} viewBox="0 0 19 11" fill="none">
                        <path d="M9.26798 2.26121C7.54018 2.26121 6.12652 3.67487 6.12652 5.40268C6.12652 7.13048 7.54018 8.54414 9.26798 8.54414C10.9958 8.54414 12.4094 7.13048 12.4094 5.40268C12.4094 3.67487 10.9958 2.26121 9.26798 2.26121ZM9.26798 7.75877C7.97213 7.75877 6.91189 6.69853 6.91189 5.40268C6.91189 4.10682 7.97213 3.04658 9.26798 3.04658C10.5638 3.04658 11.6241 4.10682 11.6241 5.40268C11.6241 6.69853 10.5638 7.75877 9.26798 7.75877ZM17.9855 5.1278L16.297 3.41963C14.4318 1.53475 11.9382 0.494141 9.26798 0.494141C6.59774 0.494141 4.1042 1.53475 2.23896 3.41963L0.550422 5.1278C0.393349 5.28487 0.393349 5.52048 0.550422 5.67756L2.23896 7.38573C4.1042 9.2706 6.59774 10.3112 9.26798 10.3112C11.9382 10.3112 14.4318 9.2706 16.297 7.38573L17.9855 5.67756C18.1426 5.52048 18.1426 5.28487 17.9855 5.1278ZM15.7473 6.83597C14.0194 8.56377 11.7223 9.52585 9.26798 9.52585C6.81371 9.52585 4.51652 8.56377 2.78871 6.83597L1.37506 5.40268L2.78871 3.96938C4.51652 2.24158 6.81371 1.27951 9.26798 1.27951C11.7223 1.27951 14.0194 2.24158 15.7473 3.96938L17.1609 5.40268L15.7473 6.83597Z" fill="#6D5D4C" />
                      </svg>2</a>
                  </div>
                  <div className="comment">
                    <a href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                        <path d="M15.3486 0.922852H1.21202C0.996043 0.922852 0.819336 1.09956 0.819336 1.31553V10.7399C0.819336 10.9559 0.996043 11.1326 1.21202 11.1326H4.35348V13.4887C4.35348 13.8421 4.7658 14.0188 5.02104 13.7636L7.69129 11.1326H15.3486C15.5646 11.1326 15.7413 10.9559 15.7413 10.7399V1.31553C15.7413 1.09956 15.5646 0.922852 15.3486 0.922852ZM14.9559 10.3472H7.53421C7.43604 10.3472 7.33787 10.3865 7.25934 10.465L5.13885 12.5463V10.7399C5.13885 10.5239 4.96214 10.3472 4.74617 10.3472H1.6047V1.70822H14.9559V10.3472Z" fill="#6D5D4C" />
                      </svg>0</a>
                  </div>
                  <div className="share">
                    <a href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 21 21" fill="none">
                        <path d="M11.3564 3.0918L10.702 3.42312V5.49289C8.53045 5.41517 6.40857 6.15359 4.75446 7.56266C2.45563 9.58334 1.29395 12.8761 1.29395 17.3797L2.0834 17.527C2.16521 17.3266 4.05909 12.6634 10.702 12.4794V14.9786L11.3564 15.3059L19.1283 9.53016V8.8716L11.3564 3.0918ZM11.5201 14.1646V12.0621L11.111 11.6531C6.03886 11.6531 3.37598 14.1442 2.16521 15.7967C2.40246 12.3526 3.44961 9.79604 5.28213 8.18031C6.73349 6.95706 8.57488 6.29392 10.4729 6.31098C10.8329 6.31098 11.0497 6.33552 11.0578 6.33552L11.5201 5.92648V4.23712L18.1957 9.19883L11.5201 14.1646Z" fill="#6D5D4C" />
                      </svg></a>
                  </div>
                </div>
                <div className="favorite">
                  <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} viewBox="0 0 20 21" fill="none">
                      <path opacity="0.5" d="M9.91429 18.051L8.72806 16.9711C4.5149 13.1506 1.7334 10.6228 1.7334 7.53855C1.7334 5.01066 3.71318 3.03906 6.23289 3.03906C7.65637 3.03906 9.02258 3.70171 9.91429 4.74069C10.806 3.70171 12.1722 3.03906 13.5957 3.03906C16.1154 3.03906 18.0952 5.01066 18.0952 7.53855C18.0952 10.6228 15.3137 13.1506 11.1005 16.9711L9.91429 18.051Z" fill="#FCF7F2" stroke="#6D5D4C" strokeWidth="0.981707" />
                      <path d="M9.91429 18.051L8.72806 16.9711C4.5149 13.1506 1.7334 10.6228 1.7334 7.53855C1.7334 5.01066 3.71318 3.03906 6.23289 3.03906C7.65637 3.03906 9.02258 3.70171 9.91429 4.74069C10.806 3.70171 12.1722 3.03906 13.5957 3.03906C16.1154 3.03906 18.0952 5.01066 18.0952 7.53855C18.0952 10.6228 15.3137 13.1506 11.1005 16.9711L9.91429 18.051Z" stroke="#6D5D4C" strokeWidth="0.981707" />
                    </svg></a>
                </div>
              </div>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  </div> */}
{/* </div> */}


                    </div>
                </section>
                :
                <NoDataFound />
            }
        </>
    )
}

export default SingleBlog