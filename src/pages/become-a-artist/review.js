import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import CardImg from '@core/assets/images/skill-pic.png'
import { FaCalendarCheck, FaCalendar  } from "react-icons/fa";
import { HiMiniPencil } from "react-icons/hi2";
import ArtistFooter from './common/artistFooter';
import { axiosAuth } from 'configs/axiosInstance';
import { toast } from 'react-toastify';

const BASE_URL = process.env.REACT_APP_APIURL;

const Review = () => {
    
  let navigate = useNavigate()
  const { request_id } = useParams();

  const handleNextClick = async() =>{
    try{
        await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`,{status:'pending'});
        navigate(`/become-a-artist/publish-celebration`)
    }
    catch(error){
        toast.warn(error?.response?.data?.message || 'Unable to submit your request for review.');
    }
  }

  return (
    <>
    <div className='about'>
      <div className='container d-flex justify-content-center'>
        <div className='col-8'>
        <div className='p-3'>
          <h2>Review your request</h2>
          <p>Here's what we'll show to users. Make sure everything looks good.</p>
        </div>
        <div className='row g-5'>
          <div className='col-5 d-flex align-items-center'>
              <div className='review-card card p-3'>
                <img src={CardImg} alt="review card" className='img-fluid'/>
              </div>
          </div>
          <div className='col-7 d-flex justify-content-center flex-column'>
            <h3>What's next</h3>
            <div className='d-flex mt-3'>
                <FaCalendarCheck className='fs-1 me-3'/>
                <div>
                  <h4>Confirm a few details and publish</h4>
                  <p>We’ll let you know if you need to verify your identity or register with the local government.</p>
                </div>
            </div>
            <div className='d-flex mt-3'>
                <FaCalendar  className='fs-1 me-3'/>
                <div>
                  <h4>Set up your calendar</h4>
                  <p>Choose which dates your services is available. It will be visible 24 hours after you publish.</p>
                </div>
            </div>
            <div className='d-flex mt-3'>
                <HiMiniPencil   className='fs-1 me-3'/>
                <div>
                  <h4>Adjust your settings</h4>
                  <p>Set house rules, select a cancellation policy, choose how guests book and more.</p>
                </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    <ArtistFooter
        backClick={() => navigate(`/become-a-artist/${request_id}/personal-details`)}
        nextClick={() => handleNextClick()}
      />
    </>
  )
}

export default Review