import React from 'react'
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom'

const BlogsCategoryFilter = () => {
    const navigate = useNavigate();
    const allCategories = useLoaderData()
  return (
    <section className='usr-all-blog'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 mt-3 text-center'>
            <h2 className='all-blog-top-heading .usr-common-heading'>ALL BLOGS</h2>
          </div>
          <div className='col-md-12 mt-5 text-center'>
            <button className='btn blog-type-btn' onClick={()=>navigate('/blogs')}>All Post |</button>
            {
              allCategories && Array.isArray(allCategories) && allCategories.map((category,index)=>{
                return(
                  <button className='btn blog-type-btn' key={index} onClick={()=>navigate('/blogs/'+category.slug)}>{category.title} |</button>
                )
              })
            }
          </div>
          <Outlet/>
        </div>
      </div>
    </section>
  )
}

export default BlogsCategoryFilter