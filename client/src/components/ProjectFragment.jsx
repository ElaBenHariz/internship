import React, { useEffect } from 'react'
import BasicExample from './BasicExample'
import { useDispatch, useSelector } from 'react-redux'
import { getPersoProjects } from '../redux/slices/projectSlice'


function ProjectFragment() {
  const dispatch=useDispatch()

  const {personalProjects}=useSelector(state=>state.proj)
  useEffect(()=>{

    dispatch(getPersoProjects())
  },[])
  return (
    <div style={{padding:'1rem',  display :'flex', flexDirection:'column' ,gap:'1rem'}}>
        <div>
        <h5> Personal projects</h5>
        <label>You have {personalProjects?.length} projects</label>
        </div>
        <div style={{ display:'flex' , flexDirection:'row' , flexWrap:'wrap', gap:'1rem'}}>

          {personalProjects&&personalProjects.map(e=><BasicExample proj={e}></BasicExample>)}
       
        </div>

    </div>
  )
}

export default ProjectFragment