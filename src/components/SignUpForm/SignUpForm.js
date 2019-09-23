import React, {Component} from 'react';
import {Button, Input, Required} from '../Utils/Utils';
import AuthApiService from '../../services/auth-api-service';
import './SignUpForm.css';

export default class SignUpForm extends Component {
  static defaultProps = {
    onSignUpSuccess: () => {}
  }

  state = {error: null}

  handleSubmit = ev => {
    ev.preventDefault()
    const {first_name, last_name, username, password } = ev.target

    this.setState({ error: null })
    AuthApiService.postUser({
      username: username.value,
      password: password.value,
      first_name: first_name.value,
      last_name: last_name.value,
    })
      .then(user => {
        first_name.value = ''
        last_name.value = ''
        username.value = ''
        password.value = ''
        this.props.onSignUpSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='SignUpForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
          <div className='first_name'>
            <label htmlFor='SignUpForm_first_name'>
              First name <Required />
            </label>
            <Input
              name='first_name'
              type='text'
              required
              id='SignUpForm_first_name'>
            </Input>
          </div>
          <div className='last_name'>
            <label htmlFor='SignUpForm_last_name'>
              Last Name <Required />
            </label>
            <Input
              name='last_name'
              type='text'
              required
              id='SignUpForm_last_name'>
            </Input>
          </div>
          <div className='username'>
            <label htmlFor='SignUpForm_username'>
              Username <Required />
            </label>
            <Input
              name='username'
              type='text'
              required
              id='SignUpForm_username'>
            </Input>
          </div>
          <div className='password'>
            <label htmlFor='SignUpForm_password'>
              Password <Required />
            </label>
            <Input
              name='password'
              type='password'
              required
              id='SignUpForm_password'>
            </Input>
          </div>
          <Button type='submit' className='SignUpForm_Submit'>
            Register
          </Button>
      </form>
    )
  }
}