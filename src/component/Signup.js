import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Signup = (props) => {

    const history = useHistory()
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' })

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { name, email, password, cpassword } = credentials

        if (password === cpassword) {

            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password })
            });
            const json = await response.json()
            //console.log(json)
            if (json.success === true) {

                //To clear a specific item
                //localStorage.removeItem('token');
                localStorage.setItem('token', json.authToken)
                props.showAlert("Account Created Successfully","success")

                history.push('/')

                //redirect
            }
            else {
                // alert("False enter data")
                props.showAlert("Invalid Details","danger")
            }
        }
        else {
            // alert("Last two field value must be same")
            props.showAlert("Two password field value must be same","danger")
        }
    }


    return (
        <>
            <h1>Signup</h1>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control my-2" id="name" minLength={3} name='name' value={credentials.name} required onChange={onChange} aria-describedby="emailHelp" placeholder="Enter name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control my-2" id="email" name='email' value={credentials.email} required onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwoed">Password</label>
                        <input type="password" className="form-control my-2" id="passwoed" name='password' value={credentials.password} required onChange={onChange} placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cpasswoed">Confirm password</label>
                        <input type="password" className="form-control my-2" id="cpasswoed" name='cpassword' value={credentials.cpassword} required minLength={5} onChange={onChange} placeholder="Confirm password" />
                    </div>
                    <button type="submit" className="btn btn-primary my-2">Submit</button>
                </form>
            </div>
        </>
    )

}

export default Signup
