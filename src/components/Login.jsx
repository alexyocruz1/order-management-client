import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import M from 'materialize-css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, { username, password });
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        onLogin();
        M.toast({ html: 'Login successful!', classes: 'green' });
        navigate('/admin');
      }
    } catch (error) {
      M.toast({ html: 'Invalid credentials', classes: 'red' });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m6 offset-m3">
          <h3 className="center-align">Login</h3>
          <form onSubmit={handleSubmit} className="card-panel">
            <div className="input-field">
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="validate"
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="input-field">
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="validate"
              />
              <label htmlFor="password">Password</label>
            </div>
            <button className="btn waves-effect waves-light" type="submit" name="action">
              Login
              <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;