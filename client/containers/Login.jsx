import React from 'react'
import LoginForm  from '../components/LoginForm.jsx'
import axios from 'axios'

class Login extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt){
    this.setState({ [evt.target.name]: evt.target.value })
  }

  handleSubmit(evt){
    evt.preventDefault()
    const email = this.state.email
    const password = this.state.password

    axios.post('/api/login', { email, password })
      .catch()
  }

  render(){
    return (
      <LoginForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default Login
