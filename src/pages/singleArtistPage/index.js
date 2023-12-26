import { ViewGallery } from 'mdi-material-ui';
import React, { useState } from 'react'
import { useLocation,useNavigate, useOutletContext, useParams } from 'react-router-dom'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import LocationAwareMap from 'pages/become-a-artist/common/googlemap';
import NoDataFound from 'pages/become-a-artist/common/noDataFound';
import { toast } from 'react-toastify';
import { axiosAuth } from 'configs/axiosInstance';

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
    const [getAllArtists] = useOutletContext();
    const { request_id } = useParams();
    const artistInformation = getAllArtists.find((item) => item._id == request_id);
    
    const [openMapModal, setOpenMapModal] = React.useState(false);
    const [remark,setRemark] = useState(artistInformation?.remark ? artistInformation?.remark : '')
    const [invalid,setInvalid] = useState(false)
    const [updating,setUpdating] = useState(false)
    const handleOpen = () => setOpenMapModal(true);
    const handleClose = () => setOpenMapModal(false);

    const navigate = useNavigate()

    const certiFicatesHandler = ()=>{
        navigate(`/management/artists-request/${request_id}/certificates`)
    }

    const ViewGalleryHandler = ()=>{
        navigate(`/management/artists-request/${request_id}/gallery`)
    }

    const handleApprove = () =>{
        setInvalid(false)
        handleUpdate({request_id,remark,status:"approved"});
    }

    const handleChange = (e) =>{
        if(invalid ){
            setInvalid(false)
        }
        setRemark(e.target.value);
    }

    const handleReject = () =>{
        if(remark == ''){
            setInvalid(true)
        }
        else{
            setInvalid(false)
            handleUpdate({request_id,remark,status:"rejected"});
        }
    }

    const handleUpdate = async(payload) =>{
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
            <NoDataFound/>
            :
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
                                    <p className='ms-4 artists-detail-para'>{artistInformation?.profile_id?.fullName}</p>
                                    </div>
                                </div>
                                <div className='d-flex row'>
                                    <div className='col-3'>
                                    <span className="artists-detail-heading">Emai</span>
                                    </div>
                                    <div className='col-9'>
                                    <p className='ms-4 artists-detail-para'>{artistInformation?.profile_id?.email}</p>
                                    </div>
                                </div>
                                <div className='d-flex row'>
                                    <div className='col-3'>
                                    <span className="artists-detail-heading">Mobile</span>
                                    </div>
                                    <div className='col-9'>
                                    <p className='ms-4 artists-detail-para'>{artistInformation?.profile_id?.mobile}</p>
                                    </div>
                                </div>
                                <div className='d-flex row'>
                                    <div className='col-3'>
                                    <span className="artists-detail-heading">DOB</span>
                                    </div>
                                    <div className='col-9'>
                                    <p className='ms-4 artists-detail-para'>{artistInformation?.profile_id?.dob}</p>
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
                                    <p className='ms-4 artists-detail-para'>{artistInformation?.profile_id?.gender}</p>
                                    </div>
                                </div>
                                <div className='d-flex row'>
                                    <div className='col-3'>
                                    <span className="artists-detail-heading">Certificates</span>
                                    </div>
                                    <div className='col-9'>
                                    <button className='btn ms-3' style={{ background: "#8c6a54", border: "none", color: "#fff", fontSize: "12px" }} onClick={()=>certiFicatesHandler()}>View</button>
                                    </div>
                                </div>
                                <div className='d-flex row mt-2'>
                                    <div className='col-3'>  
                                  <span className="artists-detail-heading">Location</span>
                                  </div>
                                  <div className='col-9'>
                                    <button className='btn ms-3' style={{ background: "#8c6a54", border: "none", color: "#fff", fontSize: "12px" }}  onClick={handleOpen}>View</button>
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
                                        {artistInformation.languages.join(', ')}
                                    </p>  
                                    </div>
                                  </div>
                                  <div className='d-flex row'>
                                    <div className='col-3'>
                                    <span className="artists-detail-heading">Travel</span>
                                    </div>
                                    <div className='col-9'>
                                    <p className='ms-4 artists-detail-para'>{artistInformation.travel ? "Yes": "No"}</p>
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
                                    <p className='ms-4 artists-detail-para'><a target='blank' href={`https://www.instagram.com/${artistInformation?.profile_id?.instaId}`} style={{textDecoration:"none"}}>{artistInformation?.profile_id?.instaId}</a></p>
                                    </div>
                                </div>
                                <div className='d-flex row'>
                                        <div className='col-3'>
                                    <span className="artists-detail-heading">Gallery</span>
                                    </div>
                                    <div className='col-9'>
                                    <button className='btn ms-3' style={{ background: "#8c6a54", border: "none", color: "#fff", fontSize: "12px" }} onClick={()=>ViewGalleryHandler()}>View</button>
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
                  coords={artistInformation.coords}/>
        </Box>
      </Modal>
    </div>
        </section>
        }
        </>
    )
}

export default SingleArtistInformation