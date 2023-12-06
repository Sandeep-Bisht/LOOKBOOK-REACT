import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get('LOOKBOOK_TOKEN');

export const axiosPrivate = axios.create({
    baseURL:process.env.REACT_APP_APIURL,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization':  `Bearer ${token}`, // Include the token in the headers
    },
})