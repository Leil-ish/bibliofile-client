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
    let {book, title, modified, content, libraryId} = this.props
    console.log(this.props)

    return (
        <ul className = 'single-note'>
            <Link
              to={`/notes/${libraryId}`}
              type='button'
              className='Add-note-button'>
                <h2>Note for: <i>{book}</i></h2>
              </Link>
            <h3>{title}</h3>
            <h4>{modified}</h4>
            <p>{content}</p>
            <Link
                to={`/library/${libraryId}/add-note`}
                type='button'
                className='Add-note-button'
              >
            Add a New Note for <i>{book}</i>
            </Link>
        </ul>
    );
  }
}

export default SingleNote;