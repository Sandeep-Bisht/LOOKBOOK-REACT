import React, { useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaLocationArrow } from "react-icons/fa6";

const SearchLocation = ({cb, className, setAttemptedNextWithoutSelection}) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);


    const handleOnClick = () => {
      setAttemptedNextWithoutSelection(false)
    }

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setQuery(inputValue);
        
        
    
        // Use Google Places Autocomplete API to fetch suggestions
        const autoCompleteService = new window.google.maps.places.AutocompleteService();
        autoCompleteService.getPlacePredictions(
          { input: inputValue,
            componentRestrictions: { country: 'IN' }, },
          (predictions, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              setSuggestions(predictions);
            }
          }
        );
    };

    
  const handlePlaceSelect = (place) => {
    // Get the place details using the Place Details service
    const placeService = new window.google.maps.places.PlacesService(document.createElement('div'));
    placeService.getDetails(
      { placeId: place.place_id },
      (result, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setQuery('');
          cb({coords: { lat: result.geometry.location.lat(), lng: result.geometry.location.lng() }, result})
        }
      }
    );
  };

  
  const handleButtonClick = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          cb({coords: { lat: position.coords.latitude, lng: position.coords.longitude }})
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            alert('Location permission blocked. Please allow access to your location to use this feature.');
            console.error("Allow access to location.");
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            console.error("Location information is unavailable.");
          } else if (error.code === error.TIMEOUT) {
            console.error("Request to get location timed out.");
          } else {
            console.error("An unknown error occurred.");
          }
        }
      );
    } else {
      console.error("Geolocation is not available in your browser");
    }
  };

  return (
    <div className={`search-container-head ${className ? className : ''}`}>
      <div 
      
      className="input-group search-bar-wrapper"
      >
        <span className="input-group-text location-icon" id="global-search"><FaLocationDot/></span>
        <input type='search'
         value={query}
         onChange={handleInputChange}
         onClick={handleOnClick}
         className='form-control'
         id="globalSearch" 
         autoComplete='off'
         placeholder='Search for cities, places...' 
         aria-label='Search for cities, places...' 
         aria-describedby="global-search"/>

        
         {query !== '' && query  && query.length > 1 ?  
         <ul className='suggestionList'>
         
         {suggestions.map((suggestion) => {
 
             let suggetionData = []
 
             if(suggestion.description.includes(',')){
                 suggetionData = suggestion.description.split(',', 2);
             }
 
         return <>
         {suggetionData.length == 2
         ? 
 
          (
             <li key={suggestion.place_id} onClick={() => handlePlaceSelect(suggestion)} className='suggestion-item'>
                <p className='suggestion-heading'>{suggetionData[0]}</p>
                <p className='suggestion-desc'>{suggetionData[1]}</p>
           </li>
         )
         :
          (<li key={suggestion.place_id} onClick={() => handlePlaceSelect(suggestion)} className='suggestion-item'>
            <p className='suggestion-heading'>{suggestion.description}</p>
             
         </li>)
         }
         </>
         }
         )}

         </ul>
         :
         <button className='use-current-location btn text-start' type='button' onClick={()=>handleButtonClick()}>
        <FaLocationArrow className='me-3'/> Use my current location
        </button>
         }
      </div>
    </div>
  )
}

export default SearchLocation