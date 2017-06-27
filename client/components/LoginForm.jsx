import React from 'react'

const LoginForm = ({ handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <input onChange={handleChange} name="email" placeholder="Email" className="form-control" />
    <input onChange={handleChange} name="password" type="password" placeholder="Password" className="form-control" />
    <input type="submit" id="login" value="Login" className="btn btn-primary" />
  </form>
)

export default LoginForm
