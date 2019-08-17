import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './SingleBook.css'

class SingleBook extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  render() {
    let {title, author, textSnippet, rating} = this.props
      if (this.props.author) {
        author = this.props.author;
      }
      else (
        author = "No authors listed"
      )

      if (this.props.textSnippet) {
        textSnippet = this.props.textSnippet;
      }
      else (
        textSnippet = "No description included for this book."
      )

      const {libraryId} = this.props
    return (
        <div className = 'single-book'>
          <ul>
            <h3>{title}</h3>
            <h4>{author}</h4>
            <p>{textSnippet}</p>
            <p>{rating} &#9733;</p>
            <div className='buttons'>
            <Link
              to={`/library/${libraryId}/add-note`}
              type='button'
              className='Add-note-button'
            >
            <br />
              Add a note to this book
            </Link>
            <Link
              to={`/notes/${libraryId}`}
              type='button'
              className='View-notes-button'
            >
            <br />
              View notes for this book
            </Link>
          </div>
        </ul>
      </div>
    );
  }
}

export default SingleBook;