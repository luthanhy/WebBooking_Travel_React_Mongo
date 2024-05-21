import React from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'
import Customer from '../Admin/Customer.jsx'
import ReviewProduct from '../Admin/ReviewProduct.jsx'
import PageError from '../pages/PageError.jsx'
import ADTour from '../Admin/ADTour.jsx'
import TourPrice from '../Admin/TourPrice.jsx'
<<<<<<< HEAD
=======
import DashBoard from '../Admin/Dashboard.jsx'


>>>>>>> origin/vuadmin2
const RoutersAdmin = () => {
  return (
<div>
        <Routes>
            <Route path='/admin'element = {<Navigate to = '/admin/dashboard'/>}/>
            <Route path='*'element = {<PageError/>}/>
            <Route path='/admin/dashboard' element={<DashBoard />}/>
            <Route path='/admin/tours' element={<ADTour/>}/>
            <Route path='/admin/customer' element={<Customer />}/>
            <Route path='/admin/reviewproduct' element={<ReviewProduct />}/>
<<<<<<< HEAD
            <Route path='/admin/tourmanagement' element={<TourPrice />}/>

=======
            <Route path='/admin/tourmanagement' element={<ADTour />}/>
>>>>>>> origin/vuadmin2
        </Routes>
    </div>
  )
}

export default RoutersAdmin
