import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Form from '../../components/Form/Form'
import BookApiService from '../../services/book-api-service'
import BookContext from '../../contexts/BookContext'
import {Textarea, Button} from '../../components/Utils/Utils'
import './AddNotePage.css'

export default class AddNotePage extends Component {
  static defaultProps = {
    match: { params: {} },
  }

  static contextType = BookContext

  handleSubmit = ev => {
    ev.preventDefault()
    const {book} = this.context
    const {content, note_name} = ev.target
    BookApiService.postNote(book.id, content.value, note_name.value)
      .then(this.context.addNote)
      .then(() => {
        content.value = ''
        note_name.value = ''
      })
      .catch(this.context.setError)
  }

  componentDidMount() {
    const { bookId } = this.props.match.params
    this.context.clearError()
    BookApiService.getBook(bookId)
      .then(this.context.setBook)
      .catch(this.context.setError)
    BookApiService.getBookNotes(bookId)
      .then(this.context.setNotes)
      .catch(this.context.setError)
  }

  componentWillUnmount() {
    this.context.clearBook()
  }

  render() {
    const {book} = this.context

    return (
      <section className='AddNotePage'>
        <h2>
          Add Note for {book.title}
        </h2>
        <Form 
          className='AddNoteForm'
          onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input type='text' id='note_name' name='note_name' />
          </div>
          <div className='text'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <Textarea
              required
              aria-label='Type your note...'
              name='content'
              id='content'
              cols='30'
              rows='3'
              placeholder='Type your note..'>
          </Textarea>
          </div>
          <div className='buttons'>
            <Button type='submit'>
              Add Note
            </Button>
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

//Wasn't there an episode of Star Trek with sentient mists?