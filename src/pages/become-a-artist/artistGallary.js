import React from 'react'
import { useNavigate } from 'react-router-dom'
import ArtistFooter from './artistFooter';

const ArtistGallary = () => {
    const navigate = useNavigate();
  return (
    <>
    <section>
      <div className='container'>
        <div className='row' style={{height: '75vh'}}>
          <div className='col-md-12'>
          <div className="">
      <h1 className='text-center'>Share some insight's of your work</h1>
    </div>
          </div>
        </div>
      </div>
    
    </section>

    <ArtistFooter backClick={()=>navigate('/become-a-artist/location')} nextClick={()=>navigate('/become-a-artist/location')} />  
    </>
  )
}

export default ArtistGallary