import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';
function Signup() {
  const [userId, setUserId] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirpmassword] = useState();
  const navigate = useNavigate()
  
  const handlesubmit = (e) => {
    e.preventDefault()
    if (confirmpassword!==password)
    {
         console.log("Enter correct password");
         alert("Enter correct password")

    }
    else
      {axios.post('https://callog-backend.vercel.app/Signup', { userId, password })
        .then(result => {
          console.log(result.data)
          if (result.data.status === "ok") {
            alert("account created successfully");
            navigate('/')
          }
        })
        .catch(e => console.log(e))}

  }
  return (
    <div className="Signin">
      <div className="fir">
        <div className='se'>
          <form onSubmit={handlesubmit}  >
            <h2>Logo</h2>
            <p>Enter your credentials to access your account</p>
            <input type='text' placeholder='User ID' name="name" required onChange={(e) => setUserId(e.target.value)}></input>

            <input type='text' placeholder='Password' name="password" required onChange={(e) => setPassword(e.target.value)}></input>

            <input type='text' placeholder='Confirm Password' name="confirmpassword" required onChange={(e) => setConfirpmassword(e.target.value)} ></input><br></br><br></br>
            <button type='submit' >Signup</button><br></br><br></br>


          </form>
        </div>  
      </div>

    </div>
  );
}

export default Signup;