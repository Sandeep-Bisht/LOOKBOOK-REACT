import React, { useState } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'

function SingleArtistInformation() {
    const location = useLocation();
    const [artistInformation, setArtistInformation] = useState(location?.state)

    const navigate = useNavigate()

    const certiFicatesHandler = (certificates)=>{
        navigate("/management/artists/658281125dc82e4c5e6ebe88/certificates",{state : certificates || []})
    }

    return (
        <section>
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <h2>Artist Request Details</h2>
                    </div>
                    <div className='mt-4'>
                        <div className='row'>
                            <div className='col-6'>
                                <div className='d-flex row'>
                                    <div className='col-3'>
                                    <span className="artists-detail-heading">Full Name</span>
                                    </div>
                                    <div className='col-9'>
                                    <p className='ms-4 artists-detail-para'>{artistInformation.fullname}</p>
                                    </div>
                                </div>
                                <div className='d-flex row'>
                                    <div className='col-3'>
                                    <span className="artists-detail-heading">Emai</span>
                                    </div>
                                    <div className='col-9'>
                                    <p className='ms-4 artists-detail-para'>{artistInformation.email}</p>
                                    </div>
                                </div>
                                <div className='d-flex row'>
                                    <div className='col-3'>
                                    <span className="artists-detail-heading">Mobile</span>
                                    </div>
                                    <div className='col-9'>
                                    <p className='ms-4 artists-detail-para'>{artistInformation.mobile}</p>
                                    </div>
                                </div>
                                <div className='d-flex row'>
                                    <div className='col-3'>
                                    <span className="artists-detail-heading">DOB</span>
                                    </div>
                                    <div className='col-9'>
                                    <p className='ms-4 artists-detail-para'>{artistInformation.dob}</p>
                                    </div>
                                </div>
                                <div className='d-flex row'>
                                    <div className='col-3'>
                                    <span className="artists-detail-heading">Experience</span>
                                    </div>
                                    <div className='col-9'>
                                    <p className='ms-4 artists-detail-para'>{artistInformation.experience}</p>
                                    </div>
                                </div>
                                <div className='d-flex row'>
                                    <div className='col-3'>
                                    <span className="artists-detail-heading">Education</span>
                                    </div>
                                    <div className='col-9'>
                                    <p className='ms-4 artists-detail-para'>{artistInformation.education}</p>
                                    </div>
                                </div>
                                <div className='d-flex row'>
                                    <div className='col-3'>
                                    <span className="artists-detail-heading">Gender</span>
                                    </div>
                                    <div className='col-9'>
                                    <p className='ms-4 artists-detail-para'>{artistInformation.gender}</p>
                                    </div>
                                </div>
                                <div className='d-flex row'>
                                    <div className='col-3'>
                                    <span className="artists-detail-heading">Certificates</span>
                                    </div>
                                    <div className='col-9'>
                                    <button className='btn ms-3' style={{ background: "#8c6a54", border: "none", color: "#fff", fontSize: "12px" }} onClick={()=>certiFicatesHandler(artistInformation.certificates)}>View</button>
                                    </div>
                                </div>
                                <div className='d-flex row mt-2'>
                                    <div className='col-3'>  
                                  <span className="artists-detail-heading">Location</span>
                                  </div>
                                  <div className='col-9'>
                                    <button className='btn ms-3' style={{ background: "#8c6a54", border: "none", color: "#fff", fontSize: "12px" }}>View</button>
                                    </div>
                                </div>
                            </div>
                            <div className='col-6'>
                            <div className='d-flex row'>
                                    <div className='col-3'> 
                                    <span className="artists-detail-heading">Alias</span>
                                    </div>
                                    <div className='col-9'>
                                    <p className='ms-4 artists-detail-para'>{artistInformation.alias}</p>
                                    </div>
                                </div>
                                <div className='d-flex row'>
                                    <div className='col-3'> 
                                    <span className="artists-detail-heading">Language</span>
                                    </div>
                                    <div className='col-9'>
                                    <p className='ms-4 artists-detail-para'>
                                        {artistInformation.languages.map((item, index) => (
                                            <span key={item}>
                                                {index > 0 ? ', ' : ''}
                                                {item}
                                            </span>
                                        ))}
                                    </p>  
                                    </div>
                                  </div>
                                  <div className='d-flex row'>
                                    <div className='col-3'>
                                    <span className="artists-detail-heading">Travel</span>
                                    </div>
                                    <div className='col-9'>
                                    <p className='ms-4 artists-detail-para'>{artistInformation.travel || "no travel"}</p>
                                    </div>
                                </div>
                                {
                                    artistInformation && artistInformation.services.length > 0 && (
                                        <div className='d-flex row'>
                                        <div className='col-3'>
                                            <span className="artists-detail-heading">Services</span>
                                            </div>
                                            <div className='col-9'>
                                            <p className='ms-4 artists-detail-para'>
                                                {artistInformation.services.map((item, index) => (
                                                    <span key={item.title}>
                                                        {index > 0 ? ', ' : ''}
                                                        {item.title}
                                                    </span>
                                                ))}
                                            </p>
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    artistInformation && artistInformation.products.length > 0 && (
                                        <div className='d-flex row'>
                                        <div className='col-3'>
                                            <span className="artists-detail-heading">Products</span>
                                            </div>
                                            <div className='col-9'>
                                            <p className='ms-4 artists-detail-para'>
                                                {artistInformation.products.map((item, index) => (
                                                    <span key={item.title}>
                                                        {index > 0 ? ', ' : ''}
                                                        {item.title}
                                                    </span>
                                                ))}
                                            </p>
                                            </div>
                                        </div>
                                    )
                                }

                                        <div className='d-flex row'>
                                        <div className='col-3'>
                                    <span className="artists-detail-heading">Price</span>
                                    </div>
                                    <div className='col-3'>
                                    <p className='ms-4 artists-detail-para'>{artistInformation.pricing.price}</p>
                                    </div>
                                </div>
                                <div className='d-flex row'>
                                        <div className='col-3'>
                                    <span className="artists-detail-heading">Insta-Id</span>
                                    </div>
                                    <div className='col-9'>
                                    <p className='ms-4 artists-detail-para'><a target='blank' href={`https://www.instagram.com/${artistInformation.instaId}`} style={{textDecoration:"none"}}>{artistInformation.instaId}</a></p>
                                    </div>
                                </div>
                                <div className='d-flex row'>
                                        <div className='col-3'>
                                    <span className="artists-detail-heading">Gallery</span>
                                    </div>
                                    <div className='col-9'>
                                    <button className='btn ms-3' style={{ background: "#8c6a54", border: "none", color: "#fff", fontSize: "12px" }}>View</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 mt-4'>
                            <label className="artists-detail-heading">Description</label>
                            <div>
                                {artistInformation.description}
                            </div>
                        </div>
                        <div className='row mt-4 text-center'>
                            <div className='col-4'>
                                <img src={artistInformation.adharFront.thumbnailUrl} className="img-fluid" alt="adharFront" style={{ maxHeight: "200px" }} />
                                <div>
                                    <span className="artists-detail-heading">
                                        Adhar Front
                                    </span>
                                </div>
                            </div>
                            <div className='col-4'>
                                <img src={artistInformation.adharBack.thumbnailUrl} className="img-fluid" alt="adharBack" style={{ maxHeight: "200px" }} />
                                <div>
                                    <span className="artists-detail-heading">
                                        Adhar Back
                                    </span>
                                </div>
                            </div>
                            <div className='col-4'>
                                <img src={artistInformation.panCard.thumbnailUrl} className="img-fluid" alt="panCard" style={{ maxHeight: "200px" }} />
                                <div>
                                    <span className="artists-detail-heading">
                                        Pancard
                                    </span>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className='col-12 mt-4 '>
                            <label>Remark</label>
                            <textarea type='text'
                                className='form-control'
                            />
                        </div>
                        <div className='col-6 mt-4'>
                            <div className='row'>
                                <div className='col-3'>
                                    <button className="btn" type='button' style={{ background: "#8c6a54", color: "#fff" }}>Approve</button>
                                </div>
                                <div className='col-2'>
                                    <button className="btn" type='button' style={{ background: "#8c6a54", color: "#fff" }}>Reject</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SingleArtistInformation