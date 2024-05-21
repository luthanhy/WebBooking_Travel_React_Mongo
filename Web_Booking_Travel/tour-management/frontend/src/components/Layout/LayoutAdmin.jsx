import React from 'react'
import RoutersAdmin from '../../router/RoutersAdmin'
import HeaderAdmin from '../Header/HeaderAdmin'
import FooterAdmin from '../Footer/FooterAdmin'
import Adminsiderbar from '../Siderbar/SidebarAdmin'
import "../Layout/LayoutAD.css"
import Navbar from '../NavBar/navBar'
<<<<<<< HEAD
import { DarkModeProvider } from '../../context/DarkModeContext'
=======
import Widget from '../Widget/widget'


>>>>>>> origin/vuadmin2
const Layout = () => {
  return (
    <DarkModeProvider>
      <div className="home">

        <Adminsiderbar />
        <div className="homeContainer">
          <Navbar />
          <RoutersAdmin />
          <FooterAdmin />
        </div>

<<<<<<< HEAD
      </div>
    </DarkModeProvider>

=======
    <Adminsiderbar />
    <div className="homeContainer">
      <Navbar />
    
      <RoutersAdmin />
      <FooterAdmin />
    </div>

  </div>
>>>>>>> origin/vuadmin2
  )
};

export default Layout