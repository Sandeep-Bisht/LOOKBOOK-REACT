import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import { formatIndianRupee } from 'configs/formatIndianRupee';
import { useLocation, useNavigate } from 'react-router-dom'
import Slider from "react-slick";
import { FaHeart, FaStar } from "react-icons/fa";
import { axiosAuth } from "configs/axiosInstance";

const BASE_URL = process.env.REACT_APP_APIURL

export const ArtistCard = ({artistInfo, wishlist}) => {

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    const navigate = useNavigate()
    let cookies = new Cookies();
    const [userWishlist,setUserWishlist] = useState(wishlist ? wishlist : [])
    const location = useLocation();


    const wishlistHandler = async (artist_id) => {    
      const token = cookies.get('LOOKBOOK_TOKEN');
      if(token){
        let resposne = await axiosAuth.post(`${BASE_URL}/wishlist/mark_user_wishlist`,{artist_id});
        if(resposne){
         
          setUserWishlist(resposne.data.data)
        }
      } else{
        navigate(`/login?redirectUrl=${location.pathname}${location.search ? location.search : ''}`)
      }      

    }
    
  return (
    <div className={`usr-all-artist-card`}>
                <div className="usr-all-artist-card-wrapper">
                  <div className="usr-all-artist-card-favourite" onClick={() => wishlistHandler(artistInfo?._id)}>
                    <button className={`usr-all-artist-card-favourite-button ${userWishlist?.artist?.includes(artistInfo?._id) ? 'usr-whishlist-icon' : ''}`}>
                      <FaHeart />
                    </button>
                  </div>
                  <Slider className="usr-all-artist-card-carsouel" {...settings}>
                    {artistInfo?.gallery.map((item,index)=>{
                      return (<div key={`gallery${index}`}>
                      <img src={`${item.url}?tr=h-400,w-400,fo-auto`} alt={item.name} className='common-cursor-pointer' onClick={()=>navigate(`/artists/${artistInfo?._id}`)}/>
                    </div>)
                    })}
                  </Slider>
                </div>
                <div className="usr-all-artist-card-body">
                  <span className="usr-all-artist-card-rating"><FaStar />4.5</span>
                  <h4 className="usr-all-artist-card-name">{artistInfo?.profile_id?.fullName}</h4>
                  <span className="usr-all-artist-card-date">18-23 Dec | 5 kilometers away </span>
                  <div className="usr-all-artist-prize-list">
                    <span className="usr-all-artist-card-tag">Charges</span>
                    <span className="usr-all-artist-card-prize">{formatIndianRupee(artistInfo?.pricing?.totalPrice ? artistInfo?.pricing?.totalPrice : 0)}</span>
                  </div>
                </div>
              </div>
  )
}
