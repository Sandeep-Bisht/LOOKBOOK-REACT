import React from 'react'
import ArtistFooter from './artistFooter'
import { useNavigate, useParams } from 'react-router-dom'

const Description = () => {

  let navigate = useNavigate()
  const { request_id } = useParams();
  return (
    <>
      <section className="about">
        <div className="container">
          <div className="row mb-3">
            <div className="col-lg-8 mx-auto">
              <h1 className="text-center">Create your description</h1>
              <h6 className='text-center'>Short titles work best.Have fun with it - you can always change it later</h6>
              <div className='description-box mt-lg-5'>
                <div className="form-floating">
                  <textarea className="form-control resize-none" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: 150 }} defaultValue={""} />
                  <label htmlFor="floatingTextarea2">Comments</label>
                </div>
              </div>
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
