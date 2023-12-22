import UserLayout from 'layouts/UserLayout'
import AccountSettings from 'pages/accountSetting'
import CardBasic from 'pages/cards'
import Dashboard from 'pages/dashboard'
import Error404 from 'pages/error/404'
import FormLayouts from 'pages/form-layouts'
import LoginPage from 'pages/login'
import MUITable from 'pages/tables'
import Services from 'pages/servicesCreated'
import React from 'react'
import { Navigate, Outlet, Route, createBrowserRouter, createRoutesFromElements, useLocation } from 'react-router-dom'
import Homepage from 'pages/homepage/homepage'
import UserProfile from 'pages/UserProfile'
import { getUserProfile } from 'configs/initialapis'
import {allServicesDetails} from 'configs/initialapis'
import {allProductsDetails} from 'configs/initialapis'
import {getServiceById} from 'configs/initialapis'
import {getProductById} from 'configs/initialapis'
import {getBlogById} from 'configs/initialapis'
import CreateBlog from 'pages/Blog/createBlog'
import { SettingsConsumer } from '@core/context/settingsContext'
import { SettingsProvider } from '@core/context/settingsContext'
import ThemeComponent from '@core/theme/ThemeComponent'
import AboutYou from 'pages/become-a-artist/about'
import AllServicesDetails from 'pages/allServicesDetails'
import AllProdutsDetails from 'pages/allProductDetails'
import ProductForm from 'pages/products'
import UpdateService from 'pages/updateService/updateService'
import UpdateProducts from 'pages/updateProduct'
import UpdateBlog from 'pages/updateBlog'
import BlogList from 'pages/Blog/blogList'
import PrivacyPage from 'pages/lookBookPrivacy'
import { getAllBlog } from 'configs/initialapis'
import DescribeYourself from "pages/become-a-artist/describeYourself";
import ArtistGallary from "pages/become-a-artist/artistGallary";
import StepSecond from 'pages/become-a-artist/stepSecond'
import InsightStory from 'pages/become-a-artist/insightStory'
import BestServices from 'pages/become-a-artist/bestServices'
import Description from 'pages/become-a-artist/description'
import PriceSetup from 'pages/become-a-artist/priceSetup'
import CompleteKYC from 'pages/become-a-artist/completeKYC'
import Certificates from 'pages/become-a-artist/certificates'
import { getArtistRequests } from 'configs/initialapis'
import {getAllArtists} from 'configs/initialapis'
import ArtistRequestProvider from 'pages/become-a-artist/provider'
import GetStarted from 'pages/become-a-artist/getStarted'
import ArtistGlobalState from 'pages/become-a-artist/globalState'
import ArtistLocation from 'pages/become-a-artist/location'
import StepFirst from 'pages/become-a-artist/stepFirst'
import StepThird from 'pages/become-a-artist/stepThird'
import Icons from 'pages/icons'
import GetAllArtists from 'pages/Artists'
import BecomeAristHeader from 'pages/become-a-artist/common/header'
import { getWizardData } from 'configs/initialapis'
import Review from 'pages/become-a-artist/review'
import Details from 'pages/become-a-artist/details'
import Celebration from 'pages/become-a-artist/celebration'
import Cookies from 'universal-cookie';
import { jwtDecode } from "jwt-decode";
import Error401 from 'pages/error/401'
import SingleArtistInformation from 'pages/singleArtistPage'
import ArtistCertificates from 'pages/artistCertificates'
import TermsPage from 'pages/Terms'
import { checkAuth } from 'configs/auth'
import Header from 'layouts/components/header/header'
import Footer from 'layouts/components/footer/footer'

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
  return (
  <>
  <Header/>
    <Outlet/>
  <Footer/>
  </>)
}

const ApplicationRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Normal component */}
      <Route element={<NormalComponents />}>
        <Route element={<CommonLayout/>}>
          <Route index path="/" element={<Homepage />} />
          <Route path='/terms-conditions' element={<TermsPage/>}/>
          <Route path='/privacy-policy' element={<PrivacyPage/>}/> 
          
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
        <Route element={<RequireAuth allowedRoles={[roles.user,roles.artist]} />}>
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
            <Route path="/become-a-artist/:request_id/personal-details" element={< Details />} />
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
        
        <Route path='/management/artists' element={<GetAllArtists/>} loader={()=>getAllArtists()}/>
        <Route path='/management/artists/:id' element={<SingleArtistInformation/>}/>
        <Route path='/management/artists/:id/certificates' element={<ArtistCertificates/>}/>

        </Route>
      </Route>
      </Route>
      {/* end admin auth routes */}
    </Route>
  )
);

export default ApplicationRoutes;
