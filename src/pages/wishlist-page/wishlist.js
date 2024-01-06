import { ArtistCard } from 'layouts/components/artistCard';
import { useLoaderData, useOutletContext } from 'react-router-dom';
import React, { useState } from 'react'
import NoDataFound from 'pages/become-a-artist/common/noDataFound';

const Wishlist = () => {

    const [ wishlist ] = useOutletContext();
    const userWishlistData = useLoaderData()

    const [wishlistData,setWishlistData] = useState(userWishlistData)

    const updateWishlist = (data) =>{
        setWishlistData(data)
    }
  return (
    <>
    {wishlistData?.artist?.length > 0 ? 
    <section className="usr-all-artist">
        <div className="container">
          <div className="row my-5">
            {wishlistData && Array.isArray(wishlistData.artist) && wishlistData?.artist.map((wishlistArtist,ind)=>{
              return (
                <div className="col-md-3" key={`artist${ind}`}>
                  <ArtistCard  wishlist={wishlist} artistInfo={wishlistArtist} wishListCB={updateWishlist}/>
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

export default Wishlist