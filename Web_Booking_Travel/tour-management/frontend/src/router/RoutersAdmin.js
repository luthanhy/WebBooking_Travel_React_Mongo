import React from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'
import Dashboard from '../Admin/Dashboard.jsx'
import Customer from '../Admin/Customer.jsx'
import ReviewProduct from '../Admin/ReviewProduct.jsx'
import PageError from '../pages/PageError.jsx'
import ADTour from '../Admin/ADTour.jsx'
import TourPrice from '../Admin/TourPrice.jsx'


const RoutersAdmin = () => {
  return (
<div>
        <Routes>
            <Route path='/admin'element = {<Navigate to = '/admin/dashboard'/>}/>
            <Route path='*'element = {<PageError/>}/>
            <Route path='/admin/dashboard' element={<Dashboard />}/>
            <Route path='/admin/tours' element={<ADTour/>}/>
            <Route path='/admin/customer' element={<Customer />}/>
            <Route path='/admin/reviewproduct' element={<ReviewProduct />}/>
            <Route path='/admin/tourmanagement' element={<TourPrice />}/>
        </Routes>
    </div>
  )
}

export default RoutersAdmin
