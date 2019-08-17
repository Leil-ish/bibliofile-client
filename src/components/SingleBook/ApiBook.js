import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './ApiBook.css'

class ApiBook extends Component {
  render() {
    
    let author;
    if (this.props.volumeInfo.authors) {
      author = this.props.volumeInfo.authors[0];
    }
    else (
      author = "No authors listed"
    )

    let description;
    if (this.props.volumeInfo.description) {
      description = this.props.volumeInfo.description;
    }
    else (
      description = "No description included for this book."
    )

    return (
      <ul className = 'api-book'>
          <h3>Title: {this.props.volumeInfo.title}</h3>
          <h4>Author: {author}</h4>
          <div className = 'api-book-content'>
            <img src={this.props.volumeInfo.imageLinks.thumbnail} alt='book cover thumbnail'></img>
            <p>Description: {description}</p>
          </div>
          <div className='buttons'>
            <Link
              to='/library'
              type='button'
              className='Add-book-button'
            >
            <br />
              Add book to Library
            </Link>
          </div>
      </ul>
    );
  }
}

export default ApiBook;