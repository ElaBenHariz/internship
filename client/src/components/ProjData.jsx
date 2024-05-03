import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { addList, getLists } from '../redux/slices/Tasks/ListSlice';
import { useLocation, useParams } from 'react-router-dom';
import ListCard from './ListCard';
import proj1 from '../images/projWall/proj1.jpg';
import proj2 from '../images/projWall/proj2.jpg';
import proj3 from '../images/projWall/be1.jpg';
import proj4 from '../images/projWall/be.jpg';
import proj5 from '../images/projWall/proj5.jpg';
import { Button, Form } from 'react-bootstrap';

function ProjData() {
    const { id } = useParams();
    const [showList, setShowList] = useState(false);
    const [show, setShow] = useState(false);
    const [ListToAdd, setListToAdd] = useState("New list");
    const [selectedImage, setSelectedImage] = useState(null);
    const { Lists } = useSelector(state => state.Lists);
    const { projects } = useSelector(state => state.proj);
    const projet = projects.find(project => project._id === id);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLists(id));
    }, []);

    const changeTheme = (image) => {
        setSelectedImage(image);
    };

    return (
        <div style={{ display: 'flex', width: '100vw' }}>
          <Sidebar style={{ left: "0", zIndex: "99999999"}} />
            <div style={{ position: 'fixed', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px', display: 'flex', justifyContent: 'space-between', zIndex: 999 }}>
                <p>hello</p>
                <p style={{ color: 'white', fontWeight: 'bolder',marginLeft:'20vw'}}>{projet?.name}</p>
                <div style={{display:'flex', flexDirection:'column'}}>
                <Button onClick={() => setShow(!show)} >Change Theme</Button>
                {/* List of small images */}
                {show &&
                    <div>
                        <img src={proj1} alt="Project 1" style={{ width: '50px', height: 'auto', cursor: 'pointer' }} onClick={() => changeTheme(proj1)} />
                        <img src={proj2} alt="Project 2" style={{ width: '50px', height: 'auto', cursor: 'pointer' }} onClick={() => changeTheme(proj2)} />
                        <img src={proj3} alt="Project 3" style={{ width: '50px', height: '30px', cursor: 'pointer' }} onClick={() => changeTheme(proj3)} />
                        <img src={proj4} alt="Project 4" style={{ width: '50px', height: '30px', cursor: 'pointer' }} onClick={() => changeTheme(proj4)} />
                        <img src={proj5} alt="Project 5" style={{ width: '50px', height: '30px', cursor: 'pointer' }} onClick={() => changeTheme(proj5)} />
                    </div>
                }
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundImage: `url(${selectedImage || proj2})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', paddingTop: '67px' }}>
                <div style={{ width: '100%', padding: "2vw", display: "flex", gap: "2vw", height: '100vh' }}>
                    <div style={{ display: "flex", gap: "2vw" }}>
                        {Lists?.map(e => <ListCard list={e} id key={e._id} />)}
                    </div>
                    {!showList ?
                        <button style={{ width: '60px !important', alignSelf: 'flex-start', backgroundColor: 'white', borderRadius: '27px', fontWeight: 'bold', width: '100px', border: '0', color: 'blue', padding: '10px' }} onClick={() => setShowList(!showList)} >Add a list</button> :
                        <div>
                            <Form style={{ backgroundColor: 'white', padding: '8px 16px 20px 16px', borderRadius: '8px' }}>
                                <Form.Control style={{ margin: '10px 0' }} placeholder='List title' onChange={a => setListToAdd({ ListToAdd, name: a.target.value })}></Form.Control>
                                <Button style={{ marginRight: '10px', padding: '6px 12px' }} onClick={() => { dispatch(addList({ projectId: id, name: ListToAdd })); setShowList(false) }}>Add</Button>
                                <Button style={{ backgroundColor: 'transparent', color: 'blue', padding: '6px 12px' }} onClick={() => setShowList(false)}>Cancel</Button>
                            </Form>
                        </div>}
                </div>
            </div>
        </div>
    );
}

export default ProjData;
