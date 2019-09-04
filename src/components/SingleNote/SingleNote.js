import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import BookContext from '../../contexts/BookContext';
import './SingleNote.css';

export default class SingleNote extends Component {

  static contextType = BookContext;

  render() {

    let {note} = this.props

    return (
      <ul className = 'single-note'>
            <h3>{note.note_name}</h3>
            <h4>{note.content}</h4>
        <Link
              to={`/library/${note.book_id}/notes`}
              type='button'
              className='View-note-button'>
            <h3>View All Notes for this Book</h3>
        </Link>
        <Link
            to={`/library/${note.book_id}/add-note`}
            type='button'
            className='Add-note-button'
          >
          <h3>Add a New Note to this Book</h3>
        </Link>
        </ul>
    );
  }
}

