import React from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'
import Customer from '../Admin/Customer.jsx'
import ReviewProduct from '../Admin/ReviewProduct.jsx'
import PageError from '../pages/PageError.jsx'
import ADTour from '../Admin/ADTour.jsx'
import TourPrice from '../Admin/TourPrice.jsx'
import Dashboard from '../Admin/Dashboard.jsx'
import OrderBooking from '../Admin/OrderBooking.jsx'
const RoutersAdmin = () => {
  return (  
<div>
        <Routes>
          
            <Route path='/admin/'element = {<Navigate to = '/admin/customer'/>}/>
            <Route path='*'element = {<PageError/>}/>
            <Route path='/admin/dashboard' element={<Dashboard />}/>
            <Route path='/admin/tours' element={<ADTour/>}/>
            <Route path='/admin/customer' element={<Customer />}/>
            <Route path='/admin/orderBooking' element={<OrderBooking />}/>
            <Route path='/admin/reviewproduct' element={<ReviewProduct />}/>
            <Route path='/admin/tourmanagement' element={<TourPrice />}/>

        </Routes>
    </div>
  )
}

export default RoutersAdmin
