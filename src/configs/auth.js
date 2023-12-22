import { jwtDecode } from 'jwt-decode';
import Cookies from 'universal-cookie';

export const checkAuth = () =>{
    
  const cookies = new Cookies();

  const token = cookies.get('LOOKBOOK_TOKEN')
  if(token){
    const decoded = jwtDecode(token);
    return decoded;
  }
  else{
    return null;
  }
}