import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './SingleBook.css'

class SingleBook extends Component {
  constructor(props){
    super(props);
    this.state = {
      borrowed: false,
    };
  }

   handleClick = () => {
    this.setState(prevState => ({
      borrowed: !prevState.borrowed
    }));
  }

  render() {
    let {title, authors, description, rating} = this.props
      if (this.props.authors) {
        authors = this.props.authors;
      }
      else (
        authors = "No authors listed"
      )

      if (this.props.description) {
        description = this.props.description;
      }
      else (
        description = "No description included for this book."
      )

      const {bookId} = this.props
    return (
        <div className = 'single-book'>
          <ul>
            <h3>{title}</h3>
            <h4>{authors}</h4>
            <p>{description}</p>
            <p>{rating} &#9733;</p>
            <button onClick={this.handleClick}>Mark Book as {this.state.borrowed ? 'Borrowed' : 'Returned'}</button>
            <div className='buttons'>
            <Link
              to={`/library/${bookId}/add-note`}
              type='button'
              className='Add-note-button'
            >
            <br />
              Add a note to this book
            </Link>
            <Link
              to={`/notes/${bookId}`}
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