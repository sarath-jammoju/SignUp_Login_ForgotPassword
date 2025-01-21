import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
// import Dashboard from './Dashboard'
import axios from 'axios'

const Home = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout")
    .then(res => {
      if(res.data.status){
        navigate('/login')
      }
    })
    .catch(err => {
      console.log(err);
    })
    
  }
  return (
    <div>
        <br /><br /><br />
        <button><Link to = '/dashboard'>Dashboard</Link></button>
        <br /><br /><br />
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home
