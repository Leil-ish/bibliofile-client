import React from 'react';
import {Link} from 'react-router-dom';
import TokenService from '../../services/token-service';
import './Nav.css';

export default class LibraryNav extends React.Component {

  handleLogoutClick = () => {
    TokenService.clearAuthToken()
  }

  renderLogoutLink() {
    return (
      <div className='LibraryNav_main'>
        <ul>
          <li>
            <Link
              onClick={this.handleLogoutClick}
              to='/'>
              <i className="fas fa-sign-out-alt"></i>
            </Link>
          </li>
          <li>
            <Link
              className='LibraryNav_link'
              to={`/library`}
                >
                <i className="fas fa-book"></i>
            </Link>
          </li>
          <li>
              <Link
                className='LibraryNav_link'
                to={`/find-book`}
              >
                <i className="fas fa-search"></i>
              </Link>
          </li>
          <li>
              <Link
                className='LibraryNav_link'
                to={`/add-book`}
              >
                <i className="fas fa-plus"></i>
              </Link>
          </li>
        </ul>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='LibraryNav_landing'>
        <ul>
          <li>
            <Link
              className='LibraryNav_landing'
              to='/signup'>
              Register
            </Link>
          </li>
          <li>
            <Link
              className='LibraryNav_landing'
              to='/login'>
              Log in
            </Link>
          </li>
        </ul>
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
        </ul>
      </div>
    )
  }
}
