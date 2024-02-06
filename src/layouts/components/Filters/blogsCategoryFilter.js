import React from 'react'
import "@css/user/blogCategory.css"
import { Link, Outlet, useLoaderData, useNavigate, useParams } from 'react-router-dom'

const BlogsCategoryFilter = () => {
  const {category_slug} = useParams();
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
          <Link type='buttton' to={'/blogs/'} className={`btn blog-type-btn ${!category_slug ? "category-active-button fw-700" : ""}`}>
            All Post |
          </Link>
            {
              allCategories && Array.isArray(allCategories) && allCategories.map((category, index) => {
                return (
                  <Link type='buttton' to={'/blogs/' + category.slug} className={`btn blog-type-btn ${category_slug == category.slug ? "category-active-button fw-700" : ""}`} key={index}>
                    {category.title} |
                  </Link>
                )
              })
            }
          </div>

          <Outlet />
        </div>
      </div>
    </section>
  )
}

export default BlogsCategoryFilter