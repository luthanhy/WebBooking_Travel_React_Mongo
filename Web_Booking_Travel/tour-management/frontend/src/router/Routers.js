import React from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import Tours from '../pages/Tours'
import ToursDetails from '../pages/ToursDetails.jsx'
import SearchResultList from '../pages/SearchResultList'
import Admin from '../pages/Admin.jsx'
//Them duong dan about
import About from '../pages/About.jsx'
const Routers = () => {
  return (
    <div>
        <Routes>
            <Route path='/'element = {<Navigate to = '/home'/>}/>
            <Route path='/home' element = {<Home/>}/>
            <Route path='/tours' element = {<Tours/>}/>
            <Route path='/tours/:id' element = {<ToursDetails/>}/>
            <Route path='/login' element = {<Login/>}/>
            <Route path='/register' element = {<Register/>}/>
            <Route path='/tours/search' element = {<SearchResultList/>}/>
            <Route path='/about' element = {<About/>}/>
        </Routes>
    </div>
  )
}

export default Routers