import React from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Home from './pages/Dashboard/Home'
import Income from './pages/Dashboard/Income'
import Expanse from './pages/Dashboard/Expanse'
import UserProvider from './context/userContext'
import PublicRoute from './hooks/PublicRoute'
import PrivateRoute from './hooks/PrivateRoute'
import {Toaster} from 'react-hot-toast'
const App = () => {
  return (
    <>
    <UserProvider>
    <div> 
      <Router>
        <Routes>
          {/* <Route path='/' element={<Root/>}/> */}
          <Route path='/login'  element={<PublicRoute><Login/></PublicRoute>}/>
          <Route path='/signup'  element={<PublicRoute><SignUp/></PublicRoute>}/>
        
          <Route path='/'  element={<PrivateRoute><Home/></PrivateRoute>}/>
          <Route path='/income'  element={<PrivateRoute><Income/></PrivateRoute>}/>
          <Route path='/expense'  element={<PrivateRoute><Expanse/></PrivateRoute>}/>
        </Routes>
      </Router> 
    </div>
    <Toaster
    toastOptions={{
      className:'',
      style:{
        fontSize:'13px'
      }
    }}
    />
    </UserProvider>
    </>
  )
}

export default App

// const Root=()=>{
//     // check that token exists in local storage

//     const isAuth= !!localStorage.getItem('token');

//     // redirect if user is authenticated

//     return isAuth ? (<Navigate to='/dashboard'/>) : (<Navigate to='/login'/>);
// };