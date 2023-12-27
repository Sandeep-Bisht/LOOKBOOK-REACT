import React from 'react'
import Slider from "react-slick";
import { FaRegHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useLoaderData } from 'react-router-dom';
import NoDataFound from 'pages/become-a-artist/common/noDataFound';
import '@css/user/allArtists.css'

const Search = () => {

  const allArtists = useLoaderData()
  console.log(allArtists,'all artists')
    
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

  return (
    <>
    {allArtists?.length > 0 ? 
    <section className="usr-all-artist">
        <div className="container">
          <div className="row my-5">
            {allArtists.map((artist,ind)=>{
              return (
                <div className="col-md-3" key={`artist${ind}`}>
              <div className="usr-all-artist-card">
                <div className="usr-all-artist-card-wrapper">
                  <div className="usr-all-artist-card-favourite">
                    <button className="usr-all-artist-card-favourite-button">
                      <FaRegHeart />
                    </button>
                  </div>
                  <Slider className="usr-all-artist-card-carsouel" {...settings}>
                    {artist.gallery.map((item,index)=>{
                      return (<div key={`gallery${index}`}>
                      <img src={`${item.url}?tr=h-400,w-400,fo-auto`} alt={item.name}/>
                    </div>)
                    })}
                  </Slider>
                </div>
                <div className="usr-all-artist-card-body">
                  <span className="usr-all-artist-card-rating"><FaStar />4.5</span>
                  <h4 className="usr-all-artist-card-name">{artist?.profile_id?.fullName}</h4>
                  <span className="usr-all-artist-card-date">18-23 Dec | 5 kilometers away </span>
                  <div className="usr-all-artist-prize-list">
                    <span className="usr-all-artist-card-tag">Charges</span>
                    <span className="usr-all-artist-card-prize">₹ {artist?.pricing?.totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
              )
            })}
          </div>
        </div>
      </section>
      : 
    <section className='bg-white pb-4'>
    <NoDataFound/>
    </section>}
    </>
  )
}

export default Search