import React from 'react'

export const Login = () => {
  return (
    <div className="col-lg-8 offset-lg-2">
    <h2>Login</h2>
    <form name="form" >
        <div className="form-group">
            <label>Username</label>
            <input type="text" name="username"  className={'form-control' } />
        </div>
        <div className="form-group">
            <label>Password</label>
            <input type="password" name="password"  className={'form-control' } />
                <div className="invalid-feedback">Password is required</div>
        </div>
        <div className="form-group">
            <button className="btn btn-primary">
                Login
            </button>
        </div>
    </form>
</div>
  )
}
