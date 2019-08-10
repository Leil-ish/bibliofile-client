import React from 'react'
import {Link} from 'react-router-dom'
import SingleBook from '../../components/SingleBook/SingleBook'
import './LibraryPage.css'

export default function LibraryPage (props) {
    return (
      <section className='LibraryPage'>
        <ul>
          {props.books.map(book =>
            <li key={book.libraryId}>
              <SingleBook
                libraryId={book.libraryId}
                title={book.title}
                author={book.author}
                description={book.description}
              />
            </li>
          )}
        </ul>
        <div className='link-container'>
          <Link
            tag={Link}
            to='/add-note'
            type='button'
            className='LibraryPage_add-book-button'
          >
            <br />
            Book
          </Link>
        </div>
      </section>
    )
  }

LibraryPage.defaultProps = {
    notes: [],
}