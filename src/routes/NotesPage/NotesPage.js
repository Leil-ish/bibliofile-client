import React from 'react'
import SingleNote from '../../components/SingleNote/SingleNote'
import ApiContext from '../../services/ApiContext'
import './NotesPage.css'

export default class NotesPage extends React.Component {

  static defaultProps = {
    books: [],
    notes: []
  }
  
  static contextType = ApiContext;
  
  render() {
    return (
      <section className='NotesPage'>
        <ul>
          {this.context.notes.map(note =>
            <li key={note.libraryId}>
              <SingleNote
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
