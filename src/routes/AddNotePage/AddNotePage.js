import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Form from '../../components/Form/Form'
import ApiContext from '../../services/ApiContext'
import {findBook} from '../../library-helper'
import './AddNotePage.css'

export default class AddNote extends Component {
  static defaultProps = {
    books: [],
    notes: []
  }
  static contextType = ApiContext;

  render() {
    const {books} = this.context
    const {libraryId} = this.props.match.params
    const book = findBook(books, libraryId) || {content: ''}
    console.log(books)
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
              to='/notes'
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