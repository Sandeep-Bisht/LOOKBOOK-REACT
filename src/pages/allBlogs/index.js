import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { truncateDescription } from 'configs/truncateDescription'
import "@css/allBlog.css"


const AllBlogs = () => {

  const allBlogs = useLoaderData();
  console.log(allBlogs,"check all blogs")

  return (
    <section className='usr-all-blog'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 mt-3 text-center'>
            <h2 className='all-blog-top-heading .usr-common-heading'>ALL BLOGS</h2>
          </div>
          <div className='col-md-12 mt-5 text-center'>
            <button className='btn blog-type-btn'>All Post |</button>
            <button className='btn blog-type-btn'>Make Trends |</button>
            <button className='btn blog-type-btn'>Makeup Artist Career |</button>
            <button className='btn blog-type-btn'>And Other Posts</button>
          </div>
          <div className='col-md-12 mt-2'>
            <div className='row'>
              {
                allBlogs && Array.isArray(allBlogs) && allBlogs.map((item,index)=>(
                    <div className='col-md-3'>
                    <div className="blog-section-card ">
                      <div className="usr-blog-content-wrapper">
                        <div className="usr-blog-content">
                          <img src={item.featuredImage.url} className="img-fluid" />
                          <div className="usr-card-body">
                            <h4 className="usr-all-blog-heading">{item.title}</h4>
                            <p className="usr-all-blog-para">
                              {truncateDescription(item.description,50)}
                            </p>
                            <hr />
                          </div>
                          <div className="blog-card-icon d-flex justify-content-between">
                            <div className='d-flex'>
                              <div className="usr-blog-card-view-comment-box me-2">
                                <span className="usr-blog-card-view-comment-box-icon me-1">
                                  <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1.8C7.24 1.8 5.8 3.24 5.8 5C5.8 6.76 7.24 8.2 9 8.2C10.76 8.2 12.2 6.76 12.2 5C12.2 3.24 10.76 1.8 9 1.8ZM9 7.4C7.68 7.4 6.6 6.32 6.6 5C6.6 3.68 7.68 2.6 9 2.6C10.32 2.6 11.4 3.68 11.4 5C11.4 6.32 10.32 7.4 9 7.4ZM17.88 4.72L16.16 2.98C14.26 1.06 11.72 0 9 0C6.28 0 3.74 1.06 1.84 2.98L0.12 4.72C-0.04 4.88 -0.04 5.12 0.12 5.28L1.84 7.02C3.74 8.94 6.28 10 9 10C11.72 10 14.26 8.94 16.16 7.02L17.88 5.28C18.04 5.12 18.04 4.88 17.88 4.72ZM15.6 6.46C13.84 8.22 11.5 9.2 9 9.2C6.5 9.2 4.16 8.22 2.4 6.46L0.96 5L2.4 3.54C4.16 1.78 6.5 0.8 9 0.8C11.5 0.8 13.84 1.78 15.6 3.54L17.04 5L15.6 6.46Z" fill="#6D5D4C" />
                                  </svg>
    
                                </span>
                                <span className="usr-blog-card-view-comment-box-number">
                                  2 |
                                </span>
    
                              </div>
                              <div className="usr-blog-card-view-comment-box">
                                <span className="usr-blog-card-view-comment-box-icon me-1">
                                  <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.2004 0.400391H0.800391C0.580391 0.400391 0.400391 0.580391 0.400391 0.800391V10.4004C0.400391 10.6204 0.580391 10.8004 0.800391 10.8004H4.00039V13.2004C4.00039 13.5604 4.42039 13.7404 4.68039 13.4804L7.40039 10.8004H15.2004C15.4204 10.8004 15.6004 10.6204 15.6004 10.4004V0.800391C15.6004 0.580391 15.4204 0.400391 15.2004 0.400391ZM14.8004 10.0004H7.24039C7.14039 10.0004 7.04039 10.0404 6.96039 10.1204L4.80039 12.2404V10.4004C4.80039 10.1804 4.62039 10.0004 4.40039 10.0004H1.20039V1.20039H14.8004V10.0004Z" fill="#6D5D4C" />
                                  </svg>
    
    
                                </span>
                                <span className="usr-blog-card-view-comment-box-number">
                                  0 |
                                </span>
    
                              </div>
                              <div className="usr-blog-card-view-comment-box ms-1">
                                <span className="usr-blog-card-view-comment-box-icon me-1">
                                  <svg width="16" height="14" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.0835 0.553711L10.4168 0.891211V2.99954C8.20485 2.92038 6.04343 3.67256 4.3585 5.10788C2.01683 7.16621 0.833496 10.5204 0.833496 15.1079L1.63766 15.2579C1.721 15.0537 3.65016 10.3037 10.4168 10.1162V12.662L11.0835 12.9954L19.0002 7.11204V6.44121L11.0835 0.553711ZM11.2502 11.8329V9.69121L10.8335 9.27454C5.66683 9.27454 2.95433 11.812 1.721 13.4954C1.96266 9.98704 3.02933 7.38288 4.896 5.73704C6.3744 4.49099 8.2501 3.8155 10.1835 3.83288C10.5502 3.83288 10.771 3.85788 10.7793 3.85788L11.2502 3.44121V1.72038L18.0502 6.77454L11.2502 11.8329Z" fill="#6D5D4C" />
                                  </svg>
                                </span>
                              </div>
                            </div>
                            <div>
                              <div className="usr-blog-card-view-comment-box">
                                <span className="usr-blog-card-view-comment-box-icon">
                                  <svg width="16" height="14" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.99984 15.7917L7.7915 14.6917C3.49984 10.8 0.666504 8.225 0.666504 5.08333C0.666504 2.50833 2.68317 0.5 5.24984 0.5C6.69984 0.5 8.0915 1.175 8.99984 2.23333C9.90817 1.175 11.2998 0.5 12.7498 0.5C15.3165 0.5 17.3332 2.50833 17.3332 5.08333C17.3332 8.225 14.4998 10.8 10.2082 14.6917L8.99984 15.7917Z" stroke="#6D5D4C" />
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default AllBlogs
