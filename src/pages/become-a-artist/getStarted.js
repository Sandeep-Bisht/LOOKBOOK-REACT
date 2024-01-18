import React, { useState } from 'react'
import { Navigate, useLoaderData, useNavigate, useParams } from 'react-router-dom'
import CommonButton from './common/commonButton'
import { axiosAuth } from 'configs/axiosInstance'

const BASE_URL = process.env.REACT_APP_APIURL

const GetStarted = () => {
    const { request_id } = useParams()
    const artistRequests = useLoaderData();

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);

    if (artistRequests && Array.isArray(artistRequests) && (!request_id)) {

        var openRequest = artistRequests.find(item => item.status == "progress");

        if (openRequest) {
            return (
                <Navigate to={`/become-a-artist/${openRequest._id}/get-started`} replace={true} />
            )
        }
    }

    const createNewRequest = async () => {
        try {
            setLoading(() => true);
            const response = await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`);
            setLoading(() => false);
            let id = response.data?.data._id;
            navigate(`/become-a-artist/${id}/about-your-skills`)
        }
        catch (error) {
            throw error;
        }
    }

    return (
        <>
            <section className="usr-join-us-intro">
                <div className="container">
                    <div className="usr-join-us-head">
                        <div className="row">
                            <div className="col-md-12 usr-join-us-tags">
                                <h1>BE DISCOVERED</h1>
                                <div className="usr-join-us-cards">
                                    <div className="usr-join-us-card">
                                        <div className="usr-join-us-card-serial-number">
                                            <h1>1</h1>
                                        </div>
                                        <div className="usr-join-us-card-body">
                                            <h6>Tell us about yourself</h6>
                                            <p>Share some basic info, such as where it is and how many guests can stay.</p>
                                        </div>
                                    </div>
                                    <div className="usr-join-us-card">
                                        <div className="usr-join-us-card-serial-number">
                                            <h1>2</h1>
                                        </div>
                                        <div className="usr-join-us-card-body">
                                            <h6>Make it stand out</h6>
                                            <p>Add 5 or more photos plus a title and description – we’ll help you out.</p>
                                        </div>
                                    </div>
                                    <div className="usr-join-us-card">
                                        <div className="usr-join-us-card-serial-number">
                                            <h1>3</h1>
                                        </div>
                                        <div className="usr-join-us-card-body">
                                            <h6>Finish up and publish</h6>
                                            <p>Choose if you'd like to start with an experienced guest, set a starting price and
                                                publish your listing.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="horizontal-bar"></div>
            </section>

            <footer className="artist-footer-ar">
                <div className="col-md-12 p-2">
                    <div
                        className="get-started-div text-center"

                    >
                        {
                            request_id ? <CommonButton label="Get Started" onClick={() => navigate(`/become-a-artist/${request_id}/about-your-skills`)} />
                                :
                                <CommonButton label="Get Started" onClick={() => createNewRequest()} disabled={loading} />
                        }

                    </div>
                </div>
            </footer>
        </>
    )
}

export default GetStarted