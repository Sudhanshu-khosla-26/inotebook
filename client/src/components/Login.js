import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""})
    let navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`https://inotebook-lyart.vercel.app/api/auth/login`,{
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //redirect
            localStorage.setItem("token", json.authtoken);
            props.showAlert("Logged in successfully", "success")
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
        <>
        <div className="mt-3">

        <h2>Login To Continue To iNoteBook</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" value={credentials.email} className="form-control" name='email' id="email" aria-describedby="emailHelp" onChange={onchange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" value={credentials.password} className="form-control" name='password' id="password" onChange={onchange}/>
            </div>
           
            <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
        </div>
        </>
    )
}

export default Login;
