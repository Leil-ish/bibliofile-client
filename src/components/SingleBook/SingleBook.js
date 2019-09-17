import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import BookContext from '../../contexts/BookContext';
import './SingleBook.css';

export default class SingleBook extends Component {

  static contextType = BookContext;

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
      const { notes=[] } = this.context
      console.log(notes)
      let book = this.props
      let authors = book.authors
      let description = book.description

      if (authors) {
        authors = book.authors;
      }
      else (
        authors = 'No authors listed'
      )

      if (description) {
        description = book.description;
      }
      else (
        description = 'No description included for this book.'
      )

      /*if (book.rating) {
        return (
            <div className = 'single-book'>
              <ul>
                <Link
                  to={`/library/${book.id}`}
                  type='button'
                  className='Add-note-button'>
                    <h3>{book.title}</h3>
                </Link>
                <h4>{book.authors.replace(/[^a-zA-Z ]/g, " ")}</h4>
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
                  to={`/library/${book.id}/notes`}
                  type='button'
                  className='View-notes-button'
                >
                <br />
                  View notes for this book
                  <br />
                </Link>
              </div>
            </ul>
          </div>
        );
      } else {*/
        return (
          <div className = 'single-book'>
            <ul>
              <Link
                to={`/library/${book.id}`}
                type='button'
                className='Add-note-button'>
                  <h3>{book.title}</h3>
              </Link>
              <h4>{book.authors.replace(/[^a-zA-Z ]/g, " ")}</h4>
              <p>{book.description}</p>
              {/*<Link
              to={`/library/${book.id}/edit-book`}
              type='button'
              className='Edit-book-button'>
                <br />
                Add a Rating for this Book
              </Link> */}             
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
                to={`/library/${book.id}/notes`}
                type='button'
                className='View-notes-button'
              >
              <br />
                View notes for this book
              <br />
              </Link>
              <button className='Borrowed-button' onClick={this.handleClick}>Mark Book as {this.state.borrowed ? 'Borrowed' : 'Returned'}</button>
            </div>
          </ul>
        </div>
      );
    }
  }
// }