import React from 'react'
import {useNavigate} from 'react-router-dom'

const NavigationButtons = () => {
     // const [action, setAction] = useState("Login");
      const navigate = useNavigate();
  return (
    <div>
        <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/signup')}>Sign Up</button>
    </div>
  )
}

export default NavigationButtons
