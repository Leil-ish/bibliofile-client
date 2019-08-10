import React from 'react'
import {Link} from 'react-router-dom'
import SingleNote from '../../components/SingleNote/SingleNote'
import './NotesPage.css'

export default function NotesPage(props) {
  return (
    <section className='NotesPage'>
      <ul>
        {props.notes.map(note =>
          <li key={note.noteId}>
            <SingleNote
              id={note.noteId}
              name={note.title}
              modified={note.modified}
              content={note.content}
            />
          </li>
        )}
      </ul>
      <div className='NotesPage_button-container'>
        <Link
          to='/add-note'
          type='button'
          className='NotesPage_add-note-button'
        >
          <br />
          Note
        </Link>
      </div>
    </section>
  )
}

NotesPage.defaultProps = {
  notes: [],
}
