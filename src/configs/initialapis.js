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