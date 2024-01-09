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

export const getServiceById = async (_id) => {
  try {
    const response = await axiosAuth.post('/service/get_service_by_id', { _id:_id });
      return response.data.data
 } catch (error) {
  return error.message || "An error occured while trying to get service by ID."
}
};

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

export const getWizardData  = async () => {
  const urls = [`/users/getArtistRequests`, `/service/all_services`, `/product/all_products`];

  try {
    const responses = await Promise.all(urls.map(url => axiosAuth.get(url)));

    // Initialize an object with keys representing the source of the data
    let data = {
      artistRequests: responses[0].data,   // assuming the first API is for artist requests
      allServices: responses[1].data.data,
      allProducts: responses[2].data.data
    };

    return data;
  } catch (error) {
    return error.message || "An error occurred while trying to get artist requests.";
  }
};


export const getAllArtists  = async () => {
  try {
    const response = await axiosLocal.get('/artists/get-all');
      return response.data
 } catch (error) {
  return error.message || "An error occured while trying to get all artists."
   }
};

export const getHomepageData  = async () => {
  const urls = [`/artists/get-all`, `/blog/all_blogs`];

  try {
    const responses = await Promise.all(urls.map(url => axiosAuth.get(url)));

    // Initialize an object with keys representing the source of the data
    let data = {
      allArtists: responses[0].data,   // assuming the first API is for artist requests
      allBlogs: responses[1].data.data
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
    const response = await axiosAuth.get(`/artists/get-by-id/${artist_id}`);
    return response.data
  } catch (error) {
      return error.message || "An error occured while trying to get artist by id."
  }
};  


export const getBlogBySlug = async ({params}) => {
  try {
    const {slug} = params;
    const response = await axiosAuth.get(`/blog/get_blog_by_slug/${slug}`);
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


