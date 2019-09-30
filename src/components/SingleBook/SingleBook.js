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

      /*Some logic to make sure that an error won't be thrown if 
      a library book does not have one of these keys */
      let book = this.props
      let authors = book.authors
      let description = book.description
      let image = book.image_links
      let borrowed = book.borrowed

      if (authors) {
        authors = book.authors;
      }
      else (
        authors = 'No authors listed'
      )

      if (borrowed) {
        borrowed = 'Book has been borrowed.';
      }
      else (
        borrowed = 'Book is currently in library.'
      )

      if (image) {
        image = book.image_links;
      }
      else (
        image = 'https://i.imgur.com/SLnbcls.jpg'
      )

      if (description) {
        description = book.description;
      }
      else (
        description = 'No description included for this book.'
      )
      
      if (book.rating) {
        return (
          <ul className = 'single-book'>
              <li><img src={image} alt='book cover'/></li>
              <li><h3>{book.title}</h3></li>
              <li><h4>{authors.replace(/[^a-zA-Z ]/g, " ")}</h4></li>
              <li><h5>{book.categories.replace(/[^a-zA-Z ]/g, " ")}</h5></li>
              <li><h5>{book.rating} &#9733;</h5></li>
              <hr/>
              <li><p>{borrowed}</p></li>
              <hr/>

              <li className='buttons'>
                <Link
                  to={`/library/${book.id}`}
                  type='button'
                  className='Book-description-button'>
                  Description
                </Link>            
                <Link
                    to={`/library/${book.id}/notes`}
                    type='button'
                    className='Book-view-notes-button'
                  >
                    View Notes
                </Link>
                <Link
                  to={`/library/${book.id}/edit-book`}
                  type='button'
                  className='Book-options-button'>
                    Edit Book
                </Link>
                <Button
                    className='Book-remove-button'
                    type='button'
                    onClick={e =>
                      window.confirm("Are you sure you wish to remove this book? Notes associated with the book will be deleted also.") &&
                      this.handleClickBookDelete(e)
                    }>
                    Remove Book
                </Button>
            </li>
        </ul>
      );
      } else {
        return(
          <ul className = 'single-book'>
                <li><img src={image} alt='book cover'/></li>
                <li><h3>{book.title}</h3></li>
                <li><h4>{authors.replace(/[^a-zA-Z ]/g, " ")}</h4></li>
                <li><h5>{book.categories.replace(/[^a-zA-Z ]/g, " ")}</h5></li>

                <li className='buttons'>
                  <Link
                    to={`/library/${book.id}`}
                    type='button'
                    className='Book-description-button'>
                    Description
                  </Link>            
                  <Link
                      to={`/library/${book.id}/notes`}
                      type='button'
                      className='Book-view-notes-button'
                    >
                      View Notes
                  </Link>
                  <Link
                    to={`/library/${book.id}/edit-book`}
                    type='button'
                    className='Book-options-button'>
                      Edit Book
                  </Link>
                  <Button
                      className='Book-remove-button'
                      type='button'
                      onClick={e =>
                        window.confirm("Are you sure you wish to remove this book? Notes associated with the book will be deleted also.") &&
                        this.handleClickBookDelete(e)
                      }>
                      Remove Book
                  </Button>
              </li>
          </ul> 
        );
      }
    }
  }


export default withRouter(SingleBook)
