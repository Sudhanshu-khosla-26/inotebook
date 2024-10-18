import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""});
  let navigate = useNavigate();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const {name, email, password} = credentials;
    const response = await fetch(`https://inotebook-lyart.vercel.app/api/auth/createuser`,{
        method: "POST",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify({name, email ,password})
    });
    const json = await response.json();
    console.log(json);
        //redirect
        if(json.success){
          localStorage.setItem("token", json.authtoken);
          props.showAlert("Account created successfully", "success")
          navigate("/iNoteBook");
        }
        else{
          props.showAlert("Invalid credentials", "danger")
        }
}

const onchange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
}


  return (
    <div className="container mt-3">
    <h2>Create An Account To Use iNoteBook</h2>
    <form onSubmit={handleSubmit}>
       <div className="mb-3">
        <label htmlFor="name" className="form-label">Full Name</label>
        <input type="text" onChange={onchange} className="form-control" name='name' id="name" aria-describedby="emailHelp"/>
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" onChange={onchange} className="form-control" name='email' id="email" aria-describedby="emailHelp"/>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" onChange={onchange} className="form-control" name='password' id="password" required/>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Confirm Password</label>
        <input type="password" onChange={onchange} className="form-control" name='cpassword' id="cpassword" required minLength={5}/>
      </div>
      <button type="submit" className="btn btn-primary my-2">Create Account</button>
    </form>
    </div>
  )
}

export default Signup
