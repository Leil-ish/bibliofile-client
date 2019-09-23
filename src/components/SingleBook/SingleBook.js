import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Button} from '../Utils/Utils'
import {withRouter} from 'react-router-dom'
import LibraryContext from '../../contexts/LibraryContext';
import TokenService from '../../services/token-service'
import config from '../../config'
import './SingleBook.css';

class SingleBook extends Component {

  static contextType = LibraryContext;

  state = {
    borrowed:false,
    book: []
  }

  static defaultProps ={
    onDeleteBook: () => {},
    match: { params: {} },
  }

  handleClickBookDelete = e => {
    e.preventDefault()

    const bookId = this.props.id
    
    fetch (`${config.API_ENDPOINT}/library/${bookId}`, {
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
        this.context.deleteBook(bookId)
        this.props.onDeleteBook(bookId)
      })
      .then(() => {
        this.props.history.push(`/library`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

   handleClick = () => {
    this.setState(prevState => ({
      borrowed: !prevState.borrowed
    }));
  }

  render() {
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

        return (
          <div className = 'single-book'>
            <ul>
              <img src={book.image_links} alt='book cover'/>
              <h3>{book.title}</h3>
              <h4>{book.authors.replace(/[^a-zA-Z ]/g, " ")}</h4>
              <h5>{book.categories.replace(/[^a-zA-Z ]/g, " ")}</h5>
              <div className='buttons'>
                <Link
                  to={`/library/${book.id}`}
                  type='button'
                  className='Book-description-button'>
                  Full Description
                </Link>
                {/*<Link
                to={`/library/${book.id}/edit-book`}
                type='button'
                className='Book-options-button'>
                  <br />
                  Add Rating
                </Link> */}             
                <Link
                  to={`/library/${book.id}/add-note`}
                  type='button'
                  className='Book-add-note-button'
                >                  
                Add a Note
                </Link>
                <Link
                  to={`/library/${book.id}/notes`}
                  type='button'
                  className='Book-view-notes-button'
                >
                  View Notes
                </Link>
                <button className='Book-borrowed-button' onClick={this.handleClick}>Mark as {this.state.borrowed ? 'Returned' : 'Borrowed'}</button>
                <Button
                  className='Book-remove-button'
                  type='button'
                  onClick={this.handleClickBookDelete}>
                  Remove Book
                </Button>
            </div>
          </ul>
        </div>
      );
    }
  }
// }

export default withRouter(SingleBook)
