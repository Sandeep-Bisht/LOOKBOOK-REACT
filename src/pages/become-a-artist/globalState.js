import React, { useEffect, useState } from 'react'
import BecomeAristHeader from './common/header';
import { Navigate, Outlet, useLoaderData, useParams } from 'react-router-dom';
import { Loading } from 'react-loading-dot'

const ArtistGlobalState = () => {
  
    const artistRequests = useLoaderData();
    const { request_id } = useParams();
    const [artistPayload, setArtistPayload]= useState()
    var currentRequest;

    
    useEffect(()=>{
        if(currentRequest){
            setArtistPayload(currentRequest);
        }
    },[currentRequest])

    if(artistRequests && Array.isArray(artistRequests) && request_id){
        
        var openRequest = artistRequests.find(item=>item._id == request_id);

        if(!openRequest){
            return(
                <Navigate to={`/become-a-artist`} replace={true} />
            )
        }

        currentRequest = openRequest;
    }
  
  
    return (
      <>{artistPayload ?
            <div className="artist-wrapper-ar">
            <BecomeAristHeader />
            <Outlet context={[artistPayload, setArtistPayload]} />
            </div> 
        : <Loading background="#8c6a54"/>
      }
      </>
    );
}

export default ArtistGlobalState