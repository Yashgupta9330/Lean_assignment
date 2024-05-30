// SignupForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch hook
import { setToken, setUser } from '../slices/AuthSlice';
import Textinput from '../components/Textinput';
import Button from '../components/Button';
import { BACKEND_Link } from '../utils/Links';


const SignupForm = () => {
  const dispatch = useDispatch(); // Initialize useDispatch hook
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (name,value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;
    
    if (password !== confirmPassword) {
      setError(true);
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(BACKEND_Link+'/signup', {
        Name: name,
        email,
        password,
        confirmPassword
      });

      if (response.status === 200) {
        setError(false);
        setMessage('Sign up successful!');
        
        // Dispatch actions to store user data and token in Redux
        dispatch(setUser(response.data.user));
        dispatch(setToken(response.data.token));
        
        // Navigate to home page after successful signup
        navigate("/");
      } else {
        setError(true);
        setMessage(response.data.message);
      }
    } catch (error) {
      setError(true);
      setMessage('Error in signing up');
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
            <Textinput label="name" value={formData.name} name="name" onChange={(value)=>{handleChange("name",value)}} required={true} />
            <Textinput label="email" name="email" value={formData.email} onChange={(value)=>{handleChange("email",value)}} required={true} />
            <Textinput label="password" name="password" value={formData.password} onChange={(value)=>{handleChange("password",value)}} required={true} />
            <Textinput label="confirm-password" name="confirmPassword" value={formData.confirmPassword} onChange={(value)=>{handleChange("confirmPassword",value)}} required={true}/>
          {error && <div className="error-message">{message}</div>}
          {!error && <div className="success-message">{message}</div>}
          <div className='user-info' style={{justifyContent:'space-between'}}>
           <Link to="/login"><span>Already have a account</span></Link>
           <Button disabled={formData.email.trim() === "" || formData.password.trim() === "" || formData.confirmPassword.trim() === "" || formData.name.trim() === ""}>Sign Up</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
