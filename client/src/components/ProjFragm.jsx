import React, { useEffect } from 'react'
import BasicExample from './BasicExample'
import Button from 'react-bootstrap/esm/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProjects } from '../redux/slices/projectSlice'



function ProjFragm() {
  const dispatch=useDispatch()
  const {projects}=useSelector(state=>state.proj)
  useEffect(
    ()=>{
      dispatch(getAllProjects())
      if (projects) console.log(projects)
    },[]
  )

  return (
    <div style={{padding:'1rem', display :'flex', flexDirection:'column' ,gap:'1rem'}}>
        <div>
        <h5>Projects</h5>
        <label>You have {projects?.length} projects</label>
        </div>
        <div style={{ display:'flex' , flexDirection:'row' , flexWrap:'wrap', gap:'1rem'}}>

        {projects&&projects.map(e=><BasicExample  proj={e}></BasicExample>)}

</div>

    </div>
  )
}

export default ProjFragm