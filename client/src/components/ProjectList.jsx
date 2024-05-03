import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProjects, getPersoProjects, getTeamProjects, reset } from '../redux/slices/projectSlice'
import ProjCard from './ProjCard'

function ProjectList() {
    const {pathname}=useLocation()

    const {projects,personalProjects,teamProjects}=useSelector(state=>state.proj)
    console.log(pathname)
    const dispatch=useDispatch()
    useEffect(()=>{
        switch(pathname){
            case "/personalProj":dispatch(getPersoProjects());break;
            case "/allProjects":dispatch(getAllProjects());break;
            case "/teamProj":dispatch(getTeamProjects());break;
           }
       dispatch(reset())
    },[pathname])
  return (
    <div style={{display:"flex"}}>
              <Sidebar style={{position:"sticky",top:0  }}/>
     <div  style={{display:"flex",gap:"2vw",flexWrap:"wrap",height:"240px",padding:"3vw",height:"100vh",width:"100%", overflowY:"scroll"}}>
       {projects&&projects.map(e=><ProjCard  Proj={e}></ProjCard>)}
       {personalProjects&&personalProjects.map(e=><ProjCard Proj={e}></ProjCard>)}
       {teamProjects&&teamProjects.map(e=><ProjCard Proj={e}></ProjCard>)}
    </div></div>
  )
}

export default ProjectList