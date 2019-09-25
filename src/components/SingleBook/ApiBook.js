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

  constructor(props){
    super(props);
      this.state = {
        open: false
      }
      this.togglePanel = this.togglePanel.bind(this);
    }

  togglePanel(e){
    this.setState({open: !this.state.open})
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
          <li><img src={image_links} alt='book cover thumbnail'></img></li>
          <li><h3>{this.props.volumeInfo.title}</h3></li>
          <li><h4>{author}</h4></li>
          <li><h5>{this.props.volumeInfo.categories}</h5></li>
          <li><hr/></li>
          <li><div onClick={(e)=>this.togglePanel(e)} className = 'collapsible'>
              <p className='Description-button'>Description</p>
              {this.state.open ? (
                <div className='api-book-content'>
                  <p>{description}</p>
                </div>) : null}
            </div></li>
            <li><Form 
              className='AddBookButton'
              onSubmit={this.handleSubmit}>
                <Button
                  type='submit'
                  className='Add-book-button'
                >
                  Add book to Library
                </Button>
            </Form></li>
      </ul>
    );
  }
}

export default withRouter(ApiBook)