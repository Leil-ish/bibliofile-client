import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Input} from '../Utils/Utils'
import './LoginForm.css'

export default class Login extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }

  state = { error: null }

  render() {
    const { error } = this.state
    return (
      <form
        className='Login'
        onSubmit={this.handleSubmitBasicAuth}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='user_name'>
          <label htmlFor='Login_user_name'>
            User name
          </label>
          <Input
            required
            name='user_name'
            id='Login_user_name'>
          </Input>
        </div>
        <div className='password'>
          <label htmlFor='Login_password'>
            Password
          </label>
          <Input
            required
            name='password'
            type='password'
            id='Login_password'>
          </Input>
        </div>
        <Link className='Login_Submit' to='/library'>
          Login
        </Link>
      </form>
    )
  }
}