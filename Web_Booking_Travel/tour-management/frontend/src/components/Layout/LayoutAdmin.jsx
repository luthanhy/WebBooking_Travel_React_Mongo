import React from 'react'
import RoutersAdmin from '../../router/RoutersAdmin'
import HeaderAdmin from '../Header/HeaderAdmin'
import FooterAdmin from '../Footer/FooterAdmin'
import Adminsiderbar from '../Siderbar/SidebarAdmin'
const LayoutAdmin = () => {
  return (
    <>
    <HeaderAdmin/>
    <Adminsiderbar/>
    <RoutersAdmin/>
    <FooterAdmin/>
    </>
  )
}

export default LayoutAdmin
