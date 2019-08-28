import React from 'react'
import SingleNote from '../../components/SingleNote/SingleNote'
import BookContext from '../../contexts/BookContext'
import {findNote} from '../../library-helper'
import './SingleNotePage.css'

export default class SingleNotePage extends React.Component {
    static defaultProps = {
        books: [],
        notes: []
      }

  static contextType = BookContext

  render() {
      
    const {notes} = this.context
    const {bookId} = this.props.match.params
    const note = findNote(notes, bookId) || {content: ''}
    return (
      <section className='SingleNotePage'>
        <SingleNote
          note_name={note.note_name}
          content={note.content}
          modified={note.modified}
        />
      </section>
    )
  }
}