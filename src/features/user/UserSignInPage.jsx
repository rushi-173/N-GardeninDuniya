import { unwrapResult } from '@reduxjs/toolkit';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, logout } from './userSlice';
import {
  saveUserDataToLocalStorage,
  setupAuthExceptionHandler,
  setupAuthHeaderForServiceCalls,
} from './utils';

import Loader from "react-loader-spinner";
import { useToasts } from 'react-toast-notifications';

import {Link} from "react-router-dom";
function UserSignInPage() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const{ addToast }= useToasts();
  // const [status, setStatus] = useState('idle');
  const [formValues, setFormValues] = useState({
    email: null,
    password: null,
  });
  useEffect(() => {
    if(user){
      navigate("/")
    }
  }, [user])

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      let result = await dispatch(login(formValues));
      result = unwrapResult(result);
      setupAuthExceptionHandler(dispatch, logout, navigate, addToast);
      addToast(`Logged In Successfully.`,{appearance:"success"});
      navigate('/');
    } catch (error) {
      console.log(error.response);     
      addToast(error.message,{appearance:"error"}); 
   
    }
  };

  const handleInput = event => {
    setFormValues(formValues => {
      formValues[event.target.name] = event.target.value;
      return { ...formValues };
    });
  };

  return (
    <div className="Login container-center">
      
      <div className="container-center container-column login-form-container" style={{maxWidth:"600px"}}> 
        <p style={{fontSize:"2rem"}} ><b>Login</b></p>
          <form onSubmit={handleFormSubmit} className="basic-form-container container-column">
         
              <div className="container container-column">
              <div className="basic-input-group">
            <label for="email">
              Email: <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="email"
              type="email"
              className="input-area"
              name="email"
              values={formValues['email']}
              onChange={handleInput}
            />
          </div>
          <div className="basic-input-group">
            <label for="password">
              Password: <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="password"
              type="password"
              className="input-area"
              
              name="password"
              values={formValues['password']}
              onChange={handleInput}
            />
            <small className="err-msg"></small>
          </div>
          <button className="btn btn-primary btn-login" style={{width:"100%"}} type="submit">
          {(user.status === 'idle' || user.status === 'error') && (
                  <span>Log In</span>
                )}
                {user.status === 'loading' && <Loader type="TailSpin" color="#51c84d" height={20} width={20} />}
          </button>
          {/* <small className="err-msg">{error}</small> */}
           </div>
          </form>
          <div className="container-space-between btn-login">
            <Link to="/signup">
              <p>Register Now 🚀</p>
            </Link>
            <p>🤔 Forgot Password?</p>
          </div>
          <hr color="white" width="100%" className="btn-login" />
          <br />
      </div>
      </div>
  );
}

export default UserSignInPage;
