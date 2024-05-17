import React from 'react';
import { BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill } from 'react-icons/bs';
import '../../styles/admin.css';
import { Link } from 'react-router-dom'; 
function Adminsiderbar({ openSidebarToggle }){
    const nav_link_admin = [
        {
            path: '/admin/dashboard',
            display: 'Dashboard',
            icon: BsGrid1X2Fill 
        },
        {
            path: '/admin/tours',
            display: 'Tour',
            icon: BsFillArchiveFill
        },
      
        {
            path: '/admin/customer',
            display: 'Customer',
            icon: BsPeopleFill
        },
        {
            path: '/admin/reviewproduct',
            display: 'Review Product',
            icon: BsFillGrid3X3GapFill
        },
        {
            path: '/admin/tourmanagement',
            display: 'Tour Management',
            icon: BsFillGrid3X3GapFill
        }
    ];

  return(
    <aside id="admin-sidebar" className={openSidebarToggle ? "admin-sidebar-responsive" : ""}>
            <div className='navigation_admin'>
                {nav_link_admin.map((item, index) => (
                    <ul className='admin-sidebar-list' key={index}>
                        <li className='admin-sidebar-list-item'>
                            <Link to={item.path}> {/* Sử dụng Link thay vì NavLink */}
                                <item.icon className='admin-icon' /> {item.display}
                            </Link>
                        </li>
                    </ul>
                ))}
            </div>
        </aside>
  )
}

export default Adminsiderbar;
