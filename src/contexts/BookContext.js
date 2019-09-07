import React, { Component } from 'react'

export const nullBook = {
  authors: {},
}

export const nullNote = {
  note_name: {},
}

const BookContext = React.createContext({
  book: nullBook,
  note: nullNote,
  error: null,
  setError: () => {},
  clearError: () => { },
  setBook: () => {},
  setNote: () => {},
  clearBook: () => {},
  setNotes: () => {},
  addNote: () => {},
  deleteNote: () => {},
  clearNote: () => {},
})

export default BookContext

export class BookProvider extends Component {
  state = {
    book: nullBook,
    note: nullNote,
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

  setNote = note => {
    this.setState({note})
  }

  setNotes = notes => {
    this.setState({notes})
  }

  clearBook = () => {
    this.setBook(nullBook)
    this.setNotes([])
  }

  clearNote = () => {
    this.setNote(nullNote)
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
      note: this.state.note,
      notes: this.state.notes,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setBook: this.setBook,
      setNote: this.setNote,
      setNotes: this.setNotes,
      clearBook: this.clearBook,
      clearNote: this.clearNote,
      addNote: this.addNote,
    }
    return (
      <BookContext.Provider value={value}>
        {this.props.children}
      </BookContext.Provider>
    )
  }
}
