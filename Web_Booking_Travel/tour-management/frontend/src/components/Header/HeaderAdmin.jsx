import React from 'react'
import { BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsMenuButtonWideFill } from 'react-icons/bs';
import '../../styles/admin.css'
import { NavLink } from 'reactstrap';
function HeaderAdmin({openSidebarToggle, OpenSidebar}) {
    
const nav_link_admin = [
    {
        path: '/admin/dashboard',
        display: 'Dashboard'
    },
    {
        path: '/admin/categories',
        display: 'Categories'
    },
    {
        path: '/admin/Customer',
        display : 'Customer'
    },
    {
        path:'/admin/ReviewProduct',
        display:'Review Product'
    }
];

    return (
    <aside id="admin-sidebar" className={openSidebarToggle ? "admin-sidebar-responsive" : ""}>
    <div className='admin-header'>
      ADMIN
    </div>
    <div className='navigation_admin'>
        {
            nav_link_admin.map((item,index)=>(
                <ul className='admin-sidebar-list'>
                    <li className='admin-sidebar-list-item' key={index}>
                        <a href={item.path}>
                        <BsGrid1X2Fill className='icon' /> {item.display}
                        </a>
                    </li>
                </ul>
            ))
        }
         
    </div>


    </aside>
  )
}
export default HeaderAdmin
