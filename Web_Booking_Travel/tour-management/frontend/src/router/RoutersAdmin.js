import React from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'

import Dashboard from '../Admin/Dashboard.jsx'
import Product from '../Admin/Product.jsx'
import Customer from '../Admin/Customer.jsx'

const RoutersAdmin = () => {
  return (
<div>
        <Routes>
            <Route path='/'element = {<Navigate to = '/admin'/>}/>
            <Route path='/admin/dashboard' element={<Dashboard />}/>
            <Route path='/admin/product' element={<Product/>}/>
            <Route path='/admin/customer' element={<Customer />}/>
            <Route path='/admin/ReviewProduct' element={<Customer />}/>
        </Routes>
    </div>
  )
}

export default RoutersAdmin
