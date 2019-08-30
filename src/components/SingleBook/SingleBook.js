import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import BookContext from '../../contexts/BookContext'
import './SingleBook.css'

class SingleBook extends Component {

  static contextType = BookContext;

  
  state = {
    borrowed:false,
  }

   handleClick = () => {
    this.setState(prevState => ({
      borrowed: !prevState.borrowed
    }));
  }

  render() {
    let {id, title, authors, description, rating} = this.props
    console.log(this.props)
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
    return (
        <div className = 'single-book'>
          <ul>
            <Link
              to={`/library/${id}`}
              type='button'
              className='Add-note-button'>
                <h3>{title}</h3>
            </Link>
            <h4>{authors}</h4>
            <p>{description}</p>
            <p>{rating} &#9733;</p>
            <button onClick={this.handleClick}>Mark Book as {this.state.borrowed ? 'Borrowed' : 'Returned'}</button>
            <div className='buttons'>
            <Link
              to={`/library/${id}/add-note`}
              type='button'
              className='Add-note-button'
            >
            <br />
              Add a note to this book
            </Link>
            <Link
              to={`/notes/${id}`}
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