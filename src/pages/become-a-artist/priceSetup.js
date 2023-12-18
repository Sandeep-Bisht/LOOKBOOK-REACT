
import React, { useState, useRef, useEffect } from 'react';
import CurrencyInput from 'react-currency-input-field';

import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ArtistFooter from "./artistFooter";
import { axiosAuth } from 'configs/axiosInstance';

const BASE_URL = process.env.REACT_APP_APIURL

const PriceSetup = () => {
    
  const [artistPayload, setArtistPayload] = useOutletContext();
    let navigate = useNavigate()
    const { request_id } = useParams();
    const minPrice = 5000;
    const gstPerc = 18;
    const serviceChargePer = 5;
    const [price,setPrice] = useState(artistPayload.pricing ? artistPayload.pricing.price : minPrice)
    var totalPrice = price > 0 ? (price + ((gstPerc * price) / 100) +  ((serviceChargePer * price) / 100)) : 0
    totalPrice = totalPrice.toFixed(2)

    const handleNext = async() =>{
      let payload = {
        currentStep:12,pricing:{price,totalPrice}
      }
  
      if(artistPayload?.currentStep > 11){
        delete payload.currentStep;
      }

      if(artistPayload.pricing && artistPayload.pricing.price == price){
        return navigate(`/become-a-artist/${request_id}/complete-kyc`)
      }
      else{
        try{
          await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`,payload);
          setArtistPayload((prev) => {return {...prev,...payload}})
          navigate(`/become-a-artist/${request_id}/complete-kyc`)
        }
        catch(error){
          throw error;
        }
      } 
    }
    

  return (
    <>
      <section className="about h-75">
        <div className="container h-100">
          <div className="row mb-3 h-100">
            <div className="col-lg-8 mx-auto">
              <h1 className="text-center">Now, set your per-session price</h1>
               <h6 className='text-center'>You can change it anytime</h6>
            </div>
          <div className='price-wrapper'>
            <CurrencyInput
              id="price"
              name="price"
              className='w-100'
              placeholder="set your per-session price"
              allowDecimals={false}
              prefix="₹" 
              allowNegativeValue={false}
              value={price}
              maxLength={5}
              intlConfig={{ locale: 'en-IN', currency: 'INR' }}
              autoComplete="off"
              onValueChange={(value) => {
                if(!value ){
                  return setPrice(0)
                }

                setPrice(Number(value))}}
            />
            
            <p className='text-center'> Total Price after tax <b>
              <CurrencyInput
              className='total-price'
              prefix="₹" 
              value={totalPrice}
              intlConfig={{ locale: 'en-IN', currency: 'INR' }}
              disabled={true}
            />
            </b>
            </p>
            </div>
          </div>
        </div>
      </section>

      
      <ArtistFooter
        backClick={() => navigate(`/become-a-artist/${request_id}/finish-setup`)}
        nextClick={() => handleNext()}
      />
    </>
  );
};

export default PriceSetup;
