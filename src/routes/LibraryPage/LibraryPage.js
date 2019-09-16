import React from 'react'
import LibraryResults from '../../components/LibraryResults/LibraryResults'
import Filters from '../../components/Filters/Filters'
import LibraryContext from '../../contexts/LibraryContext'
import BookApiService from '../../services/book-api-service'
import {Section} from '../../components/Utils/Utils'
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

  static contextType = LibraryContext;

  componentDidMount() {
    this.context.clearError()
    BookApiService.getBooks()
      .then(this.context.setLibrary)
      .catch(this.context.setError)
    BookApiService.getAllNotes()
      .then(this.context.setNoteList)
      .catch(this.context.setError)
  }


  renderLibrary() {
    console.log(this.context)
    return (
      <section className='LibraryPage'>
        <h2>Library</h2>
        <ul>
            <Filters 
              onBookFilter={bookType => this.handleBookFilter(bookType)}
              onBookSort={property => this.handleBookSort(property)}/>
            <LibraryResults 
              books={this.context.books} 
              notes={this.context.notes}
              bookFilter={this.state.bookType}
              property={this.state.property}/>
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
