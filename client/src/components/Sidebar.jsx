import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton  from 'react-bootstrap/DropdownButton';
import foldericon from './../images/Foldericon.png'
import vector from './../images/Vectorrr.png'
import Task from './../images/Task.png';
import { Icon } from '@iconify/react';
import './Sidebar.css'




import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const Sidebar = () => {
const dispatch=useDispatch()
  return (
    <div style={{ left: "0",
    zIndex: "99999999", display: 'flex', height: '100vh', overflow: 'scroll initial', position:'sticky',top:'0'  }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader >
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            DM Nova
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>


            <div style={ {display:'flex', flexDirection:'row', alignItems:'center' }}>
           <img src={vector} alt="error"  style={{ height:'fit-content' }}></img>
            <NavLink exact to="/" activeClassName="activeClicked" style={{ padding:'0'}} >
              <CDBSidebarMenuItem >Dashboard</CDBSidebarMenuItem>
            </NavLink>
            </div>


            <div style={ {display:'flex', flexDirection:'row',  alignItems:'center'  }}>
            <img src={Task} alt="error" style={{ height:'fit-content' }} ></img>
            <NavLink exact to="/tables" activeClassName="activeClicked">
              <CDBSidebarMenuItem >Teams</CDBSidebarMenuItem>
            </NavLink>
            </div>


            <div id='proj' style={ {display:'flex', flexDirection:'row',  alignItems:'center'  }}>
              <img src={foldericon} alt="error" style={{ height:'fit-content' }} ></img>
            <DropdownButton id="dropdown-item-button" title="Projects" >
              <NavLink to='/allProjects'><Dropdown.Item as="button"> All projects </Dropdown.Item></NavLink>
            <NavLink to='/personalProj'> <Dropdown.Item as="button"> Personal projects </Dropdown.Item> </NavLink>
              <NavLink to='/teamProj'>        <Dropdown.Item as="button"> Team projects</Dropdown.Item></NavLink>
            
            </DropdownButton>
            </div>

          </CDBSidebarMenu>

          <a onClick={()=>{ dispatch(logout()) }} activeClassName="activeClicked">
              <div style={{display:'flex',  flexDirection:'row',  alignItems:'center' }}>
              <Icon icon="fe:logout" color="white" width="26" height="26"/>
              <CDBSidebarMenuItem >logout</CDBSidebarMenuItem>
              </div>
             
            </a>
        </CDBSidebarContent>
      

      </CDBSidebar>
    </div>
  );
};

export default Sidebar;