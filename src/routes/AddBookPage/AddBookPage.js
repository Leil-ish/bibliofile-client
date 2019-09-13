import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Form from '../../components/Form/Form'
import BookContext from '../../contexts/BookContext'
import BookApiService from '../../services/book-api-service'
import {Button, Textarea} from '../../components/Utils/Utils';
import './AddBookPage.css'

export default class AddBookPage extends Component {
  static defaultProps = {
    match: { params: {} },
    onSaveBookSuccess: () => {},
  }

  static contextType = BookContext

  handleSubmit = ev => {
    ev.preventDefault()
    const {title, authors, description, categories, rating} = ev.target.value
    BookApiService.postCustomBook(title, authors, description, categories, rating)
      .then(() => {
        title.value = ''
        authors.value = ''
        description.value = ''
        categories.value = ''
        rating.value = ''
      })
      .then(this.context.addBook)
      .then(() => {
        this.props.onSaveBookSuccess()
      })
        .catch(this.context.setError)
  }

  render() {

    return (
      <section className='AddBookPage'>
        <h2>
          Add a Book to Your Library
        </h2>
        <Form 
          className='AddBookForm'
          onSubmit={(e) => this.handleSubmit(e)}>
          <div className='field'>
            <label htmlFor='book-title-input'>
              Title
            </label>
            <input type='text' name='title' id='title' />
          </div>
          <div className='field'>
            <label htmlFor='book-author-input'>
              Author
            </label>
            <input type='text' name='authors' id='authors' />
          </div>
          <div className='field'>
            <label htmlFor='book-categories-input'>
              Genre 
            </label>
            <input type='text' name='category' id='category' />
          </div>
          <div className='field'>
            <label htmlFor='book-description-input'>
              Synopsis
            </label>
            <Textarea 
              required
              aria-label='What is this book about?'
              name='description' 
              id='description'              
              cols='30'
              rows='3'
              placeholder='What is this book about?' />
          </div>
          <div className='select-input'>
            <label htmlFor='book-rating-input'>
              Rating
            </label>
            <select name='rating' id='rating'>
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
            <Button
                type='submit'
                className='Add-book-button'
              >
              <br />
                Add book to Library
            </Button>
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