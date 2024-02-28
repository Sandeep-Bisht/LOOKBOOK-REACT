import { Link} from "react-router-dom";
import '@css/artitst/toggler.css'


const Toggler = () => {
    


    return (
       <>
           
        <section className='toggler-section'>
           <div className='container'>
               <div className='row'>
                   <div className='col-lg-12'>
                    <div className='toggler-section-btns-wrapper'>
                          <ul > 
                             <li>
                                 <Link to='/' className="toggler-section-btns-wrapper-link">
                                     Booking
                                 </Link>
                             </li>
                             <li>
                             <Link to='/' className="toggler-section-btns-wrapper-link">
                                     Calender
                                 </Link>
                             </li>
                             <li>
                             <Link to='/' className="toggler-section-btns-wrapper-link">
                                     Earnings
                                 </Link>
                             </li>
                          </ul>
                  </div>
                   </div>
               </div>
           </div>
        </section>
       </>
    );
};

export default Toggler;