import React from 'react'
import SingleBook from '../../components/SingleBook/SingleBook'
import dummyStore from '../../dummy-store'
import './LibraryPage.css'

export default class LibraryPage extends React.Component {

  state = {
    books: [],
    notes: [],
  }

  componentDidMount() {
    setTimeout(() => this.setState(dummyStore), 600)
  }
  
  render() {
    console.log(this.state)

    return (
      <section className='LibraryPage'>
        <ul>
          {this.state.books.map(book =>
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
