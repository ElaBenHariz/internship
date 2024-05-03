import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { addProject } from '../redux/slices/projectSlice';




function AddProjModal() {
  const [show, setShow] = useState(false);
  const [projDetails,setDetails]=useState({})
  const {teams}=useSelector(state=>state.team)
  const dispatch=useDispatch()
  const r1=useRef()
  const handleClose=()=>setShow(false);
  const handleStop = () => 
  {

    dispatch(addProject(projDetails))
    setShow(false);
  }
  const handleShow = () => setShow(true);
  useEffect(()=>{
    console.log(r1)
  },[])
  return (
    <>
            <Button onClick={handleShow} style={{ alignSelf:'end', width :'fit-content', backgroundColor:'rgba(24, 24, 24, 1)', borderColor:'rgba(24, 24, 24, 1)', color:'#FFFFFF'}}> Add Project</Button>


      <Modal centered    show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Project Name</Form.Label>
        <Form.Control onChange={e=>setDetails({...projDetails,name:e.target.value})} type="Text" placeholder="Enter name" />
    </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>description</Form.Label>
        <Form.Control onChange={e=>setDetails({...projDetails,description:e.target.value})} as="textarea" type="text" placeholder="Project description" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Type </Form.Label>
        <div style={{display:"flex"}}>
        <Form.Check // prettier-ignore
            type={"radio"}
            label={`Personal project `}
            name='btn'
            onChange={e=>setDetails({...projDetails,isTeamProject:false})}
          />
        <Form.Check // prettier-ignore
            type={"radio"}
            label={`team project `}
            name='btn'
            onChange={e=>setDetails({...projDetails,isTeamProject:true})}
            ref={r1}
          /></div>
      </Form.Group  >
      {r1&&r1.current?.checked? <div>
        <label>Choose a team</label>
      <Form.Select onChange={e=>setDetails({...projDetails,team:e.target.value})} >
        {teams&&teams.map(team=><option value={team._id}>
          {team.name}
        </option>)}
      </Form.Select>
        
         </div> : null}
      
    </Form>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleStop}>
            Add project
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProjModal;