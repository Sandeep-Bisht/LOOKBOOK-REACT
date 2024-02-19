import { ViewGallery } from 'mdi-material-ui';
import React, { useState } from 'react'
import { useLocation, useNavigate, useOutletContext, useParams, Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import LocationAwareMap from 'pages/become-a-artist/common/googlemap';
import NoDataFound from 'pages/become-a-artist/common/noDataFound';
import { toast } from 'react-toastify';
import { axiosAuth } from 'configs/axiosInstance';
import { IoArrowBackOutline } from "react-icons/io5";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: '',
    boxShadow: 24,
    p: 4,
};


const BASE_URL = process.env.REACT_APP_APIURL;

function SingleArtistInformation() {
    const [artistInformation] = useOutletContext();
    const { request_id } = useParams();

    const [openMapModal, setOpenMapModal] = React.useState(false);
    const [remark, setRemark] = useState(artistInformation?.remark ? artistInformation?.remark : '')
    const [invalid, setInvalid] = useState(false)
    const [updating, setUpdating] = useState(false)
    const handleOpen = () => setOpenMapModal(true);
    const handleClose = () => setOpenMapModal(false);

    const navigate = useNavigate()

    const certiFicatesHandler = () => {
        navigate(`/management/artists-request/${request_id}/certificates`)
    }

    const ViewGalleryHandler = () => {
        navigate(`/management/artists-request/${request_id}/gallery`)
    }

    const handleApprove = () => {
        setInvalid(false)
        handleUpdate({ request_id, remark, status: "approved" });
    }

    const handleChange = (e) => {
        if (invalid) {
            setInvalid(false)
        }
        setRemark(e.target.value);
    }

    const handleReject = () => {
        if (remark == '') {
            setInvalid(true)
        }
        else {
            setInvalid(false)
            handleUpdate({ request_id, remark, status: "rejected" });
        }
    }

    const handleUpdate = async (payload) => {
        setUpdating(true);
        try {
            const response = await axiosAuth.post(`${BASE_URL}/management/artist-request`, payload);
            if (response.statusText == "OK") {
                toast.success('Request updated Successfully!');
                navigate("/management/artists-request")
                setUpdating(false)
            }
        } catch (error) {
            setUpdating(false)
            toast.warn('Failed to update Status!');
            return error.message || "An error occured while trying to update services."
        }

    }


    return (<>
        {
            !artistInformation ?
                <NoDataFound />
                :
                <section>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'>
                                <div className='d-flex' style={{ justifyContent: "space-between" }}>
                                    <h2>Artist Request Details</h2>
                                    <Link to="/management/artists-request" className="btn" type='button' style={{ background: "#8c6a54", color: "#fff", width: "100px" }} ><IoArrowBackOutline style={{ marginRight: "10px" }} />
                                        Back</Link></div>
                            </div>
                            <div className='mt-4'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className='bg-white h-100 rounded-3 p-4'>
                                            <div className='row'>
                                                <div className='col-3'>
                                                    <span className="artists-detail-heading">Full Name</span>
                                                </div>
                                                <div className='col-9 text-end'>
                                                    <p className='ms-4 artists-detail-para'>{artistInformation?.profile?.fullName}</p>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-3'>
                                                    <span className="artists-detail-heading">Emai</span>
                                                </div>
                                                <div className='col-9 text-end'>
                                                    <p className='ms-4 artists-detail-para'>{artistInformation?.profile?.email}</p>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-3'>
                                                    <span className="artists-detail-heading">Mobile</span>
                                                </div>
                                                <div className='col-9 text-end'>
                                                    <p className='ms-4 artists-detail-para'>{artistInformation?.profile?.mobile}</p>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-3'>
                                                    <span className="artists-detail-heading">DOB</span>
                                                </div>
                                                <div className='col-9 text-end'>
                                                    <p className='ms-4 artists-detail-para'>{artistInformation?.profile?.dob}</p>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-3'>
                                                    <span className="artists-detail-heading">Experience</span>
                                                </div>
                                                <div className='col-9 text-end'>
                                                    <p className='ms-4 artists-detail-para'>{artistInformation?.experience} Years</p>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-3'>
                                                    <span className="artists-detail-heading">Education</span>
                                                </div>
                                                <div className='col-9 text-end'>
                                                    <p className='ms-4 artists-detail-para'>{artistInformation.education}</p>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-3'>
                                                    <span className="artists-detail-heading">Gender</span>
                                                </div>
                                                <div className='col-9 text-end'>
                                                    <p className='ms-4 artists-detail-para'>{artistInformation?.profile?.gender}</p>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-3'>
                                                    <span className="artists-detail-heading">Certificates</span>
                                                </div>
                                                <div className='col-9 text-end'>
                                                    <button className='btn ms-3' style={{ background: "#8c6a54", border: "none", color: "#fff", fontSize: "12px" }} onClick={() => certiFicatesHandler()}>View</button>
                                                </div>
                                            </div>
                                            <div className='row mt-2'>
                                                <div className='col-3'>
                                                    <span className="artists-detail-heading">Location</span>
                                                </div>
                                                <div className='col-9 text-end'>
                                                    <button className='btn ms-3' style={{ background: "#8c6a54", border: "none", color: "#fff", fontSize: "12px" }} onClick={handleOpen}>View</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className='rounded-3 bg-white h-100 p-4'>
                                            <div className='row'>
                                                <div className='col-3'>
                                                    <span className="artists-detail-heading">UserName</span>
                                                </div>
                                                <div className='col-9 text-end'>
                                                    <p className='ms-4 artists-detail-para'>{artistInformation?.userName}</p>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-3'>
                                                    <span className="artists-detail-heading">Language</span>
                                                </div>
                                                <div className='col-9 text-end'>
                                                    <p className='ms-4 artists-detail-para'>
                                                        {artistInformation?.languages && Array.isArray(artistInformation?.languages) ? artistInformation?.languages?.join(', ') : null}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-3'>
                                                    <span className="artists-detail-heading">Travel</span>
                                                </div>
                                                <div className='col-9 text-end'>
                                                    <p className='ms-4 artists-detail-para'>{artistInformation.travel ? "Yes" : "No"}</p>
                                                </div>
                                            </div>
                                            {
                                                artistInformation && Array.isArray(artistInformation.categories) && artistInformation.categories.length > 0 && (
                                                    <div className='row'>
                                                        <div className='col-3'>
                                                            <span className="artists-detail-heading">Categories</span>
                                                        </div>
                                                        <div className='col-9 text-end'>
                                                            <p className='ms-4 artists-detail-para'>
                                                                {artistInformation.categories.map((item, index) => (
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
                                                artistInformation && Array.isArray(artistInformation.products) && artistInformation.products.length > 0 && (
                                                    <div className='row'>
                                                        <div className='col-3'>
                                                            <span className="artists-detail-heading">Products</span>
                                                        </div>
                                                        <div className='col-9 text-end'>
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

                                            <div className='row'>
                                                <div className='col-3'>
                                                    <span className="artists-detail-heading">Price</span>
                                                </div>
                                                <div className='col-9 text-end'>
                                                    <p className='ms-4 artists-detail-para'>{artistInformation?.pricing?.price}</p>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-3'>
                                                    <span className="artists-detail-heading">Insta-Id</span>
                                                </div>
                                                <div className='col-9 text-end'>
                                                    <p className='ms-4 artists-detail-para'><a target='blank' href={`https://www.instagram.com/${artistInformation?.instagram}`} style={{ textDecoration: "none" }}>{artistInformation?.instagram}</a></p>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-3'>
                                                    <span className="artists-detail-heading">Gallery</span>
                                                </div>
                                                <div className='col-9 text-end'>
                                                    <button className='btn ms-3' style={{ background: "#8c6a54", border: "none", color: "#fff", fontSize: "12px" }} onClick={() => ViewGalleryHandler()}>View</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 mt-4'>
                                        <label className="artists-detail-heading">Description</label>
                                        <div>
                                            {artistInformation?.description}
                                        </div>
                                    </div>
                                </div>

                                <div className='row mt-4 text-center'>
                                    <div className='col-4'>
                                        <img src={artistInformation?.adharFront?.url} className="img-fluid" alt="adharFront" style={{ maxHeight: "200px", borderRadius: "20px" }} />
                                        <div>
                                            <span className="artists-detail-heading">
                                                Adhar Front
                                            </span>
                                        </div>
                                    </div>
                                    <div className='col-4'>
                                        <img src={artistInformation?.adharBack?.url} className="img-fluid" alt="adharBack" style={{ maxHeight: "200px", borderRadius: "20px" }} />
                                        <div>
                                            <span className="artists-detail-heading">
                                                Adhar Back
                                            </span>
                                        </div>
                                    </div>
                                    <div className='col-4'>
                                        <img src={artistInformation?.panCard?.url} className="img-fluid" alt="panCard" style={{ maxHeight: "200px", borderRadius: "20px" }} />
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
                                        value={remark}
                                        onChange={handleChange}
                                        className={`form-control ${invalid ? 'is-invalid' : ''}`}
                                    />
                                </div>
                                <div className='col-6 mt-4'>
                                    <div className='row'>
                                        <div className='col-3'>
                                            <button className="btn" type='button' style={{ background: "#8c6a54", color: "#fff" }} onClick={handleApprove} disabled={updating}>Approve</button>
                                        </div>
                                        <div className='col-2'>
                                            <button className="btn" type='button' style={{ background: "#8c6a54", color: "#fff" }} onClick={handleReject} disabled={updating}>Reject</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Modal
                            open={openMapModal}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>

                                <LocationAwareMap
                                    coords={artistInformation.coords} />
                            </Box>
                        </Modal>
                    </div>
                </section>
        }
    </>
    )
}

export default SingleArtistInformation