import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './login.css'
import logo from '../../images/DMNova.png'
import { useState } from 'react'
import IsValidPassword from '../../components/ValidatePassword'
import IsValidEmail from '../../components/ValidateEmail'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/slices/authSlice'



function Login() {
  const {user,error}=useSelector(state=>state.auth)
  const dispatch=useDispatch()
  const  [userData,setuserData]=useState({})
  const [showPasswordError,setShowPasswordError]=useState(false)
  const [showEmailError,setShowEmailError]=useState(false)
  const [IsEmptyEmail, setIsEmptyEmail]=useState(false)
  const [IsEmptyPass, setIsEmptyPass]=useState(false)


  
  const navigate=useNavigate()
  useEffect(()=>{
    if(user)
    navigate("/home")
   
  },[user,error])
  //input verification
  const loggging=(e)=>{
    e.preventDefault()

    setShowEmailError(false)
    setShowPasswordError(false)
    setIsEmptyEmail(false)
    setIsEmptyPass(false)

    if(!userData.Email ) 
    {setIsEmptyEmail(true) }
    else{
      if(!IsValidEmail(userData.Email)){ setShowEmailError(true) }
    }

    if ( !userData.Password){ setIsEmptyPass(true)}
    else{
      if(!IsValidPassword(userData.Password)) { setShowPasswordError(true) }
    }
    dispatch(login(userData))
    }

  return (
    <div className='log'>
  
        <img src={logo} alt='logo'></img>
        
        <hr />

        <h5>Login to your DmNova account and Manage your projects</h5>
        <div className='form'>
          <div className='inputAndlabels'>
        <label>Email </label> 
        <input type="email" placeholder='enter email' onChange={(e)=>{ setuserData({...userData, Email:e.target.value}) }} />
        <label  className={`errorLabel ${showEmailError ? 'show' : ''}` } >please enter a valid email !</label>
        <label   className={`errorLabel  ${IsEmptyEmail ? 'show': '' }`} > Empty Field ! </label>
        <label >Password</label>   
        <input  type='password' placeholder='password'  onChange={(e)=>{ setuserData({...userData, Password:e.target.value}) }}/> 
        <label  className={`errorLabel ${showPasswordError ? 'show' : ''}`} >please enter a valid password !</label>
        <label   className={`errorLabel  ${IsEmptyPass ? 'show': '' }`} > Empty Field ! </label>
        </div>
        <button onClick={loggging}> Sign in </button>
        </div>

        <div className='signup'>
        <label>New ?</label>
        <Link to="/signup"> Sign Up </Link> 
        </div>
    </div>
)
}

export default Login

