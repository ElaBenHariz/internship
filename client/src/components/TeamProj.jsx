import React, { useEffect } from 'react'
import BasicExample from './BasicExample'
import Button from 'react-bootstrap/esm/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProjects, getTeamProjects } from '../redux/slices/projectSlice'


function TeamProj() {
  const dispatch=useDispatch()
  const {teamProjects}=useSelector(state=>state.proj)
  useEffect(
    ()=>{
      dispatch(getTeamProjects())
      if (teamProjects) console.log(teamProjects)
    },[]
  )

  return (
    <div style={{padding:'1rem', display :'flex', flexDirection:'column' ,gap:'1rem'}}>
        <div>
        <div style={{display :'flex', flexDirection:'column'}}>
        <h5>Team Projects</h5>
        <label>You have {teamProjects?.length} projects</label>
        </div>
        <div style={{ display:'flex' , flexDirection:'row' , flexWrap:'wrap', gap:'1rem'}}>
        {teamProjects&&teamProjects.map(e=><BasicExample proj={e}></BasicExample>)}

</div>
</div>
    </div>
  )
}

export default TeamProj