import React from 'react'
import SingleNote from '../../components/SingleNote/SingleNote'
import ApiContext from '../../services/ApiContext'
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
    const {libraryId} = this.props.match.params
    const note = findNote(notes, libraryId) || {content: ''}
    return (
      <section className='SingleNotePage'>
        <SingleNote
          title={note.title}
          modified={note.modified}
          content={note.content}
        />
      </section>
    )
  }
}