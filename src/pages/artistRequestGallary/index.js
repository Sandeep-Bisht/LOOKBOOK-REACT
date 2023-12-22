import React from 'react'
import { useLocation } from 'react-router-dom'

function ArtistGallery() {
  const artistRequestGallery = useLocation();
  return (
    <section>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
          <h3>Artist Request Gallery</h3>
          </div>
          <div className='row mt-4 g-3'>
          {
            artistRequestGallery && artistRequestGallery.state && artistRequestGallery.state.length>0 
            && artistRequestGallery.state.map((item,index)=>{
             return (
              <div className={`${index == 0 ? 'col-md-12' : 'col-md-6'} text-center`}>
                    <img src={item.thumbnailUrl} key={index} alt='gallery image' className='img-fluid h-100 w-100'style={{maxHeight:'50vh',objectFit:'cover'}} />
                  </div>
             )
            })
          }
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArtistGallery