import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Form from '../../components/Form/Form'
import BookContext from '../../contexts/BookContext'
import BookApiService from '../../services/book-api-service'
import {Button, Input, Textarea} from '../../components/Utils/Utils';
import './AddBookPage.css'

export default class AddBookPage extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
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
          onSubmit={(ev) => this.handleSubmit(ev)}>
          <div className='field'>
            <label htmlFor='book-title-input'>
              Title
            </label>
            <Input type='text' name='title' id='title' />
          </div>
          <div className='field'>
            <label htmlFor='book-author-input'>
              Author
            </label>
            <Input type='text' name='authors' id='authors' />
          </div>
          <div className='field'>
            <label htmlFor='book-category-input'>
              Genre 
            </label>
            <Input type='text' name='category' id='category' />
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