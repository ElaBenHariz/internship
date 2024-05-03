import Sidebar from './../../components/Sidebar'
import Profil from '../../components/Profil'
import React, { useEffect } from 'react'
import ProjectFragment from '../../components/ProjectFragment'
import ProjFragm from '../../components/ProjFragm'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPersoProjects } from '../../redux/slices/projectSlice'
import TeamProj from '../../components/TeamProj'
import Button from 'react-bootstrap/esm/Button'
import AddProjModal from '../../components/AddProjModal'
import { getTeams } from '../../redux/slices/TeamSlice'





function Home() {
  const {user,error}=useSelector(state=>state.auth)
  const navigate=useNavigate()
  const {teams}=useSelector(state=>state.team)
  const dispatch=useDispatch()
  useEffect(()=>{
    if(!user)
    navigate("/login")
   
  },[user,error])
  useEffect(()=>{
    dispatch(getTeams())
  },[])
  return (

    <div className='home' style={{display:'flex' , flexDirection:'row'}}>
      <Sidebar/>
      <div style={{ display:'flex' , flexDirection:'column',paddingRight:"5vw" ,width:'100%'}}>
      <Profil></Profil>
      <AddProjModal></AddProjModal>
      <ProjFragm></ProjFragm>
      <ProjectFragment />
      <TeamProj></TeamProj>
         </div>
    </div>
  )
}

export default Home