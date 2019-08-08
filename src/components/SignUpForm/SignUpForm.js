import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Input, Required} from '../Utils/Utils'
import './SignUpForm.css'

export default class SignUpForm extends Component {
  static defaultProps = {
    onSignUpSuccess: () => {}
  }

  state = { error: null }

  handleSubmit = ev => {
    ev.preventDefault()
    const { full_name, nick_name, user_name, password } = ev.target

    console.log('registration form submitted')
    console.log({ full_name, nick_name, user_name, password })

    full_name.value = ''
    nick_name.value = ''
    user_name.value = ''
    password.value = ''
    this.props.onSignUpSuccess()
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
          <div className='full_name'>
            <label htmlFor='SignUpForm_full_name'>
              Full name <Required />
            </label>
            <Input
              name='full_name'
              type='text'
              required
              id='SignUpForm_full_name'>
            </Input>
          </div>
          <div className='user_name'>
            <label htmlFor='SignUpForm_user_name'>
              User name <Required />
            </label>
            <Input
              name='user_name'
              type='text'
              required
              id='SignUpForm_user_name'>
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
          <div className='nick_name'>
            <label htmlFor='SignUpForm_nick_name'>
              Nickname
            </label>
            <Input
              name='nick_name'
              type='text'
              required
              id='SignUpForm_nick_name'>
            </Input>
          </div>
          <Link className='SignUpForm_Submit' to='/library'>
            Sign Up
          </Link>
      </form>
    )
  }
}