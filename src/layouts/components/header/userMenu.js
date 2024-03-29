
// ** Icons Imports
import CogOutline from 'mdi-material-ui/CogOutline'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { Divider } from '@mui/material'
import { HomeOutline } from 'mdi-material-ui'



const UserMenu = ({props}) => {
    const [currentUser,setCurrentUser] = props;
    const navigate = useNavigate()

    const handleLogout = () =>{
      const cookies = new Cookies();
      if(cookies.get('LOOKBOOK_TOKEN')){
         cookies.remove('LOOKBOOK_TOKEN', { path: '/'})
      }

        setCurrentUser(null)
        navigate('/');
    }  

    return (
        <>
         {(currentUser?.role == process.env.REACT_APP_ADMIN || currentUser?.role == process.env.REACT_APP_SUPER_ADMIN) ? 
              <li>
                <Link className="dropdown-item " to="/management/dashboard">
                <HomeOutline sx={{ marginRight: 2 }} />
                Dashboard
                </Link>
              </li>
              :
              null
              }
        <li>
           <Link to="/user/profile" className="dropdown-item">
           <AccountOutline sx={{ marginRight: 2 }} />
            Profile
           </Link>
        </li>
        <li>
           <Link to="/user/cart" className="dropdown-item">
           <AccountOutline sx={{ marginRight: 2 }} />
            Cart
           </Link>
        </li>
        <li>
           <Link to="/user/bookings" className="dropdown-item">
           <AccountOutline sx={{ marginRight: 2 }} />
            Bookings
           </Link>
        </li>
        <li>
           <Link to="/user/addresses" className="dropdown-item">
           <AccountOutline sx={{ marginRight: 2 }} />
            Addresses
           </Link>
        </li>
        
        
        <li>
           <Link to="/wishlist" className="dropdown-item">
           <MessageOutline sx={{ marginRight: 2 }} />
            Wishlist
           </Link>
        </li>
        {(currentUser?.role == process.env.REACT_APP_ARTIST) ? 
        <li>
           <Link to="/price-setup" className="dropdown-item">
           <MessageOutline sx={{ marginRight: 2 }} />
            Price-Setup
           </Link>
        </li>
        : null}
        <li>
        <Divider />
           <Link to="/" className="dropdown-item d-none">
           <CogOutline sx={{ marginRight: 2 }} />
            Settings
           </Link>
        </li>
        <li>
           <Link to="/" className="dropdown-item d-none">
           <CurrencyUsd sx={{ marginRight: 2 }} />
            Pricing
           </Link>
        </li>
        <li>
           <Link to="/" className="dropdown-item d-none">
           <HelpCircleOutline sx={{ marginRight: 2 }} />
            FAQ
           </Link>
        </li>
        <li>
            {/* <Divider /> */}
           <button type="button" className="btn dropdown-item" onClick={handleLogout}>
           <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', }} />
            Logout
           </button>
        </li>
        </>
    )
  
}

export default UserMenu