import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import LibraryContext from '../../contexts/LibraryContext';
import './SingleBook.css';

class SingleBook extends Component {

  static contextType = LibraryContext;

  state = {
    borrowed:false,
    book: []
  }

   handleClick = () => {
    this.setState(prevState => ({
      borrowed: !prevState.borrowed
    }));
  }

  render() {
      let {book} = this.props

      /*if (this.props.authors) {
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
      )*/


    return (
        <div className = 'single-book'>
          <ul>
            <Link
              to={`/library/${book.id}`}
              type='button'
              className='Add-note-button'>
                <h3>{book.title}</h3>
            </Link>
            <h4>{book.authors}</h4>
            <p>{book.description}</p>
            <p>{book.rating} &#9733;</p>
            <button onClick={this.handleClick}>Mark Book as {this.state.borrowed ? 'Borrowed' : 'Returned'}</button>
            <div className='buttons'>
            <Link
              to={`/library/${book.id}/add-note`}
              type='button'
              className='Add-note-button'
            >
            <br />
              Add a note to this book
            </Link>
            <Link
              to={`/notes/${book.id}`}
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