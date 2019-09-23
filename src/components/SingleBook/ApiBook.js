import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import {Button} from '../../components/Utils/Utils'
import BookApiService from '../../services/book-api-service'
import BookContext from '../../contexts/BookContext'
import Form from '../../components/Form/Form'
import './ApiBook.css';

class ApiBook extends Component {
  static defaultProps = {
    onSaveBookSuccess: () => {},
    match: { params: {} },
  }

  static contextType = BookContext

  handleSubmit = ev => {
    ev.preventDefault()
    BookApiService.postBook(
      this.props.volumeInfo.title || '',
      this.props.volumeInfo.authors || '',
      this.props.volumeInfo.description || '',
      this.props.volumeInfo.categories || '',
      this.props.volumeInfo.imageLinks.thumbnail || '',
      this.props.saleInfo.isEbook,     
    )
    .then(this.context.addBook)
    .then(() => {
      this.props.onSaveBookSuccess()
      this.props.history.push(`/library`)
    })
      .catch(this.context.setError)
  }

  render() {
    
    let author;
    if (this.props.volumeInfo.authors) {
      author = this.props.volumeInfo.authors[0];
    }
    else (
      author = 'No authors listed'
    )

    let description;
    if (this.props.volumeInfo.description) {
      description = this.props.volumeInfo.description;
    }
    else (
      description = 'No description included for this book.'
    )

    let image_links;
    if (this.props.volumeInfo.imageLinks) {
      image_links = this.props.volumeInfo.imageLinks.thumbnail;
    }
    else (
      image_links = 'No book cover image available for this book.'
    )

    return (
      <ul className = 'api-book'>
          <img src={image_links} alt='book cover thumbnail'></img>
          <h3>{this.props.volumeInfo.title}</h3>
          <h4>{author}</h4>
          <h5>{this.props.volumeInfo.categories}</h5>
          <hr/>
          <div className = 'api-book-content'>
            <p>Description: {description}</p>
          </div>
          <Form 
            className='AddNoteForm'
            onSubmit={this.handleSubmit}>
            <div className='buttons'>
              <Button
                type='submit'
                className='Add-book-button'
              >
              <br />
                Add book to Library
              </Button>
            </div>
          </Form>
      </ul>
    );
  }
}

export default withRouter(ApiBook)