import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Form from '../../components/Form/Form'
import BookContext from '../../contexts/BookContext'
import BookApiService from '../../services/book-api-service'
import {Button, Input, Textarea} from '../../components/Utils/Utils';
import './AddBookPage.css'

class AddBookPage extends Component {
  
  static defaultProps = {
    match: { params: {} },
    onSaveBookSuccess: () => {},
  }

  static contextType = BookContext

  handleSubmit = ev => {
    ev.preventDefault()
    const {title, authors, description, categories} = ev.target
    BookApiService.postCustomBook(title.value, authors.value, description.value, categories.value)
      .then(this.context.addBook)
      .then(() => {
        title.value = ''
        authors.value = ''
        description.value = ''
        categories.value = ''
      })
      .then(() => {
        this.props.onSaveBookSuccess()
        this.props.history.push(`/library`)
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
          onSubmit={this.handleSubmit}
          >
          <div className='field'>
            <label htmlFor='book-title-input'>
              Title
            </label>
            <Input required type='text' name='title' id='title' />
          </div>
          <div className='field'>
            <label htmlFor='book-author-input'>
              Author
            </label>
            <Input required type='text' name='authors' id='authors' />
          </div>
          <div className='field'>
            <label htmlFor='book-categories-input'>
              Genre 
            </label>
            <Input required type='text' name='categories' id='categories' />
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

export default withRouter(AddBookPage)