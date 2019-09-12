import React from 'react';
import {Link} from 'react-router-dom';
import { Hyph } from '../Utils/Utils';
import TokenService from '../../services/token-service';
import './Nav.css';

export default class LibraryNav extends React.Component {

  handleLogoutClick = () => {
    TokenService.clearAuthToken()
  }

  renderLogoutLink() {
    return (
      <div className='LibraryNav_link'>
        <Link
          onClick={this.handleLogoutClick}
          to='/'>
          Logout
        </Link>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='LibraryNav_link'>
        <Link
          to='/signup'>
          Register
        </Link>
        <Hyph />
        <Link
          to='/login'>
          Log in
        </Link>
      </div>
    )
  }

  render() {
    return (
      <div className='LibraryNav'>
        <ul className='LibraryNav_list'>
            <li>
              {TokenService.hasAuthToken()
                ? this.renderLogoutLink()
                : this.renderLoginLink()}
            </li>
            <li>
              <Link
                className='LibraryNav_link'
                to={`/library`}
              >
                Library
              </Link>
            </li>
            <li>
              <Link
                className='LibraryNav_link'
                to={`/find-book`}
              >
                Find A Book
              </Link>
            </li>
            <li>
              <Link
                className='LibraryNav_link'
                to={`/add-book`}
              >
                Add A Book
              </Link>
            </li>
        </ul>
      </div>
    )
  }
}
