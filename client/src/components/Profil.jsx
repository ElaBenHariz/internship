import React from 'react'
import profilePic from './../images/profilePic.png'
import { useSelector } from 'react-redux'

function Profil() {
  const {user}=useSelector(state=>state.auth)

  return (
    <div style={{display:'flex', width:'100%', justifyContent:'flex-end' , gap:'1rem', padding:'1rem'}}>
        <img src={profilePic} alt='error' style={{height:'fit-content'}}/> 
        <div style={ {display:'flex' , flexDirection: 'column', fontFamily :'Poppins', color:'#2E2E2E'}}>
        <label style={{ fontWeight:'bold'}}>{user?.Name&&user?.Name} </label>
        <label>{user?.email&&user?.email}</label>
        </div>
    </div>
  )
}

export default Profil