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
              <h3>{book.title}</h3>
              <img src={book.image_links} alt='book cover'/>
              <h4>{book.authors.replace(/[^a-zA-Z ]/g, " ")}</h4>
              <p>Genre: {book.categories.replace(/[^a-zA-Z ]/g, " ")}</p>
              <Link
                to={`/library/${book.id}`}
                type='button'
                className='View-note-button'>
                  <h3>View Description</h3>
              </Link>
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
              <Button
                className='Book_delete'
                type='button'
                onClick={this.handleClickBookDelete}>
                <h3>Remove this Book from the Library</h3>
              </Button>
              <button className='Borrowed-button' onClick={this.handleClick}>Mark Book as {this.state.borrowed ? 'Returned' : 'Borrowed'}</button>
            </div>
          </ul>
        </div>
      );
    }
  }
// }

export default withRouter(SingleBook)
