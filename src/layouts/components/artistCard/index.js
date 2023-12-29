import React from 'react'
import { formatIndianRupee } from 'configs/formatIndianRupee';
import { useNavigate } from 'react-router-dom'
import Slider from "react-slick";
import { FaRegHeart, FaStar } from "react-icons/fa";

export const ArtistCard = ({artistInfo}) => {

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    const navigate = useNavigate()
    
  return (
    <div className={`usr-all-artist-card`}>
                <div className="usr-all-artist-card-wrapper">
                  <div className="usr-all-artist-card-favourite">
                    <button className="usr-all-artist-card-favourite-button">
                      <FaRegHeart />
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
