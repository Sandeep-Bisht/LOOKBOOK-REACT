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
import { Route, Routes } from 'react-router-dom'
import Profile from 'views/profile/profile'
import Homepage from 'pages/homepage/homepage'

const ApplicationRoutes = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Homepage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path="/management" element={<UserLayout/>}>
        <Route path='/management/dashboard' element={<Dashboard/>}/>
        <Route path="/management/account-settings" element={<AccountSettings/>}/> 
        <Route path="/management/icons" element={<Icons/>}/> 
        <Route path="/management/cards" element={<CardBasic/>}/> 
        <Route path="/management/tables" element={<MUITable/>}/> 
        <Route path="/management/form-layouts" element={<FormLayouts/>}/> 
        <Route path='/management/create-profile' element={<Profile />} />
      </Route>
      <Route path='/*' element={<Error404/>}/>
    </Routes>
  )
}

export default ApplicationRoutes