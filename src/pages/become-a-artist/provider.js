import React from 'react'
import { Navigate, useLoaderData, useNavigate } from 'react-router-dom'
import BecomeAristHeader from './common/header';
import DefineSteps from './common/steps.json';
import "@css/artistRegistration.css";
import "@css/user/become-a-artist.css";

const ArtistRequestProvider = () => {

    const artistRequests = useLoaderData();
    const navigate = useNavigate();

    console.log("artistRequestsartistRequests artistRequests", artistRequests)

    console.log("openRequest openRequest", openRequest)

    if (!(artistRequests && Array.isArray(artistRequests))) {
        return (
            <Navigate to="/become-a-artist/get-started" replace={true} />
        )
    }

    var openRequest = artistRequests.find(item => item.status == "progress");

    if (!openRequest && artistRequests.length == 0) {
        return (
            <Navigate to="/become-a-artist/get-started" replace={true} />
        )
    }


    const getFormatteddate = (createdAt) => {

        if (!createdAt) {
            return null;
        }

        let options = { day: 'numeric', month: 'long', year: 'numeric' };
        let createdAtDate = new Date(createdAt);
        let formattedDate = createdAtDate.toLocaleDateString('en-US', options);
        return formattedDate;
    }

    const startPreviousRequest = () => {
        let currentStep = DefineSteps[openRequest.currentStep]
        return navigate(`/become-a-artist/${openRequest._id}${currentStep}`)
    }

    const createNewGetRequest = ()=>{
        navigate("/become-a-artist/get-started")
    }


    return (
        <>
            <BecomeAristHeader />
            <section className="artist-progress-component py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 mx-auto">
                            <div className="progress-component">
                                <h1 className="artist-inner-heading mb-lg-4">
                                    Welcome back
                                    {/* print name here */}
                                </h1>
                                <h2 className="artist-inner-subheading mb-lg-3">
                                    {openRequest ? 'Finish your artist request' : 'Artist request'}
                                </h2>
                                {openRequest ?
                                    <button className="progress-component-action-btn" type="button" onClick={() => startPreviousRequest()}>
                                        <span className="progress-component-action-btn-icon">
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                                                viewBox="0 0 512 512" height="200px" width="200px"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M208 448V320h96v128h97.6V256H464L256 64 48 256h62.4v192z"></path></svg>
                                        </span>
                                        <span className="progress-component-action-btn-title">
                                            Your request started on {getFormatteddate(openRequest.createdAt)}
                                        </span>
                                    </button>
                                    :
                                    null}

                                {
                                    artistRequests.map((item) => {
                                        if (item.status !== 'progress') {
                                            return (
                                                <div key={item.createdAt}>
                                                    <button className="progress-component-action-btn d-block mt-3" type="button">
                                                        <div className='d-flex'>
                                                            <span className="progress-component-action-btn-icon">
                                                                <svg
                                                                    stroke="currentColor"
                                                                    fill="currentColor"
                                                                    strokeWidth="0"
                                                                    viewBox="0 0 512 512"
                                                                    height="200px"
                                                                    width="200px"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path d="M208 448V320h96v128h97.6V256H464L256 64 48 256h62.4v192z"></path>
                                                                </svg>
                                                            </span>
                                                            <span className="progress-component-action-btn-title d-flex align-items-center">
                                                                Your request started on {getFormatteddate(item.createdAt)} and currently {item.status}.
                                                            </span>
                                                        </div>
                                                        {
                                                            item.remark &&      
                                                           <div className='d-flex mt-3'>
                                                            <span className='progress-component-action-btn-title me-2'>Remark : </span>
                                                            <span>{item.remark}</span>
                                                        </div>
                                                        }
                                                    </button>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })
                                }
                                { artistRequests.filter(item => item.status == 'pending' || item.status == 'progress').length === 0 ?
                                                <div  onClick={()=>createNewGetRequest()}>
                                                    <h2 className="artist-inner-subheading mb-lg-3 mt-lg-5">
                                                        Start a new request
                                                    </h2>
                                                    <button className="progress-component-action-btn" type="button">
                                                        <span className="progress-component-action-btn-icon">
                                                            <svg
                                                                stroke="currentColor"
                                                                fill="currentColor"
                                                                strokeWidth="0"
                                                                viewBox="0 0 512 512"
                                                                height="200px"
                                                                width="200px"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path d="M208 448V320h96v128h97.6V256H464L256 64 48 256h62.4v192z"></path>
                                                            </svg>
                                                        </span>
                                                        <span type="button" className="progress-component-action-btn-title">
                                                            Create a new request
                                                        </span>
                                                    </button>
                                                </div>
                                                :
                                                null
                                }


                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )


}

export default ArtistRequestProvider