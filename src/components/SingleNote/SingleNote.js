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

  handleClickDelete = e => {
    e.preventDefault()

    const bookId = this.props.id
    const noteId = this.props.note.note_id
    const book = this.props
    console.log(this.props)
    
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

export default withRouter(SingleNote)

