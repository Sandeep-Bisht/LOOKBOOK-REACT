import { useLoaderData } from 'react-router-dom'
import { Link } from "react-router-dom";
import '@css/user/addresses.css'
import { CgAddR } from "react-icons/cg"





const UserAddress = () => {
   const { address: allAddresses } = useLoaderData();
   console.log(allAddresses, "sare address aaye ki nahi")

   return (
      <>
         <section className='user-addresses-managment'>
            <div className='container'>
               <div className='row'>
                  <div className='col-lg-12'>
                     <h1 className='usr-common-heading text-center'>
                        Manage Addresses
                     </h1>
                  </div>
               </div>
               <div className='row'>
                  <div className='col-lg-12'>
                     <div className='address-managment-card-wrapper'>
                        <div className='row justify-content-center'>
                           <div className='col-lg-4'>
                              <div className='address-managment-card'>
                                
                                 <div>
                                      <p className='address-managment-card-heading fw-700'>Add New Address</p>
                                 </div>
                                 <div className='address-managment-card-btnwrapper'>
                                    <button type="button" class="btn address-managment-btn">
                                       <span><CgAddR /></span>
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                  </div>
               </div>
            </div>
         </section>

      </>
   );
};

export default UserAddress;