import React, { useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom'


const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const history = useHistory()
    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            props.showAlert("Already someone Login in this application","danger")
            history.push("/")
        }
        
        // modalOpenSet(false)
    }, [])

    const host = process.env.REACT_APP_host

    const HandleSubmit = async (e) => {
       try {
            e.preventDefault()

            const response = await fetch(`${host}api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
            const json = await response.json()
            if (json.status === true) {

                //To clear a specific item
                //localStorage.removeItem('token');
                localStorage.setItem('token', json.authToken)
                props.showAlert("Logged in Successfully", "success")
                history.push('/')

                //redirect
            }
            else {
                //   alert("False enter data")
                localStorage.setItem('token', '')
                props.showAlert("Invalid Credentials", "danger")
            }
        }
        catch(err)
        {
            console.log(err)

            props.showAlert("Login Failed", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={HandleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control my-2" name='email' id="exampleInputEmail1" required aria-describedby="emailHelp" value={credentials.name} onChange={onChange} placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control my-2" name='password' id="exampleInputPassword1" required placeholder="Password" value={credentials.password} onChange={onChange} />
                </div>
                <button type="Submit" className="btn btn-primary my-2">Submit</button>
            </form>
        </>
    )

}

export default Login
