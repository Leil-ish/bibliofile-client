export const findBook = (books=[], libraryId) =>
  books.find(book => book.libraryId === libraryId)

export const findNote = (notes=[], libraryId) =>
  notes.find(note => note.libraryId === libraryId)

export const getNotesForBook = (notes=[], libraryId) => (
  (!libraryId)
    ? notes
    : notes.filter(note => note.libraryId === libraryId)
)

export const getBooksForLibrary = (books=[], libraryId) => (
  (!libraryId)
    ? books
    : books.filter(book => book.libraryId === libraryId)
)

export const countNotesForBook = (notes=[], libraryId) =>
  notes.filter(note => note.libraryId === libraryId).length