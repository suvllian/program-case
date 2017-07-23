import React, { Component } from 'react'
import LoginForm from './login-form/index.jsx'
import './index.scss'
import loginBg from './../../assets/login_bg.png'

const bgStyle = { backgroundImage: `url(${loginBg})` }

class loginPage extends Component {
  render() {
    return (
      <div className="login-page" style={bgStyle}>
        <LoginForm />
      </div>
    )
  }
}

export default loginPage;