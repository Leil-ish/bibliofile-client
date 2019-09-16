import React, {Component} from 'react';
import BookContext from '../../contexts/BookContext'
import BookApiService from '../../services/book-api-service'
import { Section, Button } from '../../components/Utils/Utils'
import Form from '../../components/Form/Form'
import './EditBookPage.css'

export default class EditBookPage extends Component {

      static defaultProps = {
      match: { params: {} },
    }
  
    static contextType = BookContext

    handleSubmit = ev => {
      ev.preventDefault()
      const {rating} = ev.target
      BookApiService.patchBook(rating.value)
        .then(this.context.editBook)
        .then(() => {
          rating.value = ''
        })
        .catch(this.context.setError)
    }
  
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
      const { book   } = this.context
      return <>
        <h2>{book.title}</h2>
        <BookContent book={book} />
        <Form>
          <BookRating />
          <Button type='submit'>
            Save Rating
          </Button>
        </Form>
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
      <div className='BookPage'>
        <h1 className='BookPage_content'>
          {book.title}
        </h1>
        <p className='BookPage_content'>
          {book.description}
        </p>
      </div>
    )
  }
  
  function BookRating() {
    return (
      <div className='select-input'>
        <label htmlFor='book-rating-input'>
          Rating
        </label>
        <select name='rating' id='rating'>
            <option value="1">1 &#9733;</option>
            <option value="2">2 &#9733;</option>
            <option value="3">3 &#9733;</option>
            <option value="4">4 &#9733;</option>
            <option value="5">5 &#9733;</option>
        </select>
      </div>
    )
  }