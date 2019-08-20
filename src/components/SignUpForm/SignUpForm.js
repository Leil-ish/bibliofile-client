import React, {Component} from 'react'
import {Button, Input, Required} from '../Utils/Utils'
import AuthApiService from '../../services/auth-api-service'
import './SignUpForm.css'

export default class SignUpForm extends Component {
  static defaultProps = {
    onSignUpSuccess: () => {}
  }

  state = {error: null}

  handleSubmit = ev => {
    ev.preventDefault()
    const {firstName, lastName, username, password } = ev.target

    this.setState({ error: null })
    AuthApiService.postUser({
      username: username.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
    })
      .then(user => {
        firstName.value = ''
        lastName.value = ''
        username.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
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
          <div className='firstName'>
            <label htmlFor='SignUpForm_firstName'>
              First name <Required />
            </label>
            <Input
              name='firstName'
              type='text'
              required
              id='SignUpForm_firstName'>
            </Input>
          </div>
          <div className='lastName'>
            <label htmlFor='SignUpForm_lastName'>
              Last Name <Required />
            </label>
            <Input
              name='lastName'
              type='text'
              required
              id='SignUpForm_lastName'>
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
          <Button type='submit'>
            Register
          </Button>
      </form>
    )
  }
}