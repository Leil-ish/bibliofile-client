import React from 'react'
import SingleNote from '../../components/SingleNote/SingleNote'
import NoteListContext from '../../contexts/NoteListContext'
import NoteApiService from '../../services/note-api-service'
import './NotesPage.css'

export default class NotesPage extends React.Component {

  static defaultProps = {
    books: [],
    notes: []
  }
  
  static contextType = NoteListContext;

  componentDidMount() {
    this.context.clearError()
    NoteApiService.getNotes()
      .then(this.context.setNoteList)
      .catch(this.context.setError)
  }
  
  render() {
    return (
      <section className='NotesPage'>
        <ul>
          {this.context.notes.map(note =>
            <li key={note.bookId}>
              <SingleNote
                book_id={note.book_id}
                title={note.title}
                book={note.book}
                modified={note.modified}
                content={note.content}
              />
            </li>
          )}
        </ul>
      </section>
    )
  }
}
