import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form,Col} from 'react-bootstrap';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { addPersoProjects } from '../redux/slices/projectSlice';
import { getUsers } from '../redux/slices/usersSlice';
import { addTeam } from '../redux/slices/TeamSlice';

function AddTeamModal() {
   
  const [show, setShow] = useState(false);
  const [teamDetails,setDetails]=useState({})
  const [field, setField] = useState([]);
 const {users}=useSelector(state=>state.userrs)
  const dispatch=useDispatch()
  const handleClose=()=>{setShow(false)};
  const handleStop = () => 
  {
   dispatch(addTeam(teamDetails))
    setShow(false);
  }
  const handleShow = () => setShow(true);
  const [options,setOptions]=useState([])
  const [selectedValues, setSelectedValues] = useState([]);

  const handleSelectChange = selectedOptions => {
    console.log(selectedOptions)
    // Mise à jour de l'état avec les options sélectionnées
    setSelectedValues(selectedOptions);
    setDetails({...teamDetails,members:selectedValues.map(selectedValue=> selectedValue.value )})
  };
  useEffect(()=>{
    dispatch(getUsers());
    console.log(selectedValues)
    console.log(teamDetails)
  },[])

  useEffect(()=>{
    setDetails({...teamDetails,members:selectedValues.map(selectedValue=> selectedValue.value )})

  },[selectedValues])



  return (
    <>
            <Button onClick={handleShow} style={{ alignSelf:'end', width :'fit-content', backgroundColor:'rgba(24, 24, 24, 1)', borderColor:'rgba(24, 24, 24, 1)', color:'#FFFFFF'}}> Add Team</Button>

      <Modal centered    show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Team Name</Form.Label>
        <Form.Control onChange={e=>setDetails({...teamDetails,name:e.target.value})} type="Text" placeholder="Enter name" />
    </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Team Description</Form.Label>
        <Form.Control onChange={e=>setDetails({...teamDetails,Description:e.target.value})} as="textarea" type="text" placeholder="Describe your team" />
      </Form.Group>
      <Select isMulti options={  users.map(user =>{return {value: user._id  ,     label: user?.name}})}
      value={selectedValues}
      onChange={(e)=>setSelectedValues(e)} placeholder="select members"/>
    
    </Form>
   
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleStop}>
            ADD
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTeamModal;