import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './SingleNote.css'

class SingleNote extends Component {

  static defaultProps = {
    match: {
      params: {}
    }
  }


  render() {
    const {book_id, title, note_name, content} = this.props
    console.log(this.props)

    return (
        <ul className = 'single-note'>
            <Link
              to={`/notes/${book_id}`}
              type='button'
              className='Add-note-button'>
                <h2>Note for: <i>{title}</i></h2>
            </Link>
            <h3>{note_name}</h3>
            <h4>{content}</h4>
            <Link
                to={`/library/${book_id}/add-note`}
                type='button'
                className='Add-note-button'
              >
            Add a New Note for <i>{title}</i>
            </Link>
        </ul>
    );
  }
}

export default SingleNote;