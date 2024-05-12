import React from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'
import Dashboard from '../Admin/Dashboard.jsx'
import Tour from '../Admin/Tour.jsx'
import Customer from '../Admin/Customer.jsx'
import ReviewProduct from '../Admin/ReviewProduct.jsx'
import PageError from '../pages/PageError.jsx'
const RoutersAdmin = () => {
  return (
<div>
        <Routes>
            <Route path='/'element = {<Navigate to = '/admin'/>}/>
            <Route path='*'element = {<PageError/>}/>
            <Route path='/admin/dashboard' element={<Dashboard />}/>
            <Route path='/admin/tour' element={<Tour/>}/>
            <Route path='/admin/customer' element={<Customer />}/>
            <Route path='/admin/reviewproduct' element={<ReviewProduct />}/>
        </Routes>
    </div>
  )
}

export default RoutersAdmin
