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
  addBook: () => {},
  deleteNote: () => {},
  deleteBook: () => {},
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

  setBooks = books => {
    this.setState({books})
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

  deleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
  }

  deleteBook = bookId => {
    this.setState({
      books: this.state.books.filter(book => book.id !== bookId)
    })
  }

  addBook = book => {
    this.setBooks([
      this.state.books,
      book
    ])
  }

  updateBook = book => {
    this.setBooks([
      ...this.state.books,
      book
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
      addBook: this.addBook,
      deleteNote: this.deleteNote,
      deleteBook: this.deleteBook,
      editBook: this.editBook,
    }
    return (
      <BookContext.Provider value={value}>
        {this.props.children}
      </BookContext.Provider>
    )
  }
}
