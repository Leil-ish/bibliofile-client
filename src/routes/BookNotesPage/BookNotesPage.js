import React from 'react'
import {Section} from '../../components/Utils/Utils'
import {Link} from 'react-router-dom'
import BookContext from '../../contexts/BookContext'
import SingleNote from '../../components/SingleNote/SingleNote'
import BookApiService from '../../services/book-api-service'
import './BookNotesPage.css'

export default class BookNotesPage extends React.Component {

  static contextType = BookContext;

  static defaultProps ={
    match: { params: {} },
  }

  componentDidMount() {
    const {bookId} = this.props.match.params
    this.context.clearError()
    BookApiService.getBookNotes(bookId)
      .then(this.context.setNotes)
      .catch(this.context.setError)
    BookApiService.getBook(bookId)
      .then(this.context.setBook)
      .catch(this.context.setError)
    }

  componentWillUnmount() {
    this.context.clearNote()
  }

  renderNote() {
    const {book, notes} = this.context

    if (notes.length===0) {
      return (
        <div className='BookNotesPage'>
        <h2>{book.title}</h2>
        <h3 className='Notes-subtitle'>No Notes Yet</h3>
          <Link
              to={`/library/${book.id}/add-note`}
              type='button'
              className='Add-book-note-button'
            >
            <p>Add Note</p>
          </Link> 
          <Link
              to={`/library/${book.id}`}
              type='button'
              className='Back-to-book-button'
            >
            <p>Back to Book</p>
          </Link> 
      </div>
      )
    } else {
      return (
        <div className='BookNotesPage'>
          <h2>{book.title}</h2>
          <h3 className='Notes-subtitle'>Notes</h3>
          <ul className='BookNotesPage_note-list'>
            <li>
              {notes.map(note =>
                <SingleNote
                  key={note.note_name + 'key'}
                  noteId={note.id}
                  bookId={note.book_id}
                  note_name={note.note_name}
                  note={note}
                  onDeleteNote={this.handleDeleteNote}
                  {...book}
                />
              )}
              </li>
            </ul>
            <Link
                to={`/library/${book.id}/add-note`}
                type='button'
                className='Add-book-note-button'
              >
              <p>Add Note</p>
            </Link> 
            <Link
                to={`/library/${book.id}`}
                type='button'
                className='Back-to-book-button'
              >
              <p>Back to Book</p>
            </Link> 
        </div>
      ) 
    }
  }

  render() {
    const { error, notes } = this.context
    let content
    if (error) {
      content = (error.error === `Book doesn't exist`)
        ? <p className='red'>Note not found</p>
        : <p className='red'>There was an error</p>
    } else if (!notes) {
      content = <div className='loading' />
    } else {
      content = this.renderNote()
    }
    return (
      <Section className='NotePage'>
        {content}
      </Section>
    )
  }
}
