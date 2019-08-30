import React from 'react'
import SingleBook from '../../components/SingleBook/SingleBook'
import LibraryContext from '../../contexts/LibraryContext'
import BookApiService from '../../services/book-api-service'
import {Section} from '../../components/Utils/Utils'
import './LibraryPage.css'

export default class LibraryPage extends React.Component {

  static contextType = LibraryContext;

  componentDidMount() {
    this.context.clearError()
    BookApiService.getBooks()
      .then(this.context.setLibrary)
      .catch(this.context.setError)
  }

  renderLibrary() {
    const {books = []} = this.context
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
          {books.map(book =>
            <SingleBook
              id={book.id}
              title={book.title}
              authors={book.authors}
              categories={book.categories}
              description={book.description}
              image_links={book.image_links}
              borrowed={book.borrowed}
              rating={book.rating}
            />
          )}
        </ul>
      </section>
    )
  }

  render() {
    const {error} = this.context
    return (
      <Section list className='LibraryPage'>
        {error
          ? <p className='red'>There was an error, try again</p>
          : this.renderLibrary()}
      </Section>
    )
  }

}
