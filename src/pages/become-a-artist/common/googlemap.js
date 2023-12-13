import React, { useState, useEffect } from 'react';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
// import Loader from './loader';

const LocationAwareMap = ({height, styles,  coords, onMarkerDragEnd, markerDraggable, markerTitle}) => {

  const [location, setLocation] = useState(null);
  // Function to handle location change
  const handleLocationUpdate = (position) => {
    setLocation(position);
  };

  // Use the Geolocation API to get the user's current location
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(handleLocationUpdate,
        (error) => {
          console.error("Error getting location:", error);
        });
    } else {
        alert('Geolocation is not available in this browser.');
    }
  }, []);

  // Google Maps API key (replace with your own)
  

  // Map options
  const mapContainerStyle = {
    width: '100%',
    height: height ? height : '70vh',
  };


  return (
    <>
    {/* {isLoaded ? */}
    <GoogleMap
    mapContainerStyle={mapContainerStyle}
    center={coords == undefined ? location ? { lat: location.coords.latitude, lng: location.coords.longitude } : { lat: 30.3317463, lng: 78.0289588 } : coords}
    zoom={(location || coords) ? 13 : 12} // Adjust the zoom level as needed
    options={{
              streetViewControl:false,
              styles: styles == undefined ? [
              { 
                featureType: "poi",
                stylers: [
                  { "visibility": "off" }
                ]
              }
              ]
              :
              styles
            }}
  >
    
    {location  ?
      <>
      <MarkerF
          key={'currentLocation'}
          title={markerTitle == undefined ? "Your Location" : markerTitle}
          position={coords == undefined ? { lat: location.coords.latitude, lng: location.coords.longitude } : coords ? coords : { lat: location.coords.latitude, lng: location.coords.longitude }}
          onDragEnd={onMarkerDragEnd == undefined ? null : onMarkerDragEnd}
          draggable={markerDraggable == undefined ? false : markerDraggable}
        />
      
      </>
    :
    null
    }
  </GoogleMap>
   </>
  );
};

export default LocationAwareMap;
