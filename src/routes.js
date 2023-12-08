import UserLayout from 'layouts/UserLayout'
import AccountSettings from 'pages/accountSetting'
import CardBasic from 'pages/cards'
import Dashboard from 'pages/dashboard'
import Error404 from 'pages/error/404'
import FormLayouts from 'pages/form-layouts'
// import Icons from 'pages/icons'
import LoginPage from 'pages/login'
import MUITable from 'pages/tables'
import Services from 'pages/servicesCreated'
import React from 'react'
import { Outlet, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Homepage from 'pages/homepage/homepage'
import UserProfile from 'pages/UserProfile'
import { getUserProfile } from 'configs/initialapis'
import {allServicesDetails} from 'configs/initialapis'
import {allProductsDetails} from 'configs/initialapis'
import CreateBlog from 'pages/Blog/createBlog'
import { SettingsConsumer } from '@core/context/settingsContext'
import { SettingsProvider } from '@core/context/settingsContext'
import ThemeComponent from '@core/theme/ThemeComponent'
import ArtistRegistration from 'pages/become-a-artist'
import ArtistCreation from 'pages/become-a-artist/artist'
import AboutYou from 'pages/become-a-artist/about'
import AllServicesDetails from 'pages/allServicesDetails'
import AllProdutsDetails from 'pages/allProductDetails'
import ProductForm from 'pages/products'
import UpdateService from 'pages/updateService/updateService'
import UpdateProducts from 'pages/updateProduct'
import BlogList from 'pages/Blog/blogList'
import { getAllBlog } from 'configs/initialapis'
import AboutSkills from "pages/become-a-artist/aboutSkills";
import DescribeYourself from "pages/become-a-artist/describeYourself";
import ArtistAddress from "pages/become-a-artist/artistAddress";
import ArtistGallary from "pages/become-a-artist/artistGallary";


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

const ApplicationRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Normal component */}
      <Route element={<NormalComponents />}>
        <Route index path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user">
          {/* <Route path='/user/register-artist' element={<ArtistRegistration />} /> */}
          <Route
            path="/user/profile"
            element={<UserProfile />}
            loader={getUserProfile}
          />
        </Route>

        <Route
          path="/become-a-artist"
          element={<ArtistCreation />}
          loader={getUserProfile}
        >
          <Route path="/become-a-artist" element={<ArtistRegistration />} />
          <Route path="/become-a-artist/about-your-skills" element={ <AboutSkills />} />
          <Route path="/become-a-artist/about-you" element={<AboutYou />} />
          <Route path="/become-a-artist/describe-yourself" element={<DescribeYourself />} />
          <Route path="/become-a-artist/location" element={<ArtistAddress />} />
          <Route path="/become-a-artist/insight-your-work" element={<ArtistGallary />} />
        </Route>
        <Route path="/*" element={<Error404 />} />
      </Route>

      {/* Dashboard component */}
      <Route element={<DashboardComponents/>}>
        <Route path="/management" element={<UserLayout/>}>
          <Route path='/management/dashboard' element={<Dashboard/>}/>
          <Route path="/management/account-settings" element={<AccountSettings/>}/> 
          <Route path="/management/cards" element={<CardBasic/>}/> 
          <Route path="/management/tables" element={<MUITable/>}/> 
          <Route path="/management/form-layouts" element={<FormLayouts/>}/> 
          <Route path="/management/create-blog" element={<CreateBlog/>}/> 

         <Route path="/management/bloglist" element={<BlogList/>} loader={getAllBlog}/>
        <Route path="/management/services" element={<AllServicesDetails/>} loader={allServicesDetails}/>
        <Route path="/management/services/create" element={<Services/>}/>
        <Route path="/management/products" element={<AllProdutsDetails/>} loader={allProductsDetails}/>
        <Route path="/management/products/create" element={<ProductForm/>}/>
        <Route path="/management/services/:_id" element={<UpdateService/>}/>
        <Route path="/management/products/:_id" element={<UpdateProducts/>}/>
        </Route>
      </Route>
    </Route>
  )
);

export default ApplicationRoutes;
