import React from 'react'
import ArtistFooter from './artistFooter'
import { useNavigate } from 'react-router-dom'

const ProfilePreview = () => {

    let navigate = useNavigate()
  return (
    <>
    <section className="about">
    <div className="container">
      <div className="row mb-3">
        <div className="col-md-12">
          <h1 className="text-center">Just one last step</h1>
        </div>
      </div>
    </div>
  </section>

  <ArtistFooter
        backClick={() => navigate("/become-a-artist/pricing")}
        // nextClick={() => navigate("/become-a-artist/profile-overview")}
      />
  </>
  )
}

export default ProfilePreview