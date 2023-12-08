import { axiosAuth } from "./axiosInstance"

export const getUserProfile = async () =>{
    try{
        const response = await axiosAuth.get('/users/getProfile');
        return response.data;
    }
    catch(error){
        return error.message || "An error occured while trying to get user profile."
    }
<<<<<<< HEAD
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
=======
}   
export const getAllBlog = async () =>{
    try{
        const response = await axiosAuth.get('/blog/all_blogs');
        return response.data.data;
    }
    catch(error){
        return error.message || "An error occured while trying to get user profile."
    }
}
>>>>>>> create form and intigrate api on blog page
