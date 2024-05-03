
import React, { isValidElement, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../images/DMNova.png'
import  './Sign.css'
import { register } from '../../redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import IsValidPassword from '../../components/ValidatePassword'
import IsValidEmail from '../../components/ValidateEmail'
import errorimg from '../../images/alert.png'

function Signup() {

    const  [userData,setUser]=useState({})
    const [showPasswordError,setShowPasswordError]=useState(false)
    const [showEmailError,setShowEmailError]=useState(false)
    const {user,error}=useSelector(state=>state.auth)
    const navigate=useNavigate()
    useEffect(()=>{
      if(user)
      navigate("/home")
     
    },[user,error])
    const dispatch=useDispatch()

      const signup=(e)=>{  
      e.preventDefault();

      setShowEmailError(false)
      setShowPasswordError(false)

        if(!userData.name ||  !userData.Email || !userData.Password) { alert ("Empty fields !"); return ;}
        else{

          if(!IsValidPassword(userData.Password)) {setShowPasswordError(true) }  //input verification
          if(!IsValidEmail(userData.Email)){ setShowEmailError(true)}

        }
        dispatch(register(userData) )
      
      }

  return (
    <div className='sign'>
        <img src={logo} alt='logo'></img>
        
        <hr />
        <h5>Create your DmNova account and Manage your projects</h5>


        <div className='form'>
          <div className='inputAndlabels'>
        <label>Name </label> 
        <input  type='text' placeholder='enter your name'  onChange={(e)=>{ setUser({...userData, name:e.target.value}) }}/> 
        <label>Email </label> 
        <input  type='email' placeholder='enter email'  onChange={(e)=>{ setUser({...userData, Email:e.target.value}) }}/>
        <div  className={`errorLabel ${showEmailError ? 'show' : ''}` }>
            <label  >please enter a valid Email !</label>
        </div>
        <label>Password</label>   
        <input type='password' placeholder='password'   onChange={(e)=>{ setUser({...userData, Password:e.target.value}) }}/>
        <div  className={`errorLabel ${showEmailError ? 'show' : ''}`}>
            
            <label  >please enter a valid password !</label>
        </div>
    
        </div>
        <button onClick={signup}> Sign up </button>

    
        </div>
       
        <div className='login'>
          <label> Have an account ?</label>
          <Link to="/login"> login </Link> 
        </div>


    </div>
)
}

export default Signup