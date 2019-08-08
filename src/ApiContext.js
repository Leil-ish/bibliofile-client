import React from 'react'

export default React.createContext({
  notes: [],
  books: [],
  addBook: () => {},
  addNote: () => {},
  deleteNote: () => {},
  deleteBook: () => {},
})