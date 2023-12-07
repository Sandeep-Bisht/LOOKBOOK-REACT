import React, { useState, useEffect } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import "styles/fifthForm.css";

const FifthForm = ({ formData, setFormData }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [selectedMapAddress, setSelectedMapAddress] = useState(""); // new state variable

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDiCaUv3ZKC-Zlo0Jjt3_AJ6Obs2vFc6w0",
    libraries: ["places"],
  });
  

  const defaultCenter = currentLocation || { lat: 30, lng: 70 };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const latLng = { lat: latitude, lng: longitude };

          try {
            const results = await geocodeByAddress(`${latitude},${longitude}`);
            setAddress(results[0]?.formatted_address || "");
            setCurrentLocation(latLng);
            setFormData({ ...formData, lat: latitude, lng: longitude, address: results[0]?.formatted_address || "" });
          } catch (error) {
            console.error("Error reverse geocoding:", error);
          }
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    }
  }, []);

  const handleSelect = async (selectedAddress) => {
    setAddress(selectedAddress);
    setSelectedMapAddress(selectedAddress); // update selectedMapAddress

    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      setCurrentLocation(latLng);
      setFormData({ ...formData, lat: latLng.lat, lng: latLng.lng, address: selectedAddress });
    } catch (error) {
      console.error("Error selecting location:", error);
    }
  };

  const handleUseCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const latLng = { lat: latitude, lng: longitude };
  
          try {
            const results = await geocodeByAddress(`${latitude},${longitude}`);
            setAddress(results[0]?.formatted_address || "");
            setCurrentLocation(latLng);
            setFormData({ ...formData, lat: latitude, lng: longitude, address: results[0]?.formatted_address || "" });
          } catch (error) {
            console.error("Error reverse geocoding:", error);
          }
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    }
  };
  

  const mapStyles = {
    height: "250px",
    width: "100%",
    borderRadius: "15px",
  };



  return (
    <section className="fifthForm-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-12 form-heading">
            <h3>Where's your place located?</h3>
            <span>Your address is only shared with guests after they’ve made a reservation.</span>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-7 mx-auto">
                <div className="map-card">
                  <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                      <div>
                        <input
                          className="form-control"
                          {...getInputProps({
                            placeholder: "Enter your address",
                          })}
                        />
                        <div className="autocomplete-dropdown-container">
                          {loading && <div>Loading...</div>}
                          {suggestions.map((suggestion) => (
                            <div {...getSuggestionItemProps(suggestion, { style: { backgroundColor: suggestion.active ? "#41b6e6" : "#fff" } })}>
                              {suggestion.description}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>

                  {isLoaded ? (
                    <GoogleMap
                      mapContainerStyle={mapStyles}
                      zoom={13}
                      center={defaultCenter}
                      options={{
                        zoomControl: false,
                        mapTypeControl: false,
                        scaleControl: false,
                        streetViewControl: false,
                        fullscreenControl: false,
                      }}
                    >
                      {currentLocation && <Marker position={currentLocation} />}
                    </GoogleMap>
                  ) : (
                    "Loading.."
                  )}

                  <button className="btn btn-primary" onClick={handleUseCurrentLocation}>
                    Use Current Location
                  </button>
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
