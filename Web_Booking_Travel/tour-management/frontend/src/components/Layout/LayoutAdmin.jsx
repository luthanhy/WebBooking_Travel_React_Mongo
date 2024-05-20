import React from 'react'
import RoutersAdmin from '../../router/RoutersAdmin'
import HeaderAdmin from '../Header/HeaderAdmin'
import FooterAdmin from '../Footer/FooterAdmin'
import Adminsiderbar from '../Siderbar/SidebarAdmin'
import "../Layout/LayoutAD.css"
import Navbar from '../NavBar/navBar'
import Widget from '../Widget/widget'


const Layout = () => {
  return (
    <div className="home">

    <Adminsiderbar />
    <div className="homeContainer">
      <Navbar />
    
      <RoutersAdmin />
      <FooterAdmin />
    </div>

  </div>
  )
};

export default Layout