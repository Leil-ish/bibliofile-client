import React, {Component} from 'react';
import SingleBook from '../../components/SingleBook/SingleBook'
import SingleNote from '../../components/SingleNote/SingleNote'
import BookContext from '../../contexts/BookContext'
import BookApiService from '../../services/book-api-service'
import {findBook, findNote} from '../../library-helper'
import './SingleBookPage.css'

class SingleBookPage extends Component {

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
    BookApiService.getBookComments(bookId)
      .then(this.context.setComments)
      .catch(this.context.setError)
  }

  componentWillUnmount() {
    this.context.clearBook()
  }

  render() {
    const {books=[], notes=[]} = this.context
    const {bookId} = this.props.match.params
    const book = findBook(books, bookId) || { content: '' }
    const note = findNote(notes, bookId) || { content: '' }

    return (
      <section className='SingleBookPage'>
        <SingleBook
          title={book.title}
          author={book.author}
          categories={book.categories}
          description={book.description}
          rating={book.rating}
        />
        <SingleNote
          key={note.book_id}
          note_name={note.note_name}
          content={note.content}
        />
      </section>
    )
  }
}

export default SingleBookPage