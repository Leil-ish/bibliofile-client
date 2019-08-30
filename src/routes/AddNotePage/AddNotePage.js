import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Form from '../../components/Form/Form'
import BookApiService from '../../services/book-api-service'
import BookContext from '../../contexts/BookContext'
import {findBook} from '../../library-helper'
import './AddNotePage.css'

export default class AddNotePage extends Component {
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
    const {books} = this.context
    const {bookId} = this.props.match.params
    const book = findBook(books, bookId) || {content: ''}
    return (
      <section className='AddNotePage'>
        <h2>
          Add Note for {book.title}
        </h2>
        <Form>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input type='text' id='note-name-input' />
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea id='note-content-input' />
          </div>
          <div className='buttons'>
            <Link
              to='/notes'
              type='button'
              className='Add-note-button'
            >
            <br />
              Add Note
            </Link>
            <Link
              to='/library'
              type='button'
              className='Cancel-add-note-button'
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