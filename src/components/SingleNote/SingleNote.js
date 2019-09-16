import React, {Component} from 'react';
import {Button} from '../Utils/Utils'
import BookContext from '../../contexts/BookContext';
import TokenService from '../../services/token-service'
import config from '../../config'
import './SingleNote.css';

export default class SingleNote extends Component {

  static contextType = BookContext;

  static defaultProps ={
    onDeleteNote: () => {},
    match: { params: {} },
  }

  handleDeleteNote = (noteId, bookId) => {
    this.props.history.push(`/library/${bookId}/notes`)
  }

  handleClickDelete = e => {
    e.preventDefault()

    const bookId = this.props.id
    const noteId = this.props.note.note_id
    
    fetch (`${config.API_ENDPOINT}/library/${bookId}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res => {
        if (!res.ok)
          return res.text().then(text => console.log(text))
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

    return (
      <ul className = 'single-note'>
            <h3>{note.note_name}</h3>
            <h4>{note.content}</h4>
        <Button
          className='Note_delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <h3>Delete this Note</h3>
        </Button>
        </ul>
    );
  }
}

