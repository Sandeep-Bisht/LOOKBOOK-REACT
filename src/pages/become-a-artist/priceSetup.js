
import React, { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ArtistFooter from "./common/artistFooter";
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

    var totalPriceWithServiceChargePer = price > 0 ?  Number(((price * serviceChargePer) / 100).toFixed()) + price : 0
    var totalPrice = totalPriceWithServiceChargePer > 0 ? Number(((totalPriceWithServiceChargePer * gstPerc) / 100).toFixed()) + totalPriceWithServiceChargePer : 0;

    var pricing = {
      price:price > 0 ? price : 0,
      gstAmount: Number(((totalPriceWithServiceChargePer * gstPerc) / 100).toFixed()),
      platformFee: Number(((price * serviceChargePer) / 100).toFixed()),
      totalPrice: totalPrice,
      sessionTime:3
    }

    const handleNext = async() =>{
      let payload = {
        currentStep:12,pricing
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
      <section className="price-ar">
        <div className="container">
          <div className="price-ar-heading">
            <h4 className="text-center">Now, set your per-session price</h4>
            <p className='text-center'>You can change it anytime</p>
          </div>
          <div className="row mb-3 price-ar-wrapper">
            <div className='price-wrapper'>
              <div className="price-ar-current">
                <label>Set your price</label>
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
                  if (!value) {
                    return setPrice(0)
                  }

                  setPrice(Number(value))
                }}
              />
              </div>

              <div className='price-ar-total-tax'>
              <p> Total Price after tax </p>
                <CurrencyInput
                  className='total-price'
                  prefix="₹"
                  value={totalPrice}
                  intlConfig={{ locale: 'en-IN', currency: 'INR' }}
                  disabled={true}
                />
                <p>* Pricing to be displayed on the portal</p>
              </div>
            </div>
          </div>
        </div>
        <div className='horizontal-bar'></div>
      </section>

      
      <ArtistFooter
        backClick={() => navigate(`/become-a-artist/${request_id}/finish-setup`)}
        nextClick={() => handleNext()}
      />
    </>
  );
};

export default PriceSetup;
