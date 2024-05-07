import React from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Tours from '../pages/Tours'
import ToursDetails from '../pages/ToursDetails.jsx'
import SearchResultList from '../pages/SearchResultList'
const Routers = () => {
  return (
    <div>
        <Routes>
            <Route path='/'element = {<Navigate to = '/home'/>}/>
            <Route path='/home' element = {<Home/>}/>
            <Route path='/tours' element = {<Tours/>}/>
            <Route path='/tours/:id' element = {<ToursDetails/>}/>
            <Route path='/Login' element = {<Login/>}/>
            <Route path='/Register' element = {<Register/>}/>
            <Route path='/tour/search' element = {<SearchResultList/>}/>

        </Routes>
    </div>
  )
}

export default Routers