import React,{ useEffect,useState} from 'react'
import { Link, NavLink,useNavigate } from 'react-router-dom'
import Logo from '../assets/Logo.webp'; 

function Navbar() {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const Navigate = useNavigate()

  useEffect(()=>{
  },[])

  const LogoutFunc = () =>{
      localStorage.clear()
      setToken("")
      Navigate("/login")
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className='container'>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
    <Link to="/">
      <img src={Logo} alt="Logo" style={{ height: 30 }} />
    </Link>
    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
      <li className="nav-item">
        <NavLink className="nav-link" to="/">Home<span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/generate">Generate Image</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/View">View</NavLink>
      </li>
      <li className="nav-item">
        {localStorage.getItem("token") ? (
         <button style={{
          background: 'none',
          border: 'none',
          color: 'red',
          textDecoration: 'none',
          padding:0,
          paddingLeft: 8,
          margin:"8px 0px",
          font: 'inherit',
          cursor: 'pointer',
        }}onClick={() => LogoutFunc()}>Logout</button>
        ) : (
          <NavLink className="nav-link" to="/login">Login</NavLink>
        )}
      </li>
    </ul>

  </div>
  </div>
</nav>
  )
}

export default Navbar

