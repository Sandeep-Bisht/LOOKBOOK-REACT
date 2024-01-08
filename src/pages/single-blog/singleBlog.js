import React from 'react'
import { useLoaderData } from 'react-router-dom'
import "@css/user/singleBlog.css"
import NoDataFound from 'pages/become-a-artist/common/noDataFound'
import instagram from "@core/assets/footer/instagram.png"
import facebook from "@core/assets/footer/Facebook.png"
import twitter from "@core/assets/footer/twitter.png"
import linkedin from "@core/assets/footer/LinkedIn.png"
import youtube from "@core/assets/footer/youtube.png"
import copyurl from "@core/assets/footer/copyurl.png"

const SingleBlog = ()=> {
    const blogData = useLoaderData()
    return (
        <>
            {blogData && blogData._id
                ?
                <section class="usr-single-blogs">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6 usr-single-blogs-image">
                                <div class="background-image">
                                    <img src={blogData?.featuredImage?.url} class="img-fluid w-100" />
                                </div>
                                <div class="usr-single-blogs-social-icons">
                                    <div class="social-icons">
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
                                    <div class="reviews">
                                        <a href="" class="views">50 Views</a>
                                        <a href="" class="comments">2 Comments</a>
                                        <a href="" class="likes">
                                            <svg xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.5"
                                                    d="M9.99984 18.2917L8.7915 17.1917C4.49984 13.3 1.6665 10.725 1.6665 7.58333C1.6665 5.00833 3.68317 3 6.24984 3C7.69984 3 9.0915 3.675 9.99984 4.73333C10.9082 3.675 12.2998 3 13.7498 3C16.3165 3 18.3332 5.00833 18.3332 7.58333C18.3332 10.725 15.4998 13.3 11.2082 17.1917L9.99984 18.2917Z" />
                                                <path
                                                    d="M9.99984 18.2917L8.7915 17.1917C4.49984 13.3 1.6665 10.725 1.6665 7.58333C1.6665 5.00833 3.68317 3 6.24984 3C7.69984 3 9.0915 3.675 9.99984 4.73333C10.9082 3.675 12.2998 3 13.7498 3C16.3165 3 18.3332 5.00833 18.3332 7.58333C18.3332 10.725 15.4998 13.3 11.2082 17.1917L9.99984 18.2917Z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 usr-single-blogs-content">
                                <h3>{blogData?.title}</h3>
                                <p dangerouslySetInnerHTML={{ __html: blogData?.content }}></p>
                            </div>
                        </div>
                    </div>
                </section>
                :
                <NoDataFound />
            }
        </>
    )
}

export default SingleBlog