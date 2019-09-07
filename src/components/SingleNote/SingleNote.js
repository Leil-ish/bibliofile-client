import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from '../Utils/Utils'
import TokenService from '../../services/token-service'
import config from '../../config'
import BookContext from '../../contexts/BookContext';
import './SingleNote.css';

export default class SingleNote extends Component {

  static contextType = BookContext;

  static defaultProps ={
    onDeleteNote: () => {},
    match: { params: {} },
  }

  handleClickDelete = e => {
    e.preventDefault()
    const note = this.props
    const bookId = note.book_id
    const noteId = note.id
    console.log(note.id)

    debugger

    fetch(`${config.API_ENDPOINT}/library/${bookId}/notes/${noteId}`, {
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

  render() {

    let {note} = this.props
    console.log(note)

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
        <Button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <h3>Delete this Note</h3>
        </Button>
        </ul>
    );
  }
}

