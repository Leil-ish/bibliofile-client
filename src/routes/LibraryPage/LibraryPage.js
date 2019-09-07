import React from 'react'
import SingleBook from '../../components/SingleBook/SingleBook'
import SearchBar from '../../components/SearchBar/SearchBar'
import LibraryContext from '../../contexts/LibraryContext'
import BookApiService from '../../services/book-api-service'
import config from '../../config'
import {Section, sortBooks} from '../../components/Utils/Utils'
import './LibraryPage.css'

export default class LibraryPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        books:[],
        error: false,
        bookType: "All",
        property: "title",
    };
  }

  handleBookFilter(bookType) {
    this.setState({
      bookType: bookType
    })
  }

  handleBookSort(property) {
    this.setState({
      property: property
    })
  }

  handleSubmit(searchTerm) {

    const url = `${config.API_ENDPOINT}/library?q=${searchTerm}`
    
    fetch(url)
      .then(response => {
        if(!response.ok) {
          throw new Error('Something went wrong, please try again later.');
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        this.setState({
         books: data.items
        })
      })
      .catch(err => this.setState({
        error: err.message
      }))
  }

  static contextType = LibraryContext;

  componentDidMount() {
    this.context.clearError()
    BookApiService.getBooks()
      .then(this.context.setLibrary)
      .catch(this.context.setError)
  }


  renderLibrary() {

    const {books = []} = this.context
    let property=this.state
    books.sort(sortBooks(property))
    console.log(this.state)
    return (
      <section className='LibraryPage'>
        <h2>Library</h2>
        <ul>
          <h2>Search for a Book in Your Library </h2>
              <SearchBar 
                onSubmit={searchTerm => this.handleSubmit(searchTerm)}
                onBookFilter={bookType => this.handleBookFilter(bookType)}
                onBookSort={property => this.handleBookSort(property)}/>
            {books.map(book =>
              <SingleBook
                key={book.id}
                book={book}
              />
            )}
        </ul>
      </section>
    )
  }

  render() {
    const {error} = this.context
    return (
      <Section list className='LibraryPage'>
        {error
          ? <p className='red'>There was an error, try again</p>
          : this.renderLibrary()}
      </Section>
    )
  }

}
