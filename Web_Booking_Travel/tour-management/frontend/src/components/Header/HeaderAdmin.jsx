import React from 'react'
import { BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsMenuButtonWideFill } from 'react-icons/bs';
import '../../styles/admin.css'
function HeaderAdmin({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="admin-sidebar" className={openSidebarToggle ? "admin-sidebar-responsive" : ""}>
    <div className='admin-header'>
      ADMIN
    </div>

    <ul className='admin-sidebar-list'>
        <li className='admin-sidebar-list-item'>
            <a href="dashboard">
                <BsGrid1X2Fill className='icon' /> Dashboard
            </a>
        </li>
        <li className='admin-sidebar-list-item'>
            <a href="tour">
                <BsFillArchiveFill className='icon' /> Tours
            </a>
        </li>
        <li className='admin-sidebar-list-item'>
            <a href="">
                <BsFillGrid3X3GapFill className='icon' /> Categories
            </a>
        </li>
        <li className='admin-sidebar-list-item'>
            <a href="customer">
                <BsPeopleFill className='icon' /> Customer
            </a>
        </li>
        <li className='admin-sidebar-list-item'>
            <a href="">
                <BsMenuButtonWideFill className='icon' /> Reports
            </a>
        </li>
    </ul>
    </aside>
  )
}
export default HeaderAdmin
