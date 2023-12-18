import React from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

const Review = () => {
    
  const [artistPayload, setArtistPayload] = useOutletContext();
  let navigate = useNavigate()
  const { request_id } = useParams();

  return (
    <div>Review</div>
  )
}

export default Review