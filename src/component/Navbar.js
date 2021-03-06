import React from 'react';
import { Link,useHistory,useLocation } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
//after installing bootstrap using npm command we import the required bootstrap file to  use bootstrap classes;

const Navbar = (prop) => {
    const location=useLocation()
    const history=useHistory()
    // useEffect(()=>{
    //     console.log(location)  Here I check Location variable value
    // },[location])

    const handleLogOut=()=>{
        localStorage.removeItem('token')
        prop.showAlert("Logout Successfully","success")
        history.push('/login')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/'?'active':''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/about'?'active':''}`} to="/about">About</Link>
                            </li>
                        </ul>
                        { !localStorage.getItem('token') ?<form className='d-flex'>
                        <Link className="btn btn-primary mx-1" to='/login' role='button'>Login</Link>
                        <Link className="btn btn-primary" to='/signup' role='button'>SignUp</Link>
                        </form>: <button className="btn btn-primary" onClick={handleLogOut}>Logout</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar;