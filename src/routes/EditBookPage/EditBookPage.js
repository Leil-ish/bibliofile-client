import React, {Component} from 'react';
import BookContext from '../../contexts/BookContext'
import BookApiService from '../../services/book-api-service'
import {Section, Button} from '../../components/Utils/Utils'
import Form from '../../components/Form/Form'
import './EditBookPage.css'

export default class EditBookPage extends Component {

    static defaultProps = {
      match: { params: {} },
    }

    constructor(props){
      super(props);
        this.state = {
          open: false
        }
        this.togglePanel = this.togglePanel.bind(this);
      }

    //Collapsible for the book description
    togglePanel(e){
      this.setState({open: !this.state.open})
      }
  
    static contextType = BookContext

    handleSubmit = ev => {
      ev.preventDefault()
      const {book} = this.context
      const {borrowed, rating} = ev.target
      
      BookApiService.patchBook(book.id, rating.value, borrowed.checked)
        .then(this.context.updateBook)
        .then(() => {
          rating.value = ''
          borrowed.checked =''
        })
        .then(() => {
          this.props.history.push(`/library`)
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
      const {book} = this.context
      return (
      <div className='BookEditPage_Content'>
        <h2>{book.title}</h2>
        <hr/>
        <div onClick={(e)=>this.togglePanel(e)} className = 'collapsible'>
            <p className='Description-button'>View Full Description</p>
            {this.state.open ? (
              <div className='api-book-content'>
                <BookContent book={book} />
              </div>) : null}
        </div>
        <hr/>
        <Form className='EditBookForm' aria-label='Edit-book-form'
          onSubmit={this.handleSubmit}>
          <BookRating />
          <BookBorrowed />
          <Button type='submit' name='editBook' className='Submit-book-edits'>
            Submit Changes
          </Button>
        </Form>
      </div>)
    }
  
    render() {
      const {error, book} = this.context
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
        <Section className='BookEditPage'>
          {content}
        </Section>
      )
    }
  }
  
  function BookContent({ book }) {
    return (
      <div>
        <p className='BookEditPage_content'>
          {book.description}
        </p>
      </div>
    )
  }

  function BookBorrowed({ book }) {
    return (
      <div className='borrowed-checkbox'>
        <label htmlFor='book-borrowed-input'>
          Book is Borrowed
        </label>
        <input type='checkbox' id='borrowed' name='borrowed'></input>
      </div>
    )
  }
  
  function BookRating() {
    return (
      <div className='select-input'>
        <label htmlFor='book-rating-input'>
          Rating (1 to 5)
        </label>
        <input required type='number' id='rating' name='rating' min='1' max='5'></input>
      </div>
    )
  }