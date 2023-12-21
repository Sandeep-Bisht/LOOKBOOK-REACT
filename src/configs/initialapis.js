import { axiosAuth } from "./axiosInstance"

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
        return error.message || "An error occured while trying to get user profile."
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
  return error.message || "An error occured while trying to get service request."
}
};

export const getProductById = async (_id) => {
  try {
    const response = await axiosAuth.post('/product/get_product_by_id', { _id:_id });
      return response.data.data
 } catch (error) {
  return error.message || "An error occured while trying to get product request."
}
};


export const getBlogById = async (_id) => {
  try {
    const response = await axiosAuth.post('/blog/get_blog_by_id', { _id:_id });
      return response.data.data
 } catch (error) {
  return error.message || "An error occured while trying to get Blog request."
}
};

export const getAllArtists = async () => {
  try {
    const response = await axiosAuth.get('/users/getAllArtistRequest');
      return response.data.data
 } catch (error) {
  return error.message || "An error occured while trying to get artists request."
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
