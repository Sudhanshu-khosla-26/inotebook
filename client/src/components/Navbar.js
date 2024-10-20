import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Navbar = () => {
  let navigator = useNavigate()
  let location = useLocation();
  const handlelogout = ()=>{
    localStorage.removeItem('token');
    navigator('/login')
  }
  // useEffect(()=>{
  //   console.log(location.pathname);
  // }, [location]);
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/iNoteBook">iNoteBook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/iNoteBook"?"active": ""}`} aria-current="page" to="/iNoteBook">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/about"?"active": ""}`} to='/about'>About</Link>
            </li>
          </ul>
          {!localStorage.getItem("token")?<form className="d-flex">
            <Link className="btn btn-primary mx-1" to="/login" role="button">Log In</Link>
            <Link className="btn btn-primary mx-1" to="/signup" role="button">Sign Up</Link>
          </form>:<button onClick={handlelogout} className='btn btn-primary'> Log Out</button>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar;