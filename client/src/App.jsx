import {React, useState} from 'react'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Signup from './Components/Signup'
import Home from './Components/Home'
import Login from './Components/Login'
import ForgotPassword from './Components/ForgotPassword'
import ResetPassword from './Components/ResetPassword'
import NavigationButtons from './Components/NavigationButtons'
import Dashboard from './Components/Dashboard'

function App() {  

 return (
    <>
      <BrowserRouter>
      <NavigationButtons />
      
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/resetpassword/:token' element={<ResetPassword />} />
          <Route path='/dashboard' element = {<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

