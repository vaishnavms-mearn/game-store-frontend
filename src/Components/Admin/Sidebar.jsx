import React, { useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { Link, NavLink } from 'react-router-dom';
import './css/sidebar.css';
import img from '../../Assets/images/gamepad.png'
const Sidebar = ({ onCollapse }) => {
  const [collapsed, setCollapsed] = useState(false);
  const handleCollapseToggle = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    onCollapse(newState);
  }
  const [activeLink, setActiveLink] = useState('');

  const handleNavLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    <div className='sidebar-container' style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar collapsed={collapsed} textColor="#fff" backgroundColor="#1A181B">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large" onClick={handleCollapseToggle}></i>} >
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
          <img
                    src={img}
                    height='40'
                    alt=''
                    className='mx-3'
                    loading='lazy'
                /><h5 className='mt-2'>Game Paradise</h5>
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/games"  >
              <CDBSidebarMenuItem
                className={`custom-sidebar-menu-item ${activeLink === '/add-games' ? 'activeClicked ' : ''}`}
                onClick={() => handleNavLinkClick('/games')}
                icon="columns"
              >
                Games
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/add-games"  >
              <CDBSidebarMenuItem  className={`custom-sidebar-menu-item ${activeLink === '/add-games' ? 'activeClicked ' : ''}`}
                onClick={() => handleNavLinkClick('/add-games')}
                icon="table">Add Games</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/profile" >
              <CDBSidebarMenuItem icon="user">Orders</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>


      </CDBSidebar>
    </div>
  );
};

export default Sidebar;