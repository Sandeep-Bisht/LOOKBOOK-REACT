import Toggler from "../layouts/toggler";
import '@css/artitst/bookings.css'
import '@css/artitst/artistCommon.css'


const ArtistBookings = () => {
    


    return (
       <>
         <Toggler/>
         <section className="artist-bookings-view-area">
           <div className="container">
                <div className="row">
                      <div className="col-lg-12">
                        <h1>Welcome back, John Doe</h1>
                      </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                    <p class="artist-view-inner-heading fw-700">Add New Address</p>
                    </div>
                </div>
           </div>
         </section>
     
       </>
    );
};

export default ArtistBookings;