import { axiosAuth, axiosLocal } from "./axiosInstance"

export const getUserProfile = async () =>{
    try{
        const response = await axiosAuth.get('/users/getProfile');
        return response.data;
    }
    catch(error){
        return error.message || "An error occured while trying to get user profile."
    }
} 

export const allServicesDetails = async () => {
    try {
      const response = await axiosAuth.get('/service/all_services');
      return response.data.data
    } catch (error) {
        return error.message || "An error occured while trying to get all services."
      // Handle the error appropriately
    }
  };  
  
export const allProductsDetails = async () => {
    try {
      const response = await axiosAuth.get('/product/all_products');
      return response.data.data
    } catch (error) {
        return error.message || "An error occured while trying to get all products."
      // Handle the error appropriately
    }
  };

export const getAllBlog = async () =>{
    try{
        const response = await axiosAuth.get('/blog/all_blogs');
        return response.data.data;
    }
    catch(error){
        return error.message || "An error occured while trying to get All Blogs."
    }
}

export const getArtistRequests = async () =>{
  try{
      const response = await axiosAuth.get('/users/getArtistRequests');
      return response.data;
  }
  catch(error){
      return error.message || "An error occured while trying to get artist request."
  }
} 

export const getServiceUpdateData = async ({params}) =>{
  const {_id} = params;
  const urls = [`/service/get_service_by_id/${_id}`, `/artist-categories/all-artist-categories`];

  try {
    const responses = await Promise.all(urls.map(url => axiosAuth.get(url)));

    // Initialize an object with keys representing the source of the data
    let data = {
      getServiceDataById: responses[0].data.data,   // assuming the first API is for artist requests
      allArtistCategories: responses[1].data.data,
    };
    
    return data;
  } catch (error) {
    return error.message || "An error occurred while trying to get artist homepage initialdata.";
  }
} 

export const getProductById = async (_id) => {
  try {
    const response = await axiosAuth.post('/product/get_product_by_id', { _id:_id });
      return response.data.data
 } catch (error) {
  return error.message || "An error occured while trying to get product by ID."
}
};


export const getBlogById = async (_id) => {
  try {
    const response = await axiosLocal.post('/blog/get_blog_by_id', { _id:_id });
      return response.data.data
 } catch (error) {
  return error.message || "An error occured while trying to get Blog by ID."
}
};

export const getAllArtistRequest = async () => {
  try {
    const response = await axiosAuth.get('/users/getAllArtistRequest');
      return response.data.data
 } catch (error) {
  return error.message || "An error occured while trying to get all artists request."
   }
};

export const getAllArtistCategories = async () => {
  try {
    const response = await axiosLocal.get('/artist-categories/all-artist-categories');
      return response.data.data
 } catch (error) {
  return error.message || "An error occured while trying to get all artists request."
   }
};

export const getArtistCategoryById = async ({params}) => {
  const {_id} = params;
  try {
    const response = await axiosAuth.get(`/artist-categories/get_artist_category_by_id/${_id}`);
      return response.data.data
 } catch (error) {
  return error.message || "An error occured while trying to get all artists request."
   }
};

export const getWizardData  = async () => {
  const urls = [`/users/getArtistRequests`, `/artist-categories/all-artist-categories`, `/product/all_products`];

  try {
    const responses = await Promise.all(urls.map(url => axiosAuth.get(url)));

    // Initialize an object with keys representing the source of the data
    let data = {
      artistRequests: responses[0].data,   // assuming the first API is for artist requests
      allCategories: responses[1].data.data,
      allProducts: responses[2].data.data
    };

    return data;
  } catch (error) {
    return error.message || "An error occurred while trying to get artist requests.";
  }
};

export const getAllArtists  = async () => {
  try {
    const response = await axiosLocal.get('/artists/get-all-artists');
      return response.data
 } catch (error) {
  return error.message || "An error occured while trying to get all artists."
   }
};

export const getArtistByServiceId = async ({params}) =>{
  const request_id = params.service_id
  try {
    const response = await axiosLocal.get(`/search/findArtist`, {
      params: { service: request_id },
    })
    return response.data
  } catch (error) {
  return error.message || "An error occured while trying to get artists request by ID."
   }
}

export const getArtistsByServiceSlug = async ({params}) =>{
  const { service_slug } = params;
  try {
    const response = await axiosLocal.get(`/artists/get-artists-by-category-slug/${service_slug}`)
    return response.data
  } catch (error) {
  return error.message || "An error occured while trying to get artists request by ID."
   }

}

export const getHomepageData  = async () => {
  const urls = [`/artists/get-all-artists`, `/blog/all_blogs`, `/slides/all_slides`];

  try {
    const responses = await Promise.all(urls.map(url => axiosAuth.get(url)));

    // Initialize an object with keys representing the source of the data
    let data = {
      allArtists: responses[0].data,   // assuming the first API is for artist requests
      allBlogs: responses[1].data.data,
      allSlides: responses[2].data.data
    };

    return data;
  } catch (error) {
    return error.message || "An error occurred while trying to get artist homepage initialdata.";
  }
};

export const getArtistRequestByID = async({params}) =>{
  const request_id = params.request_id
  try {
    const response = await axiosAuth.get(`/management/artist-request-by-id/${request_id}`);
    return response.data
  } catch (error) {
  return error.message || "An error occured while trying to get artists request by ID."
   }
}

export const getSearchParameters = async () => {
  try {
    const response = await axiosAuth.get('/search/getInitialData');
    return response.data
  } catch (error) {
      return error.message || "An error occured while trying to get search initial Data."
  }
};  

export const getArtistById = async ({params}) => {
  try {
    const {artist_id} = params;
    const response = await axiosAuth.get(`/artists/get-artist-by-id/${artist_id}`);
    return response.data
  } catch (error) {
      return error.message || "An error occured while trying to get artist by id."
  }
}; 

export const getArtistByAlias = async ({params}) => {
  try {
    const {service_slug, artist_slug} = params;
    const response = await axiosAuth.get(`/artists/get-artist-by-slug/${service_slug}/${artist_slug}`);
    return response.data
  } catch (error) {
      return error.message || "An error occured while trying to get artist by id."
  }
}; 

export const get_services_price_by_artist_id = async () => {
  try {
    // const {artist_id} = params;
    const response = await axiosAuth.get(`/artists/get-my-artist-data`);
    return response.data
  } catch (error) {
      return error.message || "An error occured while trying to get pricing."
  }
}; 

export const getBlogBySlug = async ({params}) => {
  try {
    const {category_slug, slug} = params;
    const response = await axiosAuth.get(`/blog/get_blog_by_slug/${category_slug}/${slug}`);
    return response.data
  } catch (error) {
      return error.message || "An error occured while trying to get Blog by slug."
  }
}; 

export const getUserWishlistByID = async() =>{
  try {
    const response = await axiosAuth.get(`/wishlist/get_user_wishlist_by_id`);
    return response.data.data
  } catch (error) {
  return error.message || "An error occured while trying to get user wishlist."
   }
}

export const getUserWishlist = async() =>{
  try {
    const response = await axiosAuth.get(`/wishlist/get_user_wishlist`);
    return response.data.data
  } catch (error) {
  return error.message || "An error occured while trying to get user wishlist."
   }
}

export const getAllCategories  = async () => {
  try {
    const response = await axiosLocal.get('/category/all_categories');
      return response.data.data
 } catch (error) {
  return error.message || "An error occured while trying to get all categories."
   }
};

export const getCategoryById = async ({params}) => {
  try {
    const {category_id} = params;
    const response = await axiosAuth.get(`/category/get_category_by_id/${category_id}`);
    return response.data
  } catch (error) {
      return error.message || "An error occured while trying to get artist by id."
  }
}; 

export const getAdminDashboardInitialData = async() =>{
  try {
    const response = await axiosAuth.get(`/management/get-admin-dashboard-initial-data`);
    return response.data.data
  } catch (error) {
  return error.message || "An error occured while trying to get dashboard data."
   }
}

export const getBlogsAndCategory = async()=>{
  const allBlogs=getAllBlog();
  const allCategories=getAllCategories();
  return Promise.all([allBlogs,allCategories]).then((results)=>{
   return {
    allBlogs: results[0],
    allCategories: results[1],
   }
  })
}

export const getBlogByIdAndCategory = async(params)=>{
  const {_id} = params 
  const getBlogByid=getBlogById(_id);
  const allCategories=getAllCategories();
  return Promise.all([getBlogByid,allCategories]).then((results)=>{
   return {
    allBlogs: results[0],
    allCategories: results[1],
   }
  })
}

export const getBlogByCategorySlug  = async ({params}) => {
  const {category_slug} = params;
  try {
    const response = await axiosLocal.get(`/blog/get_blog_by_category_slug/${category_slug}`);
      return response.data.data
 } catch (error) {
  return error.message || "An error occured while trying to get all categories."
   }
};

export const getAllComments  = async () => {
  try {
    const response = await axiosLocal.get('/comment/all_comments');
      return response.data.data
 } catch (error) {
  return error.message || "An error occured while trying to get all categories."
   }
};

export const getAllSlides = async () => {
  try {
    const response = await axiosLocal.get('/slides/all_slides');
    return response.data.data
  } catch (error) {
      return error.message || "An error occured while trying to get all slides."
    // Handle the error appropriately
  }
};

export const getSlidesById = async ({params}) => {
  const {_id} = params
  try {
    const response = await axiosAuth.get(`/slides/get_slides_by_id/${_id}`);
      return response.data.data
 } catch (error) {
  return error.message || "An error occured while trying to get slides by ID."
}
};

export const getCartData = async () => {
  try {
    const response = await axiosAuth.get('/cart/get-cart-data');
      return response.data
 } catch (error) {
  return error.message || "An error occured while trying to get cart data."
   }
}
