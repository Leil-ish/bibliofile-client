import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import BookContext from '../../contexts/BookContext'
import BookApiService from '../../services/book-api-service'
import {Section} from '../../components/Utils/Utils'
import Form from '../../components/Form/Form'
import './SingleBookPage.css'

export default class SingleBookPage extends Component {

    static defaultProps = {
      match: { params: {} },
    }
  
    static contextType = BookContext
  
    componentDidMount() {
      const { bookId } = this.props.match.params
      this.context.clearError()
      BookApiService.getBook(bookId)
        .then(this.context.setBook)
        .catch(this.context.setError)
      BookApiService.getBookNotes(bookId)
        .then(this.context.setNotes)
        .catch(this.context.setError)
    }
  
    componentWillUnmount() {
      this.context.clearBook()
    }
  
    renderBook() {
      const {book} = this.context
      return <>
        <BookContent book={book} />
        <Form />
      </>
    }
  
    render() {
      const { error, book } = this.context
      let content
      if (error) {
        content = (error.error === `Book doesn't exist`)
          ? <p className='red'>Book not found</p>
          : <p className='red'>There was an error</p>
      } else if (!book.id) {
        content = <div className='loading' />
      } else {
        content = this.renderBook()
      }
      return (
        <Section className='BookPage'>
          {content}
        </Section>
      )
    }
  }
  
  function BookContent({ book }) {
    return (
      <div className='BookPage_content'>
        <h1 className='BookPage_title'>
          {book.title}
        </h1>
        <hr/>
        <p className='BookPage_description'>
          {book.description}
        </p>
        <Link
                to={`/library/${book.id}/notes`}
                type='button'
                className='Add-note-button'
              >
                View/Add Notes
        </Link>
      </div>
    )
  }
