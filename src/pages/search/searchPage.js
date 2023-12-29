import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import { FaRegHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import NoDataFound from 'pages/become-a-artist/common/noDataFound';
import '@css/user/allArtists.css'
import { axiosLocal } from 'configs/axiosInstance';
import { Loading } from 'react-loading-dot';
import { formatIndianRupee } from 'configs/formatIndianRupee';

const BASE_URL = process.env.REACT_APP_APIURL;

const Search = () => {

  const [allArtists,setAllArtists] = useState([])
  const [searching,setSearching] = useState(true)
  const location = useLocation();

  useEffect(() => {
    // Get the search string from the location object
    const searchParams = new URLSearchParams(location.search);

    // Convert the searchParams object to a plain JavaScript object
    const queryParams = {};
    for (const [key, value] of searchParams.entries()) {
      queryParams[key] = value;
    }

    setSearching(true);

    // Make an Axios GET request using the queryParams
    axiosLocal.get(`${BASE_URL}/search/findArtist`, {
      params: queryParams,
    })
    .then(response => {
      // Handle the response data
      setAllArtists(response.data)
    })
    .catch(error => {
      // Handle errors
      setAllArtists(null)
      console.error('Error:', error);
    })
    .finally(() => {
      setSearching(false)
    });
  }, [location.search]);

    
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

  return (
    <>
    {
      searching ?
      <>
        <Loading background="#8c6a54"/>
      </>
      :
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
                    <span className="usr-all-artist-card-prize">{formatIndianRupee(artist?.pricing?.totalPrice ? artist?.pricing?.totalPrice : 0)}</span>
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
    }
    
    </>
  )
}

export default Search