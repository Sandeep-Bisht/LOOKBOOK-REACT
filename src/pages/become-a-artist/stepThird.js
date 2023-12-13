import React from 'react'
import ArtistFooter from './artistFooter'
import { useNavigate, useOutletContext } from 'react-router-dom'

const StepThird = () => {
  const [artistPayload, setArtistPayload] = useOutletContext();

  console.log("sthis i s my data", artistPayload)
    let navigate = useNavigate()
  return (
    <>
    <section>
        <div className="container">
          <div className="row" style={{ height: "75vh" }}>
            <div className="col-md-12">
              <div>
                <h1 className="text-center">Step 3 instructions will be here</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ArtistFooter
        backClick={() => navigate("/become-a-artist/description")}
        nextClick={() => navigate("/become-a-artist/pricing")}
      />
      </>
  )
}

export default StepThird