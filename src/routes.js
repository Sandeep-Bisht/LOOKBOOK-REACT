import UserLayout from 'layouts/UserLayout'
import AccountSettings from 'pages/accountSetting'
import CardBasic from 'pages/cards'
import Dashboard from 'pages/dashboard'
import Error404 from 'pages/error/404'
import FormLayouts from 'pages/form-layouts'
import Icons from 'pages/icons'
import LoginPage from 'pages/login'
import MUITable from 'pages/tables'
import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Homepage from 'pages/homepage/homepage'
import ArtistRegistration from 'pages/artist-registration'
import UserProfile from 'pages/UserProfile'
import { getUserProfile } from 'configs/initialapis'
import CreateBlog from 'pages/Blog/createBlog'


const ApplicationRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index path='/' element={<Homepage/>}/>
       <Route path='/login' element={<LoginPage/>}/>
       <Route path="/management" element={<UserLayout/>}>
         <Route path='/management/dashboard' element={<Dashboard/>}/>
         <Route path="/management/account-settings" element={<AccountSettings/>}/> 
         <Route path="/management/icons" element={<Icons/>}/> 
         <Route path="/management/cards" element={<CardBasic/>}/> 
         <Route path="/management/tables" element={<MUITable/>}/> 
         <Route path="/management/form-layouts" element={<FormLayouts/>}/> 
         <Route path="/management/create-blog" element={<CreateBlog/>}/> 
       </Route>
       <Route path='/user'>
        <Route path='/user/register-artist' element={<ArtistRegistration />} />
        <Route path='/user/profile' element={<UserProfile />} loader={getUserProfile}/>
       </Route>
       <Route path='/*' element={<Error404/>}/>
    </Route>
  )
)

export default ApplicationRoutes