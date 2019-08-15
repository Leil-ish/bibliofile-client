import React from 'react'
import SingleBook from '../../components/SingleBook/SingleBook'
import ApiContext from '../../services/ApiContext'
import './LibraryPage.css'

export default class LibraryPage extends React.Component {

  static defaultProps = {
    books: [],
    notes: []
  }
  
  static contextType = ApiContext;

  render() {
    return (
      <section className='LibraryPage'>
        <h2>Library</h2>
        <ul>
          {this.context.books.map(book =>
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
      </section>
    )
  }
}
