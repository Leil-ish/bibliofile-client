import React from 'react'
import SingleBook from '../../components/SingleBook/SingleBook'
import ApiContext from '../../services/ApiContext'
import {findBook} from '../../library-helper'
import './SingleBookPage.css'

export default class SingleBookPage extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  render() {
    const {books=[]} = this.context
    const {libraryId} = this.props.match.params
    const book = findBook(books, libraryId) || { content: '' }
    return (
      <section className='SingleBookPage'>
        <SingleBook
          title={book.title}
          author={book.author}
          categories={book.categories}
          textSnippet={book.textSnippet}
          rating={book.rating}
        />
      </section>
    )
  }
}