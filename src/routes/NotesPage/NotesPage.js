import React from 'react'
import SingleNote from '../../components/SingleNote/SingleNote'
import LibraryContext from '../../contexts/LibraryContext'
import BookApiService from '../../services/book-api-service'
import {Section} from '../../components/Utils/Utils'
import './NotesPage.css'

export default class NotesPage extends React.Component {

  static contextType = LibraryContext;

  static defaultProps = {
    match: {
      params: {}
    }
  }

  componentDidMount() {
    this.context.clearError()
    BookApiService.getBooks()
      .then(this.context.setLibrary)
      .catch(this.context.setError)
    BookApiService.getNotes()
      .then(this.context.setNoteList)
      .catch(this.context.setError)
  }

  renderNotes() {
    let {notes = []} = this.context
    console.log(this.context)

    return (
      <section className='NotesPage'>
        <ul>
          <li>
            {notes.map(note =>
                <SingleNote
                  key={note.book_id}
                  note_name={note.note_name}
                  content={note.content}
                />
            )}
          </li>
        </ul>
      </section>
    )
  }

  render() {
    const {error} = this.context
    return (
      <Section list className='NotesPage'>
        {error
          ? <p className='red'>There was an error, try again</p>
          : this.renderNotes()}
      </Section>
    )
  }
}
