import React, { useEffect, useState } from "react";
import ArtistFooter from "./common/artistFooter";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { axiosAuth } from "configs/axiosInstance";
import LocationAwareMap from "./common/googlemap";
import SearchLocation from "./common/searchLocation";
import Switch from '@mui/material/Switch';
import { Typography } from "@mui/material";

const BASE_URL = process.env.REACT_APP_APIURL


const label = { inputProps: { 'aria-label': 'Travel Switch' } };

const ArtistLocation = () => {
  const [artistPayload, setArtistPayload] = useOutletContext();
  const navigate = useNavigate();
  const { request_id } = useParams();
  
  const [markerPosition, setMarkerPosition] = useState(null);
  const [availability,setAvailability] = useState(null)
  const [attemptedNextWithoutSelection, setAttemptedNextWithoutSelection] = useState(false);

  const handleMarkerDrag = (event) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setMarkerPosition({ lat, lng });
  };

  
  const selectSearch = (event) => {
    if (event.coords) {
      setMarkerPosition(event.coords);
      
    }
  };

  
  useEffect(()=>{
    if(artistPayload){
      if(artistPayload.coords && artistPayload.coords?.lat && artistPayload.coords?.lng){
        setMarkerPosition(artistPayload.coords);
        setAvailability(artistPayload.travel)
      }
    }
  },[artistPayload])

const handleNextClick = async () =>{
  if(markerPosition){

    try{

      let payload = {currentStep:5,coords:markerPosition,travel:availability}

      if(artistPayload.currentStep > 4){
          delete payload.currentStep;
      }

        if(artistPayload.coords){
            if(artistPayload.coords.lat == markerPosition.lat && artistPayload.coords.lng == markerPosition.lng && artistPayload.travel == availability ){
                return navigate(`/become-a-artist/${request_id}/insight-your-work`)
            }
            else{
            await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`,payload);
            setArtistPayload((prev) => {return {...prev,...payload}})
            navigate(`/become-a-artist/${request_id}/insight-your-work`)
          }

        }else{
            await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`,payload);
            setArtistPayload((prev) => {return {...prev,...payload}})
            navigate(`/become-a-artist/${request_id}/insight-your-work`)
        }
    }
    catch(error){
        throw error;
    }
  } else{
    setAttemptedNextWithoutSelection(true);
  }
}

  return (
    <>
      <section className="about-skills-ar">
        <div className="container">
          <div className="row align-items-center justify-content-center" >
            <div className="col-lg-8">
            <h1 className="artist-inner-heading mb-lg-1 text-center">
                Where's your place located?
            </h1>
            <p className="text-center">Your address is only shared with the user after they’ve made a booking.</p>
            <div className="location-wrapper">
                
            <SearchLocation cb={selectSearch} setAttemptedNextWithoutSelection={setAttemptedNextWithoutSelection} className={`w-50 ${attemptedNextWithoutSelection ? 'search-box-error' : ''}`}/>
            <LocationAwareMap
                  coords={markerPosition}
                  onMarkerDragEnd={handleMarkerDrag} //function
                  markerDraggable={true}
                  markerTitle="Your location"
                  height="60vh"
                />
            </div>
            <div className="mt-3">
            <Switch {...label} onChange={(e)=>setAvailability(e.target.checked)} checked={availability ? true : false}/> 
            <Typography variant='label' sx={{ mb: 1, fontSize: '1rem !important' }} >
                Are you available to travel between two locations ?
            </Typography>
            </div>
            </div>
          </div>
        </div>
      </section>

      <ArtistFooter
        backClick={() => navigate(`/become-a-artist/${request_id}/describe-yourself`)}
        nextClick={() => handleNextClick()}
      />
    </>
  );
};

export default ArtistLocation;
