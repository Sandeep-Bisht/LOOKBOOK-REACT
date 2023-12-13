import React from 'react'
import ArtistFooter from './artistFooter'
import { useNavigate, useParams } from 'react-router-dom'

const Description = () => {

    let navigate= useNavigate()
    const { request_id } = useParams();
  return (
    <>
    <section className="about">
    <div className="container">
      <div className="row mb-3">
        <div className="col-md-12">
          <h1 className="text-center">Create your description</h1>
        </div>
      </div>
      </div>
      </section>

      <ArtistFooter
        backClick={() => navigate(`/become-a-artist/${request_id}/you-are-best-in`)}
        nextClick={() => navigate(`/become-a-artist/${request_id}/finish-setup`)}
      />
</>
  )
}

export default Description