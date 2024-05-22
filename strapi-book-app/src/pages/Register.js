// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css'; // Skapa en CSS-fil för specifik styling om det behövs

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1337/api/auth/local/register', {
        username: username,
        email: email,
        password: password,
      });
      console.log('Registration successful:', response.data);
      // Spara JWT-token i lokal lagring eller cookie om det behövs
      localStorage.setItem('jwt', response.data.jwt);
      navigate('/'); // Navigera tillbaka till startsidan eller en annan sida efter registrering
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registrering misslyckades. Vänligen försök igen.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label><br></br>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label><br></br>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already a member? <a href="/login">Log in!</a>
      </p>
    </div>
  );
}

export default Register;
