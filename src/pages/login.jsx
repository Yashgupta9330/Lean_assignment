import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch hook
import axios from 'axios';
import "./signup.css"
import { setToken, setUser } from '../slices/AuthSlice';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch(); // Initialize useDispatch hook
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/login', { email, password });
      console.log('Login successful:', response.data);

      // Dispatch setUser and setToken actions to update Redux store
      dispatch(setUser(response.data.user)); // Assuming the response contains user data
      dispatch(setToken(response.data.token));// Assuming the response contains token data
      navigate('/'); 
    } 
    catch (error) {
      console.error('Login failed:', error.response.data);
    }
  };

  return (
    <div className="signup-container">
     <div className="signup-box">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <div className='user-info' style={{justifyContent:'space-between'}}>
        <Link  to="/signup"><span>create a account</span></Link>
        <button type="submit">Login</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;
