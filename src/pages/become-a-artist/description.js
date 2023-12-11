import React from 'react'
import ArtistFooter from './artistFooter'
import { useNavigate } from 'react-router-dom'

const Description = () => {

    let navigate= useNavigate()
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
backClick={() => navigate("/become-a-artist/you-are-best-in")}
nextClick={() => navigate("/become-a-artist/finish-setup")}
/>
</>
  )
}

export default Description