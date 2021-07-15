import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../../config';
import {  useToasts } from 'react-toast-notifications';
import Loader from "react-loader-spinner";

import { useDispatch, useSelector } from 'react-redux';

function UserSignUpPage() {
  const navigate = useNavigate();
  const { addToast: toast } = useToasts();
  const [status, setStatus] = useState('idle');
  const user = useSelector(state => state.user);
  const [formValues, setFormValues] = useState({
    name: null,
    email: null,
    password: null,
    username: null,
  });

  useEffect(() => {
    if(user.loggedInUser){
      navigate("/")
    }
  }, [user])

  const handleFormSubmit = async event => {    
    event.preventDefault();    
    try {            
      setStatus('loading');
      const response = await axios.post(
        `${API_URL}/signup`,
        formValues
      );
      setStatus('idle');
      if (response.data.success) {
        toast( `Account Created Successfully.`,{appearance: "success"});
        navigate('/signin');
      }
    } catch (error) {
      setStatus('idle');
      console.log(error.response);
      toast( error.response?.data?.message ? error.response?.data?.message : "Something Went Wrong",{appearance: "error"});
    }
  };

  const handleInput = event => {
    setFormValues(formValues => {
      formValues[event.target.name] = event.target.value;
      return {...formValues};
    });
  };

  return (
    <div className="Login container-center">
      <div className="container-center container-column login-form-container" style={{maxWidth:"600px"}}>
      <p style={{fontSize:"2rem"}} ><b>Sign Up</b></p>
              
          <form onSubmit={handleFormSubmit} className="basic-form-container container-column">
            <>
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
            <label for="name">
              Name: <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="name"
              type="text"
              className="input-area"
              name="name"
              values={formValues['name']}
              onChange={handleInput}
            />
          </div>
          <div className="basic-input-group">
            <label for="username">
              Username: <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="username"
              type="text"
              className="input-area"
              name="username"
              values={formValues['username']}
              onChange={handleInput}
            />
          </div>
          <div className="basic-input-group">
            <label for="password">
              Password: <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="password"
              type="text"
              className="input-area"
              name="password"
              values={formValues['password']}
              onChange={handleInput}
            />
          </div>
          <button className="btn btn-primary btn-login" style={{width:"100%"}} type="submit">
          {status === 'idle' && <span>Sign Up</span>}
                {status === 'loading' && <Loader type="TailSpin" color="#51c84d" height={20} width={20} />}
          </button>
            </>
          </form>
          <div className="container-space-between btn-Signup">
            <Link to="/signin">
              <p>Already Registered? Login🚀</p>
            </Link>
            <p></p>
          </div>
          <hr color="white" width="100%" className="btn-Signup" />
          <br />
        </div>
    </div>
  );
}

export default UserSignUpPage;
