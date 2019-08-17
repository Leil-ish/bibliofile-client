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
        <div className='input'>
            <label htmlFor='book-filter-input'>
              Filter library by:
            </label>
            <select id='book-filter-input'>
                <option value="print">Print Books</option>
                <option value="ebook">eBooks</option>
            </select>
          </div>          
          <div className='input'>
            <label htmlFor='book-sort-input'>
              Sort library by:
            </label>
            <select id='input'>
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="rating">Rating</option>
                <option value="borrowed">Borrowed</option>
                <option value="genre">Genre</option>
            </select>
          </div>
        <ul>
          {this.context.books.map(book =>
            <li key={book.libraryId}>
              <SingleBook
                libraryId={book.libraryId}
                title={book.title}
                author={book.author}
                categories={book.categories}
                textSnippet={book.textSnippet}
                rating={book.rating}
              />
            </li>
          )}
        </ul>
      </section>
    )
  }
}
