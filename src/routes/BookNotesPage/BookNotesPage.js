import React from 'react'
import {Section} from '../../components/Utils/Utils'
import {Link} from 'react-router-dom'
import Form from '../../components/Form/Form'
import BookContext from '../../contexts/BookContext'
import SingleNote from '../../components/SingleNote/SingleNote'
import BookApiService from '../../services/book-api-service'
import './BookNotesPage.css'

export default class BookNotesPage extends React.Component {

  static contextType = BookContext;

  static defaultProps ={
    match: { params: {} },
    books: [],
    notes: []
  }

  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
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
    const { book, notes } = this.context
    console.log(this.context)
    return <>
      <h2>Note for {book.title}</h2>
      <Link
            to={`/library/${book.id}/add-note`}
            type='button'
            className='Add-note-button'
          >
          <h3>Add a New Note to this Book</h3>
      </Link>
      <NotesContent notes = {notes} />
      <Form />
    </>
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

function NotesContent({ notes }) {
  return (
    <ul>
      {notes.map(note =>
        <SingleNote
          key={note.note_name}
          book_id={note.book_id}
          note={note}
          onDeleteNote={this.handleDeleteNote}
        />
      )}
    </ul>
  )
}
