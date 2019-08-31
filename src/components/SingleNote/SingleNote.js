import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import BookContext from '../../contexts/BookContext';
import './SingleNote.css';

export default class SingleNote extends Component {

  static contextType = BookContext;

  render() {

    const note_name = this.props.note_name
    const book_id = this.props.book_id
    const content = this.props.content

    return (
      <ul className = 'single-note'>
        <Link
              to={`/notes/${book_id}`}
              type='button'
              className='View-note-button'>
        </Link>
            <h3>{note_name}</h3>
            <h4>{content}</h4>
        <Link
            to={`/library/${book_id}/add-note`}
            type='button'
            className='Add-note-button'
          >
          Add a New Note
        </Link>
        </ul>
    );
  }
}

