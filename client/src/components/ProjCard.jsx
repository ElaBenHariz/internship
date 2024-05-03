import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import getRandomImage from './getRandomImage';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { deleteProject } from '../redux/slices/projectSlice';



function ProjCard({Proj}) {
  const dispatch=useDispatch()
  return (
    <Card style={{ width: '18rem' ,height:"fit-content"}}>
      <Card.Img style={{height:"170px"}} variant="top" src={getRandomImage()} />
      <Card.Body>
        <Card.Title>{Proj.name}</Card.Title>
       
        <Card.Text>
         {Proj.description}
        </Card.Text>
         <div style={{display:"flex",alignItems:"center", justifyContent:'space-between'}}>
          <NavLink to={"/"+Proj._id}>
        <Button variant="primary">View Project</Button>
        </NavLink>
        <div style={{display:"flex",alignItems:"center"}}>
        {!Proj.isTeamProject? 
        <Icon icon="material-symbols-light:delete-outline" color="red" width="31" height="31" onClick={()=>dispatch(deleteProject(Proj._id))} />:<></>}
        <p style={{margin:"0"}}>{Proj.files.length} Files  </p>
        </div>
        </div>
      </Card.Body>
      
    </Card>
  );
}

export default ProjCard;