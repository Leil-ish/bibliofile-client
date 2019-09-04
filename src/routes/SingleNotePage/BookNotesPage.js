import React from 'react'
import {Section} from '../../components/Utils/Utils'
import Form from '../../components/Form/Form'
import BookContext from '../../contexts/BookContext'
import BookApiService from '../../services/book-api-service'
import TokenService from '../../services/token-service'
import config from '../../config'
import './BookNotesPage.css'

export default class BookNotesPage extends React.Component {

  static contextType = BookContext;

  static defaultProps ={
    onDeleteNote: () => {},
    match: { params: {} },
    books: [],
    notes: []
  }

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
          return res.json()
      })
      .then(() => {
        this.context.deleteNote(noteId)
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  componentDidMount() {
    const {bookId} = this.props.match.params
    this.context.clearError()
    BookApiService.getBookNotes(bookId)
      .then(this.context.setNotes)
      .catch(this.context.setError)
  }

  componentWillUnmount() {
    this.context.clearNote()
  }
  renderNote() {
    const { book, note } = this.context
    return <>
      <h2>Note for {book.title}</h2>
      <h3>{note.note_name}</h3>
      <NoteContent note={note} />
      <Form />
    </>
  }

  render() {
    const { error, note } = this.context
    let content
    if (error) {
      content = (error.error === `Book doesn't exist`)
        ? <p className='red'>Note not found</p>
        : <p className='red'>There was an error</p>
    } else if (!note.id) {
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

function NoteContent({ note }) {
  return (
    <div className='NotePage'>
      <h1 className='NotePage_content'>
        {note.note_name}
      </h1>
      <p className='NotePage_content'>
        {note.content}
      </p>
    </div>
  )
}
