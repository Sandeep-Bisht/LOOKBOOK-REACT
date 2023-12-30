import UserLayout from 'layouts/UserLayout'
import AccountSettings from 'pages/Demo/accountSetting'
import CardBasic from 'pages/Demo/cards'
import Dashboard from 'pages/management/dashboard'
import Error404 from 'pages/error/404'
import FormLayouts from 'pages/Demo/form-layouts'
import LoginPage from 'pages/login'
import MUITable from 'pages/Demo/tables'
import Services from 'pages/management/services/servicesCreated'
import React, { useEffect } from 'react'
import { Navigate, Outlet, Route, createBrowserRouter, createRoutesFromElements, useLoaderData, useLocation } from 'react-router-dom'
import Homepage from 'pages/homepage/homepage'
import UserProfile from 'pages/user/Profile'
import { getSearchParameters, getArtistRequestByID, getHomepageData, getAllArtistRequest, getWizardData, getAllArtists, getArtistRequests, getAllBlog, getUserProfile, allServicesDetails, allProductsDetails, getServiceById, getProductById, getBlogById, getArtistById, getBlogBySlug } from 'configs/initialapis'
import CreateBlog from 'pages/management/blogs/blogCreate'
import { SettingsConsumer, SettingsProvider } from '@core/context/settingsContext'
import ThemeComponent from '@core/theme/ThemeComponent'
import AboutYou from 'pages/become-a-artist/about'
import AllServicesDetails from 'pages/management/services/allServicesDetails'
import AllProdutsDetails from 'pages/management/products/allProductDetails'
import ProductForm from 'pages/management/products/products'
import UpdateService from 'pages/management/services/updateService'
import UpdateProducts from 'pages/management/products/updateProduct'
import UpdateBlog from 'pages/management/blogs/updateBlog'
import BlogList from 'pages/management/blogs/blogList'
import PrivacyPage from 'pages/privacy-policy'
import DescribeYourself from "pages/become-a-artist/describeYourself";
import ArtistGallary from "pages/become-a-artist/artistGallary";
import StepSecond from 'pages/become-a-artist/stepSecond'
import InsightStory from 'pages/become-a-artist/insightStory'
import BestServices from 'pages/become-a-artist/bestServices'
import Description from 'pages/become-a-artist/description'
import PriceSetup from 'pages/become-a-artist/priceSetup'
import CompleteKYC from 'pages/become-a-artist/completeKYC'
import Certificates from 'pages/become-a-artist/certificates'
import ArtistRequestProvider from 'pages/become-a-artist/provider'
import GetStarted from 'pages/become-a-artist/getStarted'
import ArtistGlobalState from 'pages/become-a-artist/globalState'
import ArtistLocation from 'pages/become-a-artist/location'
import StepFirst from 'pages/become-a-artist/stepFirst'
import StepThird from 'pages/become-a-artist/stepThird'
import Icons from 'pages/Demo/icons'
import GetAllArtists from 'pages/management/artistRequests/allArtistRequests'
import BecomeAristHeader from 'pages/become-a-artist/common/header'
import Review from 'pages/become-a-artist/review'
import Details from 'pages/become-a-artist/details'
import Celebration from 'pages/become-a-artist/celebration'
import Cookies from 'universal-cookie';
import { jwtDecode } from "jwt-decode";
import Error401 from 'pages/error/401'
import ArtistCertificates from 'pages/management/artistRequests/artistCertificates'
import TermsPage from 'pages/Terms-condition'
import { checkAuth } from 'configs/auth'
import Header from 'layouts/components/header/header'
import Footer from 'layouts/components/footer/footer'
import ArtistRequestGallary from 'pages/management/artistRequests/artistRequestGallary'
import ContactPage from 'pages/contact'
import AllArtists from 'pages/all-artists'
import Search from 'pages/search/searchPage'
import  AllBlogs  from 'pages/allBlogs'
import AboutUS from 'pages/about-us'
import ArtistSingle from 'pages/artistSingle'
import SingleArtistInformation from 'pages/management/artistRequests/singleArtistRequestPage'
import SingleBlog from 'pages/single-blog/singleBlog'

const DashboardComponents = () =>{
  return (<SettingsProvider>
    <SettingsConsumer>
      {({ settings }) => {
        return <ThemeComponent settings={settings}>
          <Outlet/>
        </ThemeComponent>
      }}
    </SettingsConsumer>
    </SettingsProvider>)
}

const NormalComponents = () =>{
  return (<SettingsProvider>
    <SettingsConsumer>
      {({ settings }) => {
        settings = {...settings,mode:'light'}
        return <ThemeComponent settings={settings}>
          <Outlet/>
        </ThemeComponent>
      }}
    </SettingsConsumer>
    </SettingsProvider>)
}

const RequireAuth = ({allowedRoles}) =>{

  const location = useLocation()
  const cookies = new Cookies();

  const token = cookies.get('LOOKBOOK_TOKEN')
  if(token){
    const decoded = jwtDecode(token);
    if(decoded && decoded.role && decoded.userID){
      if(allowedRoles && Array.isArray(allowedRoles)){
        let userAllowed = allowedRoles.includes(decoded.role);
        if(userAllowed){
          return <Outlet/>;
        }
        else{
          return <Error401/>;
        }
      }
      else{
        return <Navigate to={`/login?redirectUrl=${location.pathname}`} replace={true}/>
      }
    }
    else{
      return <Navigate to={`/login?redirectUrl=${location.pathname}`} replace={true}/>
    }
    // setDecodedToken(decoded);
  }
  else{
    return <Navigate to={`/login?redirectUrl=${location.pathname}`} replace={true}/>
  }
  
}

const roles = {
  user:process.env.REACT_APP_USER,
  artist:process.env.REACT_APP_ARTIST,
  admin:process.env.REACT_APP_ADMIN,
  manager:process.env.REACT_APP_MANAGER,
  super_admin:process.env.REACT_APP_SUPER_ADMIN
}

const CheckLoggedIn = () =>{
  const check = checkAuth();

  if(check){
    if(check.role == roles.user || check.role == roles.artist){
      return <Navigate to="/" replace={true}/>
    }
    else if(check.role == roles.admin){
      return <Navigate to="/management/dashboard" replace={true}/>
    }
    return <Navigate to="/" replace={true}/>
  }
  else{
    return <Outlet/>;
  }
}

const CommonLayout = () =>{
  
  const {cities , services} = useLoaderData() 
  return (
  <>
  <Header  cities={cities} services={services}/>
    <Outlet/>
  <Footer/>
  </>)
}


const UseLoaderOutletContext = () =>{
  const loaderData = useLoaderData();
  return <Outlet context={[loaderData]} />
}

const MainWrapper = () =>{

  const location = useLocation()

  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  },[location.pathname])
  
  return <Outlet/>;
}

const ApplicationRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainWrapper/>}>
      {/* Normal component */}
      <Route element={<NormalComponents />}>
        <Route element={<CommonLayout/>} loader={getSearchParameters}>
          <Route index path="/" element={<Homepage />} loader={getHomepageData}/>
          <Route path='/artists' element={<AllArtists/>} loader={getAllArtists}/>
          <Route path="/artists/:artist_id" element={<ArtistSingle/>} loader={getArtistById}/>
          <Route path='/terms-conditions' element={<TermsPage/>}/>
          <Route path='/privacy-policy' element={<PrivacyPage/>}/> 
          <Route path='/contact-us' element={<ContactPage/>}/>
          <Route path='/blogs' element={<AllBlogs/>} loader={getAllBlog}/>
          <Route path='/blogs/:slug' element={<SingleBlog/>} loader={getBlogBySlug}/>
          <Route path='/about-us' element={<AboutUS/>}/>
          
          <Route path='/search' element={< Search />} />
          <Route element={<CheckLoggedIn/>}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[roles.user,roles.artist]} />}>
            <Route path="/user">
              <Route
                path="/user/profile"
                element={<UserProfile />}
                loader={getUserProfile}
              />
            </Route>
          </Route>
        </Route>
        
        {/* Auth routes for user */}
        <Route element={<RequireAuth allowedRoles={[roles.user]} />}>
          <Route
              path="/become-a-artist"
              element={<ArtistRequestProvider />}
              loader={getArtistRequests}
          />
          <Route
              path="/become-a-artist/get-started"
              element={<><div className="artist-wrapper-ar"><BecomeAristHeader/><GetStarted /></div></>}
              loader={getArtistRequests}
          />

          <Route path='/become-a-artist/:request_id' element={<ArtistGlobalState/>} loader={getWizardData}>
            <Route
              path="/become-a-artist/:request_id/"
              element={<Navigate to="/become-a-artist" replace={true}  />}
            />
            <Route
              path="/become-a-artist/:request_id/get-started"
              element={<GetStarted />}
            />
            <Route path="/become-a-artist/:request_id/about-your-skills" element={ <StepFirst />} />
            <Route path="/become-a-artist/:request_id/about-you" element={<AboutYou />}/>
            <Route path="/become-a-artist/:request_id/describe-yourself" element={<DescribeYourself />} />
            <Route path="/become-a-artist/:request_id/location" element={<ArtistLocation />} />
            <Route path="/become-a-artist/:request_id/insight-your-work" element={<InsightStory />} />
            <Route path="/become-a-artist/:request_id/stand-out" element={<StepSecond />} />
            <Route path="/become-a-artist/:request_id/gallery" element={<ArtistGallary />} />
            <Route path="/become-a-artist/:request_id/you-are-best-in" element={<BestServices />} />
            <Route path="/become-a-artist/:request_id/description" element={<Description />} />
            <Route path="/become-a-artist/:request_id/finish-setup" element={< StepThird />} />
            <Route path="/become-a-artist/:request_id/pricing" element={< PriceSetup />} />
            <Route path="/become-a-artist/:request_id/complete-kyc" element={< CompleteKYC />} />
            <Route path="/become-a-artist/:request_id/upload-cerificates" element={< Certificates />} />
            <Route path="/become-a-artist/:request_id/personal-details" element={< Details/>} loader={getUserProfile}/>
            <Route path="/become-a-artist/:request_id/review-request" element={< Review />} />
          </Route>
          <Route path="/become-a-artist/publish-celebration" element={<Celebration />} />
        </Route>
        {/* End auth routes for user */}
        <Route path="/*" element={<Error404 />} />
      </Route>

      {/* Dashboard component and admin auth routes*/}
      <Route element={<RequireAuth allowedRoles={[roles.admin,roles.super_admin]} />}>
      <Route element={<DashboardComponents/>}>
        <Route path="/management" element={<UserLayout/>}>
          <Route path='/management/dashboard' element={<Dashboard/>}/>
          <Route path="/management/account-settings" element={<AccountSettings/>}/> 
          <Route path="/management/cards" element={<CardBasic/>}/> 
          <Route path="/management/icons" element={<Icons/>}/> 
          <Route path="/management/tables" element={<MUITable/>}/> 
          <Route path="/management/form-layouts" element={<FormLayouts/>}/> 
          <Route path="/management/create-blog" element={<CreateBlog/>}/> 

         <Route path="/management/blogs" element={<BlogList/>} loader={getAllBlog}/>
        <Route path="/management/services" element={<AllServicesDetails/>} loader={allServicesDetails}/>
        <Route path="/management/services/create" element={<Services/>}/>
        <Route path="/management/products" element={<AllProdutsDetails/>} loader={allProductsDetails}/>
        <Route path="/management/products/create" element={<ProductForm/>}/>
        
        <Route path="/management/services/:_id" element={<UpdateService/>} loader={({params})=>getServiceById(params)}/>
        <Route path="/management/products/:_id" element={<UpdateProducts/>} loader={({params})=>getProductById(params)}/>
        <Route path="/management/blogs/:_id" element={<UpdateBlog/>} loader={({params})=>getBlogById(params)}/>
        
        
        <Route path='/management/artists-request' element={<GetAllArtists/>} loader={()=>getAllArtistRequest()}/>
        
        <Route path='/management/artists-request/:request_id' element={<UseLoaderOutletContext/>} loader={getArtistRequestByID}>
          <Route path='/management/artists-request/:request_id' element={<SingleArtistInformation/>}/>
          <Route path='/management/artists-request/:request_id/certificates' element={<ArtistCertificates/>}/>
          <Route path='/management/artists-request/:request_id/gallery' element={<ArtistRequestGallary/>}/>
        </Route>
        </Route>
      </Route>
      
      </Route>
      {/* end admin auth routes */}
    </Route>
  )
);

export default ApplicationRoutes;
