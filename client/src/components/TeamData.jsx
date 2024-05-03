import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux'
import { getTeams } from '../redux/slices/TeamSlice'
import Table from 'react-bootstrap/Table';
import AddTeamModal from './AddTeamModal';
import { Button } from 'react-bootstrap';
import { getSpecificUsers } from '../redux/slices/usersSlice';
import Dropdown from 'react-bootstrap/Dropdown';


function TeamData() {
  const [showTeamDropdown, setShowTeamDropdown] = useState({});
  const [openTeamDropdown, setOpenTeamDropdown] = useState(null);
  const [show,setShow]=useState(false);
  const {teams}=useSelector(state=>state.team)
  const dispatch=useDispatch()
  useEffect(()=>{
     dispatch(getTeams())
  },[])


    const handleClose = () => setOpenTeamDropdown(null);

   

    const handleShow = (teamId) => {
      setOpenTeamDropdown(teamId === openTeamDropdown ? null : teamId);
    };
  
    return (
      <div style={{ width: '100%', display: 'flex' }}>
        <Sidebar></Sidebar>
        <div style={{ width: '100%', padding: '4vw', display: 'flex', flexDirection: 'column' }}>
          <AddTeamModal></AddTeamModal>
          <p></p>
  
          <Table style={{ width: '100%' }} striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams &&
                teams.map((team) => {
                  const isDropdownOpen = team.id === openTeamDropdown;
  
                  return (
                    <tr key={team.id}>
                      <td>{team.name}</td>
                      <td>{team.Description}</td>
                      <td style={{display:"flex"}}>
                        <p style={{ margin: '0' }}>
                          {team.members.length}
                        </p>
                      
                          <Dropdown >
                          <Dropdown.Toggle className='btnmembers' >
                          <Icon  icon="mingcute:right-line" width="25" height="25" color='black' />
                          </Dropdown.Toggle>

  
                            <Dropdown.Menu>
                              {team.members.map((e, index) => (
                                <Dropdown.Item key={index} eventKey={index + 1}>
                                  {e.name}
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
  
  export default TeamData;