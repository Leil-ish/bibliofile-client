import React from 'react'
import {Link} from 'react-router-dom'
import './Nav.css'

export default class LibraryNav extends React.Component {

  render() {
    return (
      <div className='LibraryNav'>
        <ul className='LibraryNav_list'>
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
                to={`/notes`}
              >
                Notes
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
