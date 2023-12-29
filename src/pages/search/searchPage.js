import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import NoDataFound from 'pages/become-a-artist/common/noDataFound';
import '@css/user/allArtists.css'
import { axiosLocal } from 'configs/axiosInstance';
import { Loading } from 'react-loading-dot';
import { ArtistCard } from 'layouts/components/artistCard';

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
                  <ArtistCard artistInfo={artist}/>
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