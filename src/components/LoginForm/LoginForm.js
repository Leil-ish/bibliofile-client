import React, {Component} from 'react';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import {Button, Input} from '../Utils/Utils';
import './LoginForm.css';

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }

  state = {error: null}

  //Handle JWT auth login
  handleSubmitJwtAuth = ev => {
    ev.preventDefault()
    this.setState({ error: null })
    const {username, password} = ev.target

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        username.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
        this.props.onLoginSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
    }

  render() {
    const {error} = this.state
    return (
      <form
        className='LoginForm'
        onSubmit={this.handleSubmitJwtAuth}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='username'>
          <label htmlFor='LoginForm_username'>
            Username
          </label>
          <Input
            required
            name='username'
            id='Login_username'>
          </Input>
        </div>
        <div className='password'>
          <label htmlFor='LoginForm_password'>
            Password
          </label>
          <Input
            required
            name='password'
            type='password'
            id='Login_password'>
          </Input>
        </div>
        <Button type='submit' className='LoginForm_Submit'>
          Login
        </Button>
      </form>
    )
  }
}