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

export const getAllProducts = async () =>{
  try{
      const response = await axiosAuth.get('/product/all_products');
      return response.data.data;
  }
  catch(error){
      return error.message || "An error occured while trying to get products."
  }
} 


export const getAllServices = async () =>{
  try{
      const response = await axiosAuth.get('/service/all_services');
      return response.data.data;
  }
  catch(error){
      return error.message || "An error occured while trying to get services."
  }
} 

export const getArtistRequests = async () =>{
  try{
      const response = await axiosAuth.get('/service/all_services');
      return response.data.data;
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
