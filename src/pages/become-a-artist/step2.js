import React from 'react'
import ArtistFooter from './artistFooter'
import { useNavigate } from 'react-router-dom'

const Step2 = () => {

    let navigate = useNavigate()
  return (
    <>
    <section>
        <div className="container">
          <div className="row" style={{ height: "75vh" }}>
            <div className="col-md-12">
              <div>
                <h1 className="text-center">Step 2 instructions will be here</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ArtistFooter
        backClick={() => navigate("/become-a-artist/insight-your-work")}
        nextClick={() => navigate("/become-a-artist/gallary")}
      />
      </>
  )
}

export default Step2