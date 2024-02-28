import React, { useEffect, useRef, useState } from 'react'
import "@css/user/cart.css"
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { CiUser } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import NoDataFound from 'pages/become-a-artist/common/noDataFound';
import { formatIndianRupee } from 'configs/formatIndianRupee';
import LocationAwareMap from 'pages/become-a-artist/common/googlemap';
import { useForm } from 'react-hook-form';
import { axiosAuth } from 'configs/axiosInstance';
import { toast } from 'react-toastify';
import SearchLocation from 'pages/become-a-artist/common/searchLocation';
import { axiosLocal } from 'configs/axiosInstance';

const BASE_URL = process.env.REACT_APP_APIURL

function Cart() {
  
  const [markerPosition, setMarkerPosition] = useState(null);
  const {register, handleSubmit, reset, formState: { errors }, setValue} = useForm();
  const [userAddress,setUserAddress] = useState({})
  const [formError,setFormError] = useState({})
  const [orderId,setOrderId] = useState("");
  const navigate = useNavigate();
  const ModalConfirmBtn = useRef();
  const ModalAddAddressBtn = useRef();
  // Function to handle location change
  const handleLocationUpdate = (position) => {
    setMarkerPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
  };

  const getAddressByCords = async(position) =>{
    const FindAddress = await axiosLocal.get( `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat},${position.lng}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`);
    
    if (FindAddress.data.status === 'OK') {
      const addressResult = FindAddress.data.results;
      if (addressResult.length > 0) {
         const addressComponents = addressResult[0].address_components;

         let city, state, country, postalCode;

         for (const component of addressComponents) {
             if (component.types.includes('locality')) {
               city = component.long_name;
             } else if (component.types.includes('administrative_area_level_1')) {
               state = component.long_name;
             } else if (component.types.includes('country')) {
               country = component.long_name;
             } else if (component.types.includes('postal_code')) {
               postalCode = component.long_name;
             }
         }

         setFormError(prev => ({...prev,city:null, state:null, country:null, postalCode:null}))
         setUserAddress(prev => ({...prev,city, state, country, postalCode}))

     }
     else{
        setFormError(prev => ({...prev,city:null, state:null, country:null, postalCode:null}))
        setUserAddress(prev => ({...prev,city:null, state:null, country:null, postalCode:null}));
     }
 }
 else{
  setFormError(prev => ({...prev,city:null, state:null, country:null, postalCode:null}))
  setUserAddress(prev => ({...prev,city:null, state:null, country:null, postalCode:null}));
 }

  }

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

  useEffect(()=>{
    if(markerPosition && markerPosition.lat && markerPosition.lng){
      getAddressByCords(markerPosition);
    }

  },[markerPosition])

  const {cartData:UserCartData, addresses} = useLoaderData();

  const [CartData,setCartData] = useState(UserCartData ? UserCartData : [])
  const [allAddresses,setAllAddresses] = useState(addresses ? addresses : []);

  if(!CartData || !Array.isArray(CartData) || !CartData.length > 0){
      return <NoDataFound/>
  }
  
  const dateOption = { day: '2-digit', month: 'short'};
  var totalPrice = 0;
  
    for(let i =0; i < CartData.length; i++){
  
     totalPrice += (CartData[i]?.service?.pricing?.totalPrice * CartData[i]?.sessions);
    }
      
  const selectSearch = (event) => {
    if (event.coords) {
      setMarkerPosition(event.coords);
    }
  };

    const handleMarkerDrag = (event) => {
      const { latLng } = event;
      const lat = latLng.lat();
      const lng = latLng.lng();
      setMarkerPosition({ lat, lng });
    };

    const initiatePayment = (data) => {
		
      const options = {
        key: process.env.REACT_APP_RAZORPAY_API_KEY,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Lookbook",
        cartItems: data.payment.cart,
        description: `Payment request.`,
        image: "http://dev.mylookbook.in/static/media/main-logo.b263cc361eef6bc1e419.png",
        order_id: data.order.id,
        handler: async (response) => {
          try {
            // setSubmitting(true)
            const apiResponse = await axiosAuth.post(`${BASE_URL}/checkout/verify-payment`, response)
            if (apiResponse.statusText == "OK") {
              // setModalData({...apiResponse?.data?.data, amount : data.order.amount / 100})
              // modalBtn.current.click()
              setOrderId(apiResponse?.data?.orderId)
              if(ModalConfirmBtn.current){
                ModalConfirmBtn.current.click();
              }

              reset();
              toast.success('Payment Successfully!');
            }else{
              toast.warn('Spmething went wrong!');
            }
          }
          catch (error) {
            toast.warn('Payment Failed!');
          }
        },
        notes: {
          cart: data.payment.cart,
        },
        theme: {
          color: "#FCF7F2",
        },
      };
  
      const rzp1 = new window.Razorpay(options);
  
      rzp1.on('payment.failed', async function (response){
        try {
        await axiosAuth.post(`${BASE_URL}/checkout/payment-failed`, response.error)
        }
        catch (error) {
         console.log("error in payment fail api.")
        }
      });
  
      rzp1.open();
    };

    const checkout = async() =>{
  
      try {
        const response = await axiosAuth.get(`${BASE_URL}/checkout/create-order`)
        if (response.statusText == "OK") {
          initiatePayment(response.data)
          toast.success('Payment called!');
        }
      }
      catch (error) {
        console.log(error.message, 'error is this')
        toast.warn('Failed to call payment!');
        // setSubmitting(false);
      }
    }

    const confirmPayment = (data) =>{
      const keys = Object.keys(userAddress);
      
      for (let i = 0; i < keys.length; i++) {
        const item = keys[i];
        if (!userAddress[item] || userAddress[item] == '') {
          setFormError(prev => ({...prev, [item]: "This field is required."}));
          return; // Stop execution of the function
        }
      }

      const formData = {...data,...userAddress};

      checkout();
      console.log(formData,'data is this')
    }

    const handleCartDelete = async(cartId) =>{
      try{
          const response = await axiosAuth.post(`${BASE_URL}/cart/delete-cart-item`,{cartId});
          setCartData(response.data);
          return toast.success('Item removed successfully!');
      }
      catch(error){
        return toast.warning('Unable to remove item!');
      }
    }
    
    const formHandlerChange = (e)=>{
      let {name, value} = e.target;
      if(name === 'postalCode'){
        value = value.replace(/\D/g, '');
        value = value.slice(0, 6); // Limit to maximum 6 digits
      }
      setFormError(prev => ({...prev,[name] : value && value !== '' ? '' : 'This field is required.'}))
      setUserAddress(prev => ({...prev,[name]: value}))
    }

    const handleConfirmLocation = () =>{
      if(markerPosition && markerPosition.lat && markerPosition.lng){
        if(ModalAddAddressBtn.current){
          ModalAddAddressBtn.current.click();
        }
      }
      else{
        alert("Your location is not set yet. Please select your location first.")
      }

    }

    const handleFormInputChange = (e) =>{

      if(e.target.name === "mobile"){
        let phoneNumber = e.target.value.replace(/\D/g, '');
        phoneNumber = phoneNumber.slice(0, 10); // Limit to maximum 10 digits
        setValue('mobile', phoneNumber);
      }

    }

    const handleAddAddress = async(data) =>{

      if(!markerPosition || !markerPosition?.lat || !markerPosition?.lng){
        return alert("Your Location not found.");
      }

      const keys = Object.keys(userAddress);
      

      for (let i = 0; i < keys.length; i++) {
        const item = keys[i];
        if (!userAddress[item] || userAddress[item] == '') {
          setFormError(prev => ({...prev, [item]: "This field is required."}));
          return; // Stop execution of the function
        }
      }

      
      const sixDigitNumberRegex = /^\d{6}$/;

      if(!sixDigitNumberRegex.test(userAddress.postalCode)){
        setFormError(prev => ({...prev, postalCode: "Postal Code must be 6 digits."}));
        return; // Stop execution of the function
      }


      const formData = {...data,...userAddress,coords:markerPosition };

      try{
        const result = await axiosAuth.post('/users/add-address',formData);

        console.log(result,'result after the api called');
      }
      catch(error){
        console.log(error.message,'Error found while trying to add address.')
      }

    }


  return (
    <section className='user-cart-section'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='text-center'>
              <h1 className='user-all-booking-heading'>Cart</h1>
            </div>
            <div className='col-md-12 user-cart-table'>
            <Table className="text-center">
        <Thead>
        <Tr>
          <Th>Artist</Th>
          <Th>Date</Th>
          <Th>Session</Th>
          <Th>Timing</Th>
          <Th>Price</Th>
        </Tr>
      </Thead>
      <Tbody className="mt-4">
        {CartData.map((item,index)=>{
          return (
          <Tr className="user-responsive-table-row table-body-row">
            <Td className="text-capitalize table-items">
              <div className='d-flex align-items-center gap-2'>
                {item?.artist?.profile?.image?.thumbnailUrl ? <img src={item?.artist?.profile_id?.image?.thumbnailUrl} width="10"/> : <CiUser />}
                {item?.artist?.profile?.fullName ? item?.artist?.profile?.fullName : ''}
              </div>
            </Td>
            <Td className="text-capitalize table-items">
            {new Intl.DateTimeFormat('en-US', dateOption).format(new Date(item.date))}
            </Td>
            <Td className="text-capitalize table-items">{item?.sessions} Sessions</Td>
            <Td className="text-capitalize table-items">{item?.time.join(', ')}</Td>
            <Td className="text-capitalize table-items">
              <div className='d-flex justify-content-between'>
                <span>{item?.service?.title}</span>
                <span>
              {formatIndianRupee(item?.service?.pricing?.totalPrice * item?.sessions)}
              </span>
              </div>
            </Td>
            <Td className="text-capitalize">
              <button type='button' className='btn' onClick={()=>handleCartDelete(item?._id)}>
              <MdOutlineDelete/>
              </button>
              </Td>
          </Tr>
          )
        })}
        <Tr className="user-responsive-table-row table-footer-row">
        <Td  className="text-capitalize table-items">Grand Total</Td>
        <Td  className="text-capitalize table-items"></Td>
        <Td  className="text-capitalize table-items"></Td>
        <Td  className="text-capitalize table-items"></Td>
        <Td  className="text-capitalize table-items"><b>{formatIndianRupee(totalPrice)} /-</b></Td>
        </Tr>
      </Tbody>
    </Table>
            </div>
            <hr className='mt-5'/>
            <div className='d-flex gap-3 align-items-center justify-content-center mt-5'>
              <Link to="/services" className="usr-common-action-btn text-decoration-none">BOOK MORE</Link>
              <button type="button" className='usr-common-filled-btn' data-bs-toggle="modal" data-bs-target="#locationModalToggle">Proceed To Pay</button>
            </div>
          </div>
        </div>
      </div>

      <button ref={ModalAddAddressBtn} type="button" data-bs-toggle="modal" data-bs-target="#addAddressModalToggle" className="d-none"></button>
      <button ref={ModalConfirmBtn} type="button" data-bs-toggle="modal" data-bs-target="#exampleModalToggle3" className="d-none"></button>

        

      {/* location modal */}
      <div class="modal modal-lg fade usr-artist-single-modal" id="locationModalToggle" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="locationModalToggleLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body">
                <div className='modal-btn-wrapper justify-content-end d-flex'>
                <button type="button" class=" common-modal-dismiss-btn" data-bs-dismiss="modal" aria-label="Close">
                <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 15 15" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor"></path></svg>
                </button>
                </div>
               

                <h3 className='text-center mt-3 text-uppercase'>Confirm Your Location</h3>
                <hr className='mb-4'/>
              <div className='user-address-location-wrapper'>
                <SearchLocation cb={selectSearch} className="w-50" setAttemptedNextWithoutSelection={console.log} />
                <LocationAwareMap
                  coords={markerPosition}
                  onMarkerDragEnd={handleMarkerDrag} //function
                  markerDraggable={true}
                  markerTitle="Your location"
                  height="50vh"
                />
              </div>
              <hr className='mb-4'/>
              <div className='d-flex justify-content-center'>
                <button type='button' className='usr-common-filled-btn' onClick={handleConfirmLocation}>Confirm Location</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end location modal */}

      {/* Add new address modal */}
      <div class="modal modal-lg fade usr-artist-single-modal" id="addAddressModalToggle" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addAddressModalToggleLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body">
              <div className='user-address-form-wrapper'>
                <form onSubmit={handleSubmit(handleAddAddress)}>
                  <h2 className='text-center mt-3'>Enter Your Address</h2>
                  <hr />
                  <div className='row'>
                    <div className='col-md-6 my-2'>
                      <label htmlFor='fullName'>Full Name<sup>*</sup></label>
                      <input type='text' name='fullName' className='form-control' id='fullName' {...register('fullName', { required: "This field is required." })} />
                      {errors && errors.fullName && <span>{errors.fullName.message}</span>}
                    </div>
                    <div className='col-md-6 my-2'>
                      <label htmlFor='mobile'>Mobile<sup>*</sup></label>
                      <input 
                        type='text' 
                        name='mobile' 
                        className='form-control' 
                        id='mobile' 
                        {...register('mobile', 
                        { required: "This field is required.",
                        pattern: {
                          value: /^\d{10}$/,
                          message: 'Mobile must be 10 digits Number only.',
                        } 
                        })} 
                        onChange={(e)=>handleFormInputChange(e)}
                      />
                      {errors && errors.mobile && <span>{errors.mobile.message}</span>}
                    </div>
                    <div className='col-md-6 my-2'>
                      <label htmlFor='address'>Flat, House no., Building, Company, Apartment<sup>*</sup></label>
                      <input type='text' name='address' className='form-control' id='address' {...register('address', { required: "This field is required." })} />
                      {errors && errors.address && <span>{errors.address.message}</span>}
                    </div>
                    <div className='col-6 my-2'>
                      <label htmlFor='street'>Area, Street, Sector, Village<sup>*</sup></label>
                      <input type='text' name='street' className='form-control' id='street' {...register('street', { required: "This field is required." })} />
                      {errors && errors.street && <span>{errors.street.message}</span>}
                    </div>
                    <div className='col-6 my-2'>
                      <label htmlFor='landmark'>Landmark<sup>*</sup></label>
                      <input type='text' name='landmark' className='form-control' id='landmark' {...register('landmark', { required: "This field is required." })} />
                      {errors && errors.landmark && <span>{errors.landmark.message}</span>}
                    </div>
                    <div className='col-6 my-2'>
                      <label htmlFor='postalCode'>Pincode<sup>*</sup></label>
                      <input type="text" className='form-control' id="postalCode" value={userAddress?.postalCode} name="postalCode" onChange={(e) => formHandlerChange(e)} />
                      {formError.postalCode && <span>{formError.postalCode}</span>}
                    </div>
                    <div className='col-md-6 my-2'>
                      <label htmlFor='city'>Town/City<sup>*</sup></label>
                      <input type='text' name='city' className='form-control' id='city' value={userAddress?.city} onChange={(e) => formHandlerChange(e)} />
                      {formError.city && <span>{formError.city}</span>}
                    </div>
                    <div className='col-md-6 my-2'>
                      <label htmlFor='state'>State<sup>*</sup></label>
                      <input type='text' name='state' className='form-control' id='state' value={userAddress?.state} onChange={(e) => formHandlerChange(e)} />
                      {formError.state && <span>{formError.state}</span>}
                    </div>
                    <div className='col-12'>
                      <hr />
                    </div>
                    <div className='col-12 d-flex justify-content-center align-items-center gap-3'>
                      <button type="button" className="usr-common-action-btn fw-300"  data-bs-toggle="modal" data-bs-target="#locationModalToggle">Go Back</button>
                      <button type='submit' className='usr-common-filled-btn'>Use This Address</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* End modal add address */}


                        <div class="modal modal-lg fade usr-artist-single-modal" id="exampleModalToggle3" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalToggleLabel3" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <h3 className="text-center text-uppercase mt-4">Thank You!</h3>
                                    <p className="text-center fw-500">Your service has been booked successfully.</p>
                                    <div class="modal-body usr-artist-single-modal-body py-4">
                                        <p className="text-center" >{`Your booking ID is ${orderId ? orderId : null}`} <br/> you can modify your booking from the bookings page in your account.</p>
                                    </div>
                                    <div class="modal-footer border-0  py-xl-4 py-lg-4 justify-content-center">
                                        <button type="button" className="usr-btn fw-300 me-2" onClick={()=>navigate('/user/bookings')} data-bs-dismiss="modal">All Bookings</button>
                                    </div>
                                </div>
                            </div>
                        </div>
    </section>
  )
}

export default Cart