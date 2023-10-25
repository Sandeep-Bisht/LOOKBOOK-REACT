import { width } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
import "styles/fifthForm.css";

const FifthForm = ({ formData, setFormData }) => {
  const [currentLocation, setCurrentLocation] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id:'google-map-script',
    googleMapsApiKey:"AIzaSyDiCaUv3ZKC-Zlo0Jjt3_AJ6Obs2vFc6w0",
  })

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
        setFormData({ lat: latitude, lng: longitude })
      });
    }
  }, []);
  console.log(currentLocation, "userLocation userLocation");

  const handleChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const mapStyles = {
    height: "250px",
    width: "100%",
    borderRadius: "15px"
  };

  const defaultCenter = {
    lat: 30, // You'll update this with your current location
    lng: 70, // You'll update this with your current location
  };

  return (
    <section className="fifthForm-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-12 form-heading">
            <h3>Where's your place located?</h3>
            <span>
              Your address is only shared with guests after they’ve made a
              reservation.
            </span>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-7 mx-auto">
                <div className="map-card">
                  {/* <LoadScript googleMapsApiKey="AIzaSyDiCaUv3ZKC-Zlo0Jjt3_AJ6Obs2vFc6w0"> */}
                  {isLoaded ? 
                    <GoogleMap
                      mapContainerStyle={mapStyles}
                      zoom={13}
                      center={currentLocation || defaultCenter}
                      options={{
                        zoomControl: false, // Disable the zoom control
                        mapTypeControl: false, // Disable the map type control
                        scaleControl: false, // Disable the scale control
                        streetViewControl: false, // Disable the street view control
                        fullscreenControl: false, // Disable the fullscreen control
                      }}
                    >
                      {currentLocation && <MarkerF position={currentLocation} />}
                    </GoogleMap>
                    : 
                    "Loading.."}
                  {/* </LoadScript> */}

                  <div className="card-field">
                    <input
                      className="form-control"
                      type="name"
                      placeholder="Enter your address"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FifthForm;
