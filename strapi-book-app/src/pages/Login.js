// src/pages/Login.js
import './login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api'; // Om du behåller loginUser i api.js

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      const userData = response.data.user;
      const token = response.data.jwt;
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('jwt', token);
      onLogin(userData);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label htmlFor='email'>Email</label><br></br>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}

          />
        </div>
        <div>
          <label htmlFor='password'>Password</label><br></br>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
          />
        </div>
        <button type='submit'>Login</button>
        <p>Don't have an account? <a href='/register'>Register</a></p>
      </form>
    </div>
  );
}

export default Login;
