import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'


const Login = () => {

    const [credentials,setCredentials]=useState({email:'',password:''})

    let history=useHistory()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        
        const response= await fetch("http://localhost:5000/api/auth/login",{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json= await response.json()
          if (json.status===true)
          {

            //To clear a specific item
            //localStorage.removeItem('token');
              localStorage.setItem('token', json.authToken)
              history.push('/')

              //redirect
          }
          else{
              alert("False enter data")
          }
    }

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    return (
        <>
            I am login
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" value={credentials.name} onChange={onChange} placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" name='password' id="exampleInputPassword1" placeholder="Password" value={credentials.password} onChange={onChange}/>
                </div>
                <button type="Submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )

}

export default Login
