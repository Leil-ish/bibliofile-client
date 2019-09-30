import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {Button} from '../Utils/Utils'
import BookContext from '../../contexts/BookContext';
import TokenService from '../../services/token-service'
import config from '../../config'
import './SingleNote.css';

class SingleNote extends Component {

  static contextType = BookContext;

  static defaultProps ={
    onDeleteNote: () => {},
    match: { params: {} },
  }

  //Delete for note
  handleClickDelete = e => {
    e.preventDefault()

    const bookId = this.props.id
    const noteId = this.props.note.note_id
    const book = this.props
    
    fetch (`${config.API_ENDPOINT}/library/${bookId}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
      })
      .then(() => {
        this.context.deleteNote(noteId)
        this.props.onDeleteNote(noteId)
      })
      .then(() => {
        this.props.history.push(`/library/${book.id}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {

    let {note} = this.props

    return (
      <div className = 'single-note'>
            <h3 className='Single_note_name'>{note.note_name}</h3>
            <hr/>
            <p>{note.content}</p>
        <Button
          className='Note_delete'
          type='button'
          //Confirmation of delete
          onClick={e =>
            window.confirm("Are you sure you wish to delete this item?") &&
            this.handleClickDelete(e)
          }
        >
          <h4>Delete Note</h4>
        </Button>
      </div>
    );
  }
}

export default withRouter(SingleNote)

