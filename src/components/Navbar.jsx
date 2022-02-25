import React from 'react'
import {Link, NavLink} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark">
            <Link style={{marginLeft:"10px"}} to="/" className="navbar-brand">React Admin</Link>
            <div>
                <div className="d-flex">
                    <NavLink style={{marginRight:"2px"}} className="btn btn-dark" to="/">
                        Inicio
                    </NavLink>
                    <NavLink style={{marginRight:"10px"}} className="btn btn-dark" to="/admin">
                        Admin
                    </NavLink>
                    <NavLink style={{marginRight:"10px"}} className="btn btn-dark" to="/task">
                        Task
                    </NavLink>
                    <NavLink style={{marginRight:"10px"}} className="btn btn-dark" to="/login">
                        Login
                    </NavLink>
                </div>
            </div>
        </div>
  )
}

export default Navbar