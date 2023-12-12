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

const ArtistAddress = () => {
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

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
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="">
                <h1 className="text-center">Where is your place located?</h1>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-7 mx-auto">
                  <div className="map-card-wrapper">
                  <div className="card-field">
                    <PlacesAutocomplete
                      value={address}
                      onChange={handleChange}
                      onSelect={handleSelect}
                    >
                      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                        <div>
                          <input
                            {...getInputProps({
                              placeholder: "Enter your address",
                              className: "form-control",
                            })}
                          />
                          <div className="autocomplete-dropdown-container" >
                            {suggestions.map((suggestion) => (
                              <div
                                key={suggestion.placeId}
                                {...getSuggestionItemProps(suggestion)}
                              >
                                {suggestion.description}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
                  </div>
                  <div className="map-card">
                    {isLoaded ? (
                     <GoogleMap
                     mapContainerStyle={mapStyles}
                     zoom={13}
                     center={currentLocation || defaultCenter}
                     options={{
                       zoomControl: false, // Enable the zoom control
                       mapTypeControl: false, // Enable the map type control
                       scaleControl: false, // Enable the scale control
                       streetViewControl: false, // Enable the street view control
                       fullscreenControl: false, // Enable the fullscreen control
                       clickableIcons: false, // Enable clickable icons (e.g., to select location from marker)
                     }}
                   >
                     {currentLocation && (
                       <Marker
                         position={currentLocation}
                         draggable={true} // Allow marker to be dragged
                         onDragEnd={(e) => {
                           setCoordinates({
                             lat: e.latLng.lat(),
                             lng: e.latLng.lng(),
                           });
                         }}
                       />
                     )}
                   </GoogleMap>
                   
                    ) : (
                      "Loading.."
                    )}
                  </div>

                  <div className="text-center mt-3">
                    <span>Are you availabe for travelling to diffrent location ?</span>
                  </div>
                  </div>
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
  );
};

export default ArtistAddress;
