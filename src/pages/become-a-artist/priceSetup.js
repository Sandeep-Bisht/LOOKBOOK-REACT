
import React, { useState, useRef, useEffect } from 'react';

import { useNavigate, useParams } from "react-router-dom";
import ArtistFooter from "./artistFooter";

const PriceSetup = () => {
  const initialPrice = "100"; // Set your initial price here
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrice, setEditedPrice] = useState(initialPrice);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditedPrice(e.target.value);
  };

  const getEditedPrice = () => {
    return editedPrice;
  };
    let navigate = useNavigate()
    const { request_id } = useParams();
  return (
    <>
      <section className="about">
        <div className="container">
          <div className="row mb-3">
            <div className="col-lg-8 mx-auto">
              <h1 className="text-center">Now, set your per-session price</h1>
               <h6 className='text-center'>You can change it anytime</h6>
            </div>
            <div>
      {isEditing ? (
        <input
          type="text"
          value={editedPrice}
          onChange={handleChange}
          onBlur={handleBlur}
          ref={inputRef}
        />
      ) : (
        <span>{editedPrice}</span>
      )}
      {!isEditing && (
        <button onClick={handleEditClick}>Edit</button>
      )}
    </div>
          </div>
        </div>
      </section>

      
      <ArtistFooter
        backClick={() => navigate(`/become-a-artist/${request_id}/finish-setup`)}
        nextClick={() => navigate(`/become-a-artist/${request_id}/complete-kyc`)}
      />
    </>
  );
};

export default PriceSetup;
