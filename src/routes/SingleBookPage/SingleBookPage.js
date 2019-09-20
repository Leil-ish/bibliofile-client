import React, {Component} from 'react';
import BookContext from '../../contexts/BookContext'
import BookApiService from '../../services/book-api-service'
import { Section } from '../../components/Utils/Utils'
import Form from '../../components/Form/Form'
import './SingleBookPage.css'

export default class SingleBookPage extends Component {

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
      BookApiService.getBookNotes(bookId)
        .then(this.context.setNotes)
        .catch(this.context.setError)
    }
  
    componentWillUnmount() {
      this.context.clearBook()
    }
  
    renderBook() {
      const { book, notes } = this.context
      return <>
        <BookContent book={book} />
        <BookNotes notes={notes} />
        <Form />
      </>
    }
  
    render() {
      const { error, book } = this.context
      let content
      if (error) {
        content = (error.error === `Book doesn't exist`)
          ? <p className='red'>Book not found</p>
          : <p className='red'>There was an error</p>
      } else if (!book.id) {
        content = <div className='loading' />
      } else {
        content = this.renderBook()
      }
      return (
        <Section className='BookPage'>
          {content}
        </Section>
      )
    }
  }
  
  function BookContent({ book }) {
    return (
      <div className='BookPage'>
        <h1 className='BookPage_content'>
          {book.title}
        </h1>
        <img src={book.image_links} alt='book cover'/>
        <p className='BookPage_content'>
          {book.description}
        </p>
      </div>
    )
  }
  
  function BookNotes({ notes = [] }) {
    return (
      <ul className='BookPage_note-list'>
        <h2>Notes:</h2>
        {notes.map(note =>
          <li key={note.id} className='BookPage_note'>
            <h3 className='BookPage_note-title'>
              {note.note_name}
            </h3>
            <p className='BookPage_note-text'>
              {note.content}
            </p>
          </li>
        )}
      </ul>
    )
  }