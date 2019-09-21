import React, {Component} from 'react'

const LibraryContext = React.createContext({
  books: [],
  notes: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setLibrary: () => {},
  setNoteList: () => {},
  deleteBook: () => {},
})
export default LibraryContext

export class LibraryProvider extends Component {
  state = {
    books: [],
    notes: [],
    error: null,
  };

  setLibrary = books => {
    this.setState({ books })
  }

  setNoteList = notes => {
    this.setState({ notes })
  }

  deleteBook = bookId => {
    this.setState({
      books: this.state.books.filter(book => book.id !== bookId)
    })
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  render() {
    const value = {
      books: this.state.books,
      notes: this.state.notes,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setLibrary: this.setLibrary,
      setNoteList: this.setNoteList,
      deleteBook: this.deleteBook,
    }
    return (
      <LibraryContext.Provider value={value}>
        {this.props.children}
      </LibraryContext.Provider>
    )
  }
}
