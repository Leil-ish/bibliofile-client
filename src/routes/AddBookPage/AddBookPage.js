import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Form from '../../components/Form/Form'
import BookContext from '../../contexts/BookContext'
import BookApiService from '../../services/book-api-service'
import './AddBookPage.css'

export default class AddBookPage extends Component {
  static defaultProps = {
    match: { params: {} },
  }

  static contextType = BookContext

  componentDidMount() {
    const { bookId } = this.props.match.params
    this.context.clearError()
    BookApiService.getBook(bookId)
      .then(this.context.setBook)
      .catch(this.context.setError)
    BookApiService.getBookComments(bookId)
      .then(this.context.setComments)
      .catch(this.context.setError)
  }

  componentWillUnmount() {
    this.context.clearBook()
  }

  render() {

    return (
      <section className='AddBookPage'>
        <h2>
          Add a Book to Your Library
        </h2>
        <Form>
          <div className='field'>
            <label htmlFor='book-title-input'>
              Title
            </label>
            <input type='text' id='book-title-input' />
          </div>
          <div className='field'>
            <label htmlFor='book-author-input'>
              Author
            </label>
            <input type='text' id='book-author-input' />
          </div>
          <div className='field'>
            <label htmlFor='book-categories-input'>
              Genre 
            </label>
            <input type='text' id='book-categories-input' />
          </div>
          <div className='field'>
            <label htmlFor='book-description-input'>
              Synopsis
            </label>
            <textarea id='book-description-input' />
          </div>
          <div className='select-input'>
            <label htmlFor='book-rating-input'>
              Rating
            </label>
            <select id='book-rating-input'>
                <option value="1">1 &#9733;</option>
                <option value="2">2 &#9733;</option>
                <option value="3">3 &#9733;</option>
                <option value="4">4 &#9733;</option>
                <option value="5">5 &#9733;</option>
            </select>
          </div>
          <br/>          
          <br/>
          <div className='buttons'>
            <Link
              to='/library'
              type='button'
              className='Add-book-button'
            >
            <br />
              Add Book
            </Link>
            <Link
              to='/find-book'
              type='button'
              className='Cancel-add-book-button'
            >
            <br />
              Cancel
            </Link>
          </div>
        </Form>
      </section>
    )
  }
}