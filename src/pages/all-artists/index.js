import React, { useEffect, useState } from 'react'
import { useLoaderData, useOutletContext } from 'react-router-dom';
import NoDataFound from 'pages/become-a-artist/common/noDataFound';
import Cookies from 'universal-cookie';
import '@css/user/allArtists.css'
import { ArtistCard } from 'layouts/components/artistCard';
import ArtistFilter from 'layouts/components/header/artist-filter';
import { axiosAuth } from 'configs/axiosInstance';

const AllArtists = () => {

  const artists = useLoaderData()
  const [ wishlist ] = useOutletContext();
  const [services, setServices] = useState(null)
  const [allArtists, setAllArtists] = useState(artists ? artists : [])

  useEffect(()=>{
    getAllServices()
  }, [])

  const getAllServices = async () => {
    try {
      const response = await axiosAuth.get('/search/getInitialData');
      if(response){
        
        setServices(response.data.services)
      } 
    } catch (error) {
        return error.message || "An error occured while trying to get Services."
    }
  }; 

  console.log("This is allArtists",allArtists)

  return (
    <>
    
      
    <ArtistFilter services={services} setAllArtists={setAllArtists} allArtists={allArtists}/>
    {allArtists?.length > 0 ? 
    <section className="usr-all-artist">
        <div className="container">          
          <div className="row my-5">
            {allArtists && Array.isArray(allArtists) && allArtists.map((artist,ind)=>{
              return (
                <div className="col-md-3" key={`artist${ind}`}>
                  <ArtistCard artistInfo={artist} wishlist={wishlist} />
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

export default AllArtists