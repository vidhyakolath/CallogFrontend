import React from 'react';
import { BrowserRouter, Route, Router, Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signin.css'
function Signin() {
  const [userId, setUserId] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate()
  const handlesubmit = (e) => {
    e.preventDefault()
    axios.post('https://callog-backend.vercel.app/', { userId, password })
      .then(result => {
        console.log(result.data)
        if(result.data.status==="ok")
        {
          alert("logged in successfully");
        navigate('/Contact')}
      })
      .catch(e => console.log(e))
      alert("wrong password or username")
    }
    return (
      <div className="Signin">
        <div className="fir">
          <div className='se'>
            <form onSubmit={handlesubmit}>
              <h2>Logo</h2>
              <p>Enter your credentials to access your account</p>
              <input type='text' placeholder='User ID' required name="name" onChange={(e)=>setUserId(e.target.value)}></input>
              <br></br><br></br>
              <input type='text' placeholder='Password' required  name="password" onChange={(e)=>setPassword(e.target.value)}></input>
              <br></br><br></br>
              <button type='submit'>Signin</button>
              <br></br><br></br>
              <NavLink className="nav" to="/Signup">Signup</NavLink>

            </form>
          </div>
        </div>

      </div>
    );
  }

  export default Signin;
