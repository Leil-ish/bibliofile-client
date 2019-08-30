import React from 'react'
import SingleBook from '../../components/SingleBook/SingleBook'
import BookContext from '../../services/ApiContext'
import BookApiService from '../../services/book-api-service'
import {findBook} from '../../library-helper'
import './SingleBookPage.css'

export default class SingleBookPage extends React.Component {

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
    const {books=[]} = this.context
    const {bookId} = this.props.match.params
    const book = findBook(books, bookId) || { content: '' }
    return (
      <section className='SingleBookPage'>
        <SingleBook
          title={book.title}
          author={book.author}
          categories={book.categories}
          description={book.description}
          rating={book.rating}
        />
      </section>
    )
  }
}
