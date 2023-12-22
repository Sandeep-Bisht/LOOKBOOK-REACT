import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../../css/header.css'
import { checkAuth } from "configs/auth";
import UserMenu from "./userMenu";
import { AccountOutline } from "mdi-material-ui";

const Header = () => {
  const [scrollClass, setScrollClass] = useState('');
  const [currentUser,setCurrentUser] = useState(checkAuth());
  useEffect(() => {
    const handleScroll = () => {
      // Set the scroll position at which you want to add or remove the class
      const scrollPosition = 100; // Change this to your desired scroll position

      if (window.scrollY >= scrollPosition) {
        // Add the 'new-class' when scrolled down
        setScrollClass('new-class');
      } else {
        // Remove the 'new-class' when scrolled back to the top
        setScrollClass('');
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures that this effect runs only once when the component mounts

  const headerClasses = `header ${scrollClass}`;

  return (
    <header className={headerClasses} id="header">
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <span className="main-logo">
              <h1>
              <img src="images/main-logo.png" className="img-fluid " />
              </h1>
            </span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 w-100 d-flex justify-content-center align-items-center ">
              <li className="nav-item">
                <Link className="nav-link " to="/">Home</Link>
              </li>
              <li className="nav-item">
                <div className="dropdown">
                  <button className="btn  dropdown-toggle nav-link border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Artist<span className="ms-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                        <path d="M8.96801 11.5C9.10035 11.5007 9.23154 11.4755 9.35405 11.4258C9.47657 11.3761 9.588 11.3028 9.68196 11.2102L13.7043 7.21292C13.8936 7.02474 14 6.76952 14 6.5034C14 6.23728 13.8936 5.98206 13.7043 5.79389C13.5149 5.60572 13.2581 5.5 12.9903 5.5C12.7225 5.5 12.4657 5.60572 12.2764 5.79389L8.96801 9.09163L5.65966 5.80388C5.46729 5.64017 5.21984 5.55462 4.96677 5.56434C4.71369 5.57405 4.47361 5.67831 4.29453 5.85628C4.11544 6.03426 4.01053 6.27283 4.00075 6.52434C3.99098 6.77584 4.07706 7.02175 4.2418 7.21292L8.2641 11.2102C8.4514 11.3948 8.7042 11.4989 8.96801 11.5Z" fill="#6D5D4C" />
                      </svg>
                    </span>
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Makeup Artist</a></li>
                    <li><a className="dropdown-item" href="#">Hair Artist</a></li>
                    <li><a className="dropdown-item" href="#">Emerging Artist</a></li>
                    <li><a className="dropdown-item" href="#">All Artist</a></li>
                  </ul>
                </div>

              </li>
              <li className="nav-item">
                <form className="home-selction-form">
                  <button className=" custom-search">
                    <svg width={46} height={45} viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M41.2062 38.0438L34.25 31.1438C36.9502 27.777 38.2578 23.5037 37.904 19.2024C37.5502 14.9012 35.5619 10.899 32.3479 8.01871C29.1338 5.13845 24.9384 3.59909 20.6242 3.71714C16.3101 3.83519 12.2051 5.60168 9.15339 8.6534C6.10168 11.7051 4.33519 15.8101 4.21714 20.1242C4.09909 24.4384 5.63845 28.6338 8.51871 31.8479C11.399 35.0619 15.4012 37.0502 19.7024 37.404C24.0037 37.7578 28.277 36.4502 31.6438 33.75L38.5438 40.65C38.7181 40.8258 38.9254 40.9652 39.1539 41.0604C39.3824 41.1556 39.6275 41.2046 39.875 41.2046C40.1225 41.2046 40.3676 41.1556 40.5961 41.0604C40.8246 40.9652 41.0319 40.8258 41.2062 40.65C41.5442 40.3004 41.7331 39.8331 41.7331 39.3469C41.7331 38.8606 41.5442 38.3934 41.2062 38.0438ZM21.125 33.75C18.5291 33.75 15.9915 32.9802 13.8331 31.538C11.6747 30.0959 9.99248 28.046 8.99908 25.6477C8.00568 23.2494 7.74577 20.6104 8.2522 18.0644C8.75863 15.5184 10.0087 13.1798 11.8442 11.3442C13.6798 9.50866 16.0184 8.25863 18.5644 7.7522C21.1104 7.24577 23.7494 7.50569 26.1477 8.49909C28.546 9.49249 30.5958 11.1748 32.038 13.3331C33.4802 15.4915 34.25 18.0291 34.25 20.625C34.25 24.106 32.8672 27.4444 30.4058 29.9058C27.9444 32.3672 24.606 33.75 21.125 33.75Z" fill="#FEFEFE" />
                    </svg>
                  </button>
                  <div className="row">
                    <div className="col-lg-4 px-0">
                      <div className="dropdown">
                        <button className="custom-drodown-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <div className="left">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M3.70898 9.09222C3.72159 5.3817 6.73978 2.38396 10.4503 2.39652C14.1608 2.40917 17.1585 5.42735 17.146 9.13787V9.21395C17.1003 11.6259 15.7536 13.8553 14.1025 15.5977C13.1582 16.5782 12.1037 17.4463 10.9601 18.1846C10.6543 18.4491 10.2007 18.4491 9.89485 18.1846C8.18992 17.0749 6.69355 15.6738 5.4742 14.0455C4.38742 12.6255 3.77038 10.9021 3.70898 9.11504V9.09222Z" stroke="#6D5D4C" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M10.4268 11.3751C11.6161 11.3751 12.5802 10.411 12.5802 9.22173C12.5802 8.03246 11.6161 7.06836 10.4268 7.06836C9.23754 7.06836 8.27344 8.03246 8.27344 9.22173C8.27344 10.411 9.23754 11.3751 10.4268 11.3751Z" stroke="#6D5D4C" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                          </div>
                          <div className="right">
                            <p className="mb-0">
                              <span className="nav-link">Location</span>

                            </p>
                          </div>
                        </button>
                        <ul className="dropdown-menu">
                          <li><a className="dropdown-item" href="#">Action</a></li>
                          <li><a className="dropdown-item" href="#">Another action</a></li>
                          <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-4 px-0">

                      <div className="dropdown">
                        <button className="custom-drodown-btn dropdown-toggle "
                          type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <div className="left">
                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15.8425 18H10.5H5.15745C3.96593 18 3 17.0985 3 15.9864V6.01362C3 4.90153 3.96593 4 5.15745 4H15.8425C17.0341 4 18 4.90153 18 6.01362V15.9864C18 17.0985 17.0341 18 15.8425 18Z" stroke="#6D5D4C" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M3 9H18" stroke="#6D5D4C" stroke-miterlimit="10" stroke-linejoin="round" />
                              <path d="M10.5 3V5" stroke="#6D5D4C" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M15 3V5" stroke="#6D5D4C" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M6 3V5" stroke="#6D5D4C" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                          </div>
                          <div className="right">
                            <p className="mb-0">
                              <span className="nav-link">Date</span>

                            </p>
                          </div>
                        </button>
                        <ul className="dropdown-menu">
                          <li><a className="dropdown-item" href="#">Action</a></li>
                          <li><a className="dropdown-item" href="#">Another action</a></li>
                          <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-4 px-0">
                      <div className="dropdown">
                        <button className="custom-drodown-btn dropdown-toggle border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <div className="left">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                              <g clip-path="url(#clip0_919_1365)">
                                <path d="M12.4534 10.9616C13.8184 10.1216 14.7004 8.46257 14.7004 6.92957C14.7004 4.74557 12.9154 2.30957 10.5004 2.30957C8.08543 2.30957 6.30043 4.74557 6.30043 6.92957C6.30043 8.46257 7.18243 10.1216 8.54743 10.9616C5.31343 11.8226 2.94043 14.7836 2.94043 18.2696C2.94043 18.5006 3.12943 18.6896 3.36043 18.6896H17.6404C17.8714 18.6896 18.0604 18.5006 18.0604 18.2696C18.0604 14.7836 15.6874 11.8226 12.4534 10.9616ZM7.14043 6.92957C7.14043 4.76657 8.92543 3.14957 10.5004 3.14957C12.0754 3.14957 13.8604 4.76657 13.8604 6.92957C13.8604 9.09257 12.0754 10.7096 10.5004 10.7096C8.92543 10.7096 7.14043 9.09257 7.14043 6.92957ZM3.80143 17.8496C4.01143 14.3426 6.95143 11.5496 10.5004 11.5496C14.0494 11.5496 16.9894 14.3426 17.1994 17.8496H3.80143Z" fill="#6D5D4C" />
                                <path d="M257.04 -165.9V187.74H-117.6V-165.9H257.04ZM258.72 -167.58H-119.28V189.42H258.72V-167.58Z" fill="#6D5D4C" />
                              </g>
                              <defs>
                                <clipPath id="clip0_919_1365">
                                  <rect width="21" height="21" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                          <div className="right">
                            <p className="mb-0">
                              <span className="nav-link">Artist</span>

                            </p>
                          </div>
                        </button>
                        <ul className="dropdown-menu">
                          <li><a className="dropdown-item" href="#">Action</a></li>
                          <li><a className="dropdown-item" href="#">Another action</a></li>
                          <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </form>
              </li>

              <li className="nav-item">
                <Link className="nav-link " to="/">Contact us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/become-a-artist">Join Us</Link>
              </li>

            </ul>
            {currentUser ? <>
              <div className="dropdown user-dropdown">
                <button className="common-action btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <span className="me-1">
                  <svg width={17} height={17} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1_165)">
                      <path d="M10 12.5C12.7614 12.5 15 10.2614 15 7.5C15 4.73858 12.7614 2.5 10 2.5C7.23858 2.5 5 4.73858 5 7.5C5 10.2614 7.23858 12.5 10 12.5Z" stroke="#FEFEFE" strokeWidth={2} strokeMiterlimit={10} />
                      <path d="M2.42102 16.8743C3.18943 15.5442 4.29431 14.4398 5.62468 13.672C6.95505 12.9042 8.46405 12.5 10.0001 12.5C11.5361 12.5 13.0451 12.9043 14.3755 13.6721C15.7058 14.44 16.8107 15.5444 17.5791 16.8744" stroke="#FEFEFE" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_165">
                        <rect width={20} height={20} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <span>
                  <svg width="17" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.95521 13C10.1405 13.001 10.3241 12.9674 10.4957 12.9011C10.6672 12.8348 10.8232 12.7371 10.9547 12.6136L16.586 7.28389C16.8511 7.03299 17 6.6927 17 6.33787C17 5.98305 16.8511 5.64275 16.586 5.39185C16.3209 5.14095 15.9613 5 15.5864 5C15.2115 5 14.852 5.14095 14.5869 5.39185L9.95521 9.78884L5.32352 5.40518C5.05421 5.18689 4.70778 5.07283 4.35347 5.08578C3.99916 5.09873 3.66306 5.23775 3.41234 5.47505C3.16161 5.71234 3.01474 6.03044 3.00105 6.36578C2.98737 6.70112 3.10788 7.029 3.33852 7.28389L8.96974 12.6136C9.23196 12.8597 9.58588 12.9985 9.95521 13Z" fill="#FEFEFE" />
                  </svg>
                </span>
                </button>
                <ul className="dropdown-menu">
                  <UserMenu props={[currentUser,setCurrentUser]}/>
                </ul>
              </div>
              </> : 
              <Link to="/login" className="common-action btn text-white">
              <AccountOutline sx={{ marginRight: 2, color:'white' }} />
              Login</Link>}
              {/* <Link className="common-action nav-link" to="/login">
                <span className="me-1">
                  <svg width={17} height={17} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1_165)">
                      <path d="M10 12.5C12.7614 12.5 15 10.2614 15 7.5C15 4.73858 12.7614 2.5 10 2.5C7.23858 2.5 5 4.73858 5 7.5C5 10.2614 7.23858 12.5 10 12.5Z" stroke="#FEFEFE" strokeWidth={2} strokeMiterlimit={10} />
                      <path d="M2.42102 16.8743C3.18943 15.5442 4.29431 14.4398 5.62468 13.672C6.95505 12.9042 8.46405 12.5 10.0001 12.5C11.5361 12.5 13.0451 12.9043 14.3755 13.6721C15.7058 14.44 16.8107 15.5444 17.5791 16.8744" stroke="#FEFEFE" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_165">
                        <rect width={20} height={20} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>


                </span>
                <span>
                  <svg width="17" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.95521 13C10.1405 13.001 10.3241 12.9674 10.4957 12.9011C10.6672 12.8348 10.8232 12.7371 10.9547 12.6136L16.586 7.28389C16.8511 7.03299 17 6.6927 17 6.33787C17 5.98305 16.8511 5.64275 16.586 5.39185C16.3209 5.14095 15.9613 5 15.5864 5C15.2115 5 14.852 5.14095 14.5869 5.39185L9.95521 9.78884L5.32352 5.40518C5.05421 5.18689 4.70778 5.07283 4.35347 5.08578C3.99916 5.09873 3.66306 5.23775 3.41234 5.47505C3.16161 5.71234 3.01474 6.03044 3.00105 6.36578C2.98737 6.70112 3.10788 7.029 3.33852 7.28389L8.96974 12.6136C9.23196 12.8597 9.58588 12.9985 9.95521 13Z" fill="#FEFEFE" />
                  </svg>
                </span>
              </Link> */}
          </div>
        </div>
      </nav>
    </header>

  );
};

export default Header;