import React, { useState } from 'react'
import { Navigate, useLoaderData, useNavigate, useParams } from 'react-router-dom'
import CommonButton from './common/commonButton'
import { axiosAuth } from 'configs/axiosInstance'

const BASE_URL = process.env.REACT_APP_APIURL

const GetStarted = () => {
    const {request_id} = useParams()
    const artistRequests = useLoaderData();

    const navigate = useNavigate()

    const [loading,setLoading] = useState(false);

    if(artistRequests && Array.isArray(artistRequests) && (!request_id)){

        var openRequest = artistRequests.find(item=>item.status == "progress");

        if(openRequest){
            return(
                <Navigate to={`/become-a-artist/${openRequest._id}/get-started`} replace={true} />
            )
        }
    }

    const createNewRequest = async () =>{
        try{
            setLoading(() => true);
            const response = await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`);
            setLoading(() => false);
            let id = response.data?.data._id;
            navigate(`/become-a-artist/${id}/about-your-skills`)
        }
        catch(error){
            throw error;
        }
    }

  return (
      <>
          <section className="artist-registration">
              <div className="container">
                  <div className="row artist-landing-page">
                      <div className="col-md-6">
                          <div>
                              <h1>It’s easy to get started on Lookbook</h1>
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div>
                              <div className="artist-steps-heading">
                                  <h3>1. Tell us about your place</h3>
                                  <span>
                                      Share some basic info, such as where it is and how many
                                      guests can stay.
                                  </span>
                              </div>
                              <div className="artist-steps-heading">
                                  <h3>2. Make it stand out</h3>
                                  <span>
                                      Add 5 or more photos plus a title and description – we’ll
                                      help you out.
                                  </span>
                              </div>
                              <div className="artist-steps-heading">
                                  <h3>3. Finish up and publish</h3>
                                  <span>
                                      Share some basic info, such as where it is and how many
                                      guests can stay.
                                  </span>
                              </div>
                          </div>
                      </div>
                  </div>


              </div>
          </section>

          <footer className="artist-footer-ar">
              <hr className="m-0" />
              <div className="col-md-12 p-3">
                  <div
                      className="get-started-div text-end"
                     
                  >
                    {
                        request_id ? <CommonButton label="Get Started"  onClick={() => navigate(`/become-a-artist/${request_id}/about-your-skills`)}/>
                        :
                        <CommonButton label="Get Started"  onClick={() => createNewRequest()} disabled={loading}/>
                    }
                    
                  </div>
              </div>
          </footer>
      </>
  )
}

export default GetStarted