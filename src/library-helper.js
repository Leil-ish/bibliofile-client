export const findBook = (books=[], bookId) =>
  books.find(book => book.id === bookId)

export const findNote = (notes=[], noteId) =>
  notes.find(note => note.id === noteId)

export const getNotesForBook = (notes=[], bookId) => (
  (!bookId)
    ? notes
    : notes.filter(note => note.bookId === bookId)
)

export const countNotesForBook = (notes=[], bookId) =>
  notes.filter(note => note.bookId === bookId).length