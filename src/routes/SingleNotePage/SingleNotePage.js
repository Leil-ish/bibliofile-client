import React from 'react'
import SingleNote from '../../components/SingleNote/SingleNote'
import ApiContext from '../../contexts/ApiContext'
import {findNote} from '../../library-helper'
import './SingleNotePage.css'

export default class SingleNotePage extends React.Component {
    static defaultProps = {
        books: [],
        notes: []
      }

  static contextType = ApiContext

  render() {
      
    const {notes} = this.context
    const {bookId} = this.props.match.params
    const note = findNote(notes, bookId) || {content: ''}
    return (
      <section className='SingleNotePage'>
        <SingleNote
          book_id={note.book_id}
          title={note.title}
          book={note.book}
          modified={note.modified}
          content={note.content}
        />
      </section>
    )
  }
}