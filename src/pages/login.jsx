import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch hook
import axios from 'axios';
import "./signup.css"
import { setToken, setUser } from '../slices/AuthSlice';
import { Link, useNavigate } from 'react-router-dom';
import Textinput from '../components/Textinput';
import Button from '../components/Button';
import { BACKEND_Link } from '../utils/Links';

const Login = () => {
  const dispatch = useDispatch(); // Initialize useDispatch hook
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(BACKEND_Link+'/login', { email, password });
      console.log('Login successful:', response.data);
      dispatch(setUser(response.data.user)); 
      dispatch(setToken(response.data.token));
      setError(false);
      setMessage('Sign up successful!');
      navigate('/'); 
    } 
    catch (error) {
      setError(true);
      setMessage('Error in signing up');
      console.error('Login failed:', error.response.data);
    }
  };

  return (
    <div className="signup-container">
     <div className="signup-box">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Textinput label="Email" value={email} onChange={(value) => setEmail(value)} required={true} />
        <Textinput label="Password" value={password} onChange={(value) => setPassword(value)} required={true}/>
        {error && <div className="error-message">{message}</div>}
        {!error && <div className="success-message">{message}</div>}
        <div className='user-info' style={{justifyContent:'space-between'}}>
        <Link  to="/signup"><span>create a account</span></Link>
        <div onClick={handleSubmit}>
        <Button disabled={email.trim() === "" || password.trim() === ""}/>
        </div>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;
