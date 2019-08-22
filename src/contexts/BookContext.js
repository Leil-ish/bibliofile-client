import React, { Component } from 'react'

export const nullBook = {
  author: {},
  tags: [],
}

const BookContext = React.createContext({
  book: nullBook,
  notes: [],
  error: null,
  setError: () => {},
  clearError: () => { },
  setBook: () => {},
  clearBook: () => {},
  setNotes: () => {},
  addNote: () => {},
})

export default BookContext

export class BookProvider extends Component {
  state = {
    book: nullBook,
    error: null,
  };

  setError = error => {
    console.error(error)
    this.setState({error})
  }

  clearError = () => {
    this.setState({error: null})
  }

  setBook = book => {
    this.setState({book})
  }

  setNotes = notes => {
    this.setState({notes})
  }

  clearBook = () => {
    this.setBook(nullBook)
    this.setNotes([])
  }

  addNote = note => {
    this.setNotes([
      ...this.state.notes,
      note
    ])
  }

  render() {
    const value = {
      book: this.state.book,
      notes: this.state.notes,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setBook: this.setBook,
      setNotes: this.setNotes,
      clearBook: this.clearBook,
      addNote: this.addNote,
    }
    return (
      <BookContext.Provider value={value}>
        {this.props.children}
      </BookContext.Provider>
    )
  }
}
