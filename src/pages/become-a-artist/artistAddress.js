import React, { useState, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useNavigate } from "react-router-dom";
import ArtistFooter from "./artistFooter";
import {
  useJsApiLoader,
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import SearchLocation from "./common/searchLocation";
import LocationAwareMap from "./common/googlemap";


const ArtistAddress = () => {
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [yourLocation, setYourLocation] = useState(true);
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [visible, setVisible] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);
  const [coordsError, setCoordsError] = useState(false);




  console.log("this is my coordinates", coordinates)
  console.log("this is my address", address)


  useEffect(() => {
    // Fetch current location when the component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting current location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  }, []);

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  const handleConfirmLocation = () => {
    if (markerPosition && markerPosition.lat && markerPosition.lng) {
      setCoords(markerPosition);
      setVisible(false);
      setCoordsError(false);
    } else {
      setCoordsError(true);
    }
  };

  const selectSearch = (event) => {
    if (event.coords) {
      setMarkerPosition(event.coords);
    }
  };

  const handleButtonClick = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMarkerPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setError(null);
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setError("Allow access to location.");
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            setError("Location information is unavailable.");
          } else if (error.code === error.TIMEOUT) {
            setError("Request to get location timed out.");
          } else {
            setError("An unknown error occurred.");
          }
        }
      );
    } else {
      setError("Geolocation is not available in your browser");
    }
  };
  const handleMarkerDrag = (event) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setMarkerPosition({ lat, lng });
  };
  // const handleCurrentLocation = () => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     setCoordinates({
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude,
  //     });
  //   });
  // };

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const handleChange = (value) => {
    setAddress(value);
  };

  const mapStyles = {
    height: "250px",
    width: "100%",
    borderRadius: "15px",
  };

  const defaultCenter = {
    lat: 30, // You'll update this with your current location
    lng: 70, // You'll update this with your current location
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDiCaUv3ZKC-Zlo0Jjt3_AJ6Obs2vFc6w0", // Replace with your Google Maps API Key
  });

  return (
    <>
      <section>
      <div
          className=" search-location-popup"
          header="Select Location"
          visible={visible}
          maximizable
          style={{ width: "50vw" }}
          onHide={() => setVisible(false)}
        >
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="card flex justify-content-center h-100">
                <SearchLocation cb={selectSearch} className="w-100 h-100" />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card flex justify-content-center">
                <button
                  label="Use Current Location"
                  severity="secondary"
                  onClick={handleButtonClick}
                  className="common-location-btn form-input  btn "
                />
                <span class="ms-2 pop-icon">
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.2917 6.83333C8.45 6.83333 6.95833 8.325 6.95833 10.1667C6.95833 12.0083 8.45 13.5 10.2917 13.5C12.1333 13.5 13.625 12.0083 13.625 10.1667C13.625 8.325 12.1333 6.83333 10.2917 6.83333ZM17.7417 9.33333C17.3583 5.85833 14.6 3.1 11.125 2.71667V1.83333C11.125 1.375 10.75 1 10.2917 1C9.83333 1 9.45833 1.375 9.45833 1.83333V2.71667C5.98333 3.1 3.225 5.85833 2.84167 9.33333H1.95833C1.5 9.33333 1.125 9.70833 1.125 10.1667C1.125 10.625 1.5 11 1.95833 11H2.84167C3.225 14.475 5.98333 17.2333 9.45833 17.6167V18.5C9.45833 18.9583 9.83333 19.3333 10.2917 19.3333C10.75 19.3333 11.125 18.9583 11.125 18.5V17.6167C14.6 17.2333 17.3583 14.475 17.7417 11H18.625C19.0833 11 19.4583 10.625 19.4583 10.1667C19.4583 9.70833 19.0833 9.33333 18.625 9.33333H17.7417ZM10.2917 16C7.06667 16 4.45833 13.3917 4.45833 10.1667C4.45833 6.94167 7.06667 4.33333 10.2917 4.33333C13.5167 4.33333 16.125 6.94167 16.125 10.1667C16.125 13.3917 13.5167 16 10.2917 16Z"
                      fill="white"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
            <div className="col-md-12">
              <div className="card flex justify-content-center">
                <LocationAwareMap
                  coords={markerPosition}
                  onMarkerDragEnd={handleMarkerDrag} //function
                  markerDraggable={true}
                  markerTitle="Your location"
                  height="60vh"
                />
              </div>
            </div>
            {coordsError ? (
              <div className="col-md-12">
                <p className="text-danger">Select location first.</p>
              </div>
            ) : null}

            <div className="col-md-12 mt-lg-4">
              <div className="select-location-btn-wrapper">
                <div className="left">
                  <button
                    onClick={() => {
                      setVisible(false);
                    }}
                    label="Cancel"
                    className="common-location-btn form-input cancel "
                  />
                </div>
                <div className="right">
                  <button
                    label="Confirm"
                    onClick={() => handleConfirmLocation()}
                    className="common-location-btn form-input  "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ArtistFooter
        backClick={() => navigate("/become-a-artist/describe-yourself")}
        nextClick={() => navigate("/become-a-artist/insight-your-work")}
      />
    </>
    )
    };


export default ArtistAddress;
