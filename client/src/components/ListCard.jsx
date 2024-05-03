import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import img from '../images/more.png'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown, DropdownButton, DropdownItem, Form } from 'react-bootstrap';
import { deleteCardFromList, moveCard, addCardToList, deleteList, EditList } from '../redux/slices/Tasks/ListSlice';


function ListCard({list}) {
  const [show,setShow]=useState(false)
  const [sh,setSh]=useState(false)
  const [cardToADD,setCardToAdd]=useState({})
  const [ListName,setListName]=useState("List name")
  const {Lists}=useSelector(state=>state.Lists)
  const dispatch=useDispatch()
  const sendToList=(x)=>{
      dispatch(moveCard({id_current_list:list._id,card_id:x.target.target,new_dest:x.target.name}))
      
      console.log("id_current_list",list._id) 
      console.log("card_id",x.target.target)
      console.log("new_dest",x.target.name)
  }

  useEffect(()=>{
    console.log(cardToADD)
  },[cardToADD])
  return (
    <div>
    <Card style={{width:"300px", height:'fit-content'}}>
     <Card.Header style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
      {!sh?
      <p> {list.name} </p> 
     : <Form.Control style={{fontWeight:'lighter', width:'75%'}} placeholder='Enter New name here' type='text' onKeyUp={(e) => {
      if (e.key === 'Enter') {  dispatch(EditList({ListId:list._id,name:e.target.value}));
        setSh(false);} }}>
      </Form.Control> }
      
        
    <Dropdown >
     <Dropdown.Toggle className='btnmembers' >
     <img  style={{width:'2vw', height:'4vh' }} src={img} ></img>
        </Dropdown.Toggle>
          <Dropdown.Menu style={{backgroundColor:''}}>
          <DropdownItem style={{color:'blue'}} onClick={()=>setSh(!sh)} >Edit list</DropdownItem>
           <DropdownItem style={{color:'red'}} onClick={()=>dispatch(deleteList(list._id))} >Delete list</DropdownItem>
          </Dropdown.Menu>
          </Dropdown>
      </Card.Header>
      <Card.Body className='listCard'>
        {list.cards?.length>0?list?.cards.map(e=> <blockquote className="blockquote mb-0">
          <div style={{display:"flex",justifyContent:"space-between"}}>
          <h4>{e?.Title}</h4>
          <div>
          <DropdownButton id="dropdown-basic-button " className='cardDrop' title="">
      <Dropdown.Item  className=' btn btn-secondary' style={{color:'red'}} onClick={()=>dispatch(deleteCardFromList({id_current_list:list._id,card_id:e?._id}))}>DELETE </Dropdown.Item>
      <DropdownButton
            
              id={`dropdown-button-drop-end`}
              drop={"end"}
              variant="secondary"
              title={`send to `}
              className='dropdown-item sendTobutton'
            >
              {Lists&&Lists?.map(list=><Dropdown.Item name={list._id} target={e?._id} onClick={sendToList} eventKey="1">{list.name}</Dropdown.Item>)}
             

            </DropdownButton>
    </DropdownButton>
    </div></div>
          <p>
          {e?.Description}
          </p>
          <footer className="blockquote-footer">
             {e?.Files?.length} File 
          </footer>
        </blockquote>):<h5>No Cards</h5>}
      {!show?<button onClick={()=>setShow(!show)} className='addbtn'>Add a card</button>:<div>
        <Form >
          <Form.Control style={{ margin: '10px 0' }} placeholder='card title' onChange={a=>setCardToAdd({...cardToADD,Title:a.target.value})}></Form.Control>
          <Form.Control  style={{ marginBottom: '10px' }} as="textarea" type="text"  placeholder='card description' onChange={a=>setCardToAdd({...cardToADD,Description:a.target.value})}></Form.Control>
          <Button style={{ marginRight: '10px',padding:'8px 15px'} } onClick={()=>{dispatch(addCardToList({list_id:list._id,card:cardToADD}));setShow(false)}}  >Add</Button>
          <Button style={{backgroundColor:'transparent',color:'blue',padding:'8px 15px'}} onClick={()=>setShow(false)}>X</Button>
       
        </Form>
        </div>} 

      </Card.Body>
    </Card>
    </div>
  );
}

export default ListCard;