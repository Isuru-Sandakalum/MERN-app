import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SignUp from './pages/SignUp'
import Signin from './pages/Signin'
import About from './pages/About'
import Profile from './pages/Profile'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing'
import Search from './pages/Search'


export default function App() {
  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Sign-up" element={<SignUp/>}/>
        <Route path="/Sign-in" element={<Signin/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/listing/:listingId" element={<Listing/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile/>}/>
        <Route path='/create-listing' element={<CreateListing/>}/>
        <Route path='/update-listing/:listingId' element={<UpdateListing/>}/>
        </Route>
     
      </Routes>
    </BrowserRouter>
  )
}
