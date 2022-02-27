import React from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import { auth } from '../firebase'

const Navbar = (props) => {
    let navigate = useNavigate();

    const logoutButton = () => {
        auth.signOut().then(() => {
            navigate("login")
        });
    }

  return (
    <div className="navbar navbar-dark bg-dark">
            <Link style={{marginLeft:"10px"}} to="/" className="navbar-brand">React Admin</Link>
            <div>
                <div className="d-flex">
                    <NavLink style={{marginRight:"2px"}} className="btn btn-dark" to="/">
                        Home
                    </NavLink>
                    {
                        props.firebaseUser &&  
                            <NavLink style={{marginRight:"10px"}} className="btn btn-dark" to="/admin">
                                Admin
                            </NavLink>
                    }
                     {
                        props.firebaseUser &&  
                            <NavLink style={{marginRight:"10px"}} className="btn btn-dark" to="/task">
                                Task
                            </NavLink>
                    }
                   
                    {
                        props.firebaseUser !== null ? (
                            <button 
                                className="btn btn-dark"
                                onClick={()=>logoutButton()}
                            >
                                Logout
                            </button>
                        ) : 
                        (
                            <NavLink style={{marginRight:"10px"}} className="btn btn-dark" to="/login">
                                Login
                            </NavLink>
                        )
                    }
                </div>
            </div>
        </div>
  )
}

export default Navbar