import React, {Component} from 'react'
import {Route, Switch, Link} from 'react-router-dom'
import Nav from '../Nav/Nav'
import LandingPage from '../../routes/LandingPage/LandingPage'
import LoginPage from '../../routes/LoginPage/LoginPage'
import SignUpPage from '../../routes/SignUpPage/SignUpPage'
import LibraryPage from '../../routes/LibraryPage/LibraryPage'
import NotesPage from '../../routes/NotesPage/NotesPage'
import SingleBookPage from '../../routes/SingleBookPage/SingleBookPage'
import SingleNotePage from '../../routes/SingleNotePage/SingleNotePage'
import SearchPage from '../../routes/SearchPage/SearchPage'
import AddNotePage from '../../routes/AddNotePage/AddNotePage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import ApiContext from '../../ApiContext'
import './App.css';

class App extends Component {
  state = {
    books: [],
    notes: [],
  };

  handleSubmit(searchTerm) {

    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${process.env.REACT_APP_API_KEY}`
    
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

  handlePrintFilter(printType) {
    this.setState({
      printType: printType
    })
  }

  handleBookFilter(bookType) {
    console.log(bookType)
    this.setState({
      bookType: bookType
    })
  }

  handleAddBook = book => {
    this.setState({
      books: [
        ...this.state.books,
        book
      ]
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [
        ...this.state.notes,
        note
      ]
    })
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
  }

  handleDeleteBook = bookId => {
    this.setState({
      books: this.state.books.filter(book => book.id !== bookId)
    })
  }

  renderNavRoutes() {
    return (
      <>
        <Route
          path='/library'
          component={Nav}
        />
        <Route
          path='/library/bookId'
          component={Nav}
        />
        <Route
          path='/notes'
          component={Nav}
        />
        <Route
          path='/notes/:noteId'
          component={Nav}
        />
        <Route
          path='/add-book'
          component={Nav}
        />
        <Route
          path='/add-note'
          component={Nav}
        />
      </>
    )
  }

  renderMainRoutes() {
    return (
      <>
        <Switch>
          <Route
            exact path='/'
            component={LandingPage}
          />
          <Route
            path='/login'
            component={LoginPage}
          />
          <Route
            path='/signup'
            component={SignUpPage}
          />
          <Route
            path='/library'
            component={LibraryPage}
          />
          <Route
            path='/library/bookId'
            component={SingleBookPage}
          />
          <Route
            path='/notes'
            component={NotesPage}
          />
          <Route
            path='/notes/:noteId'
            component={SingleNotePage}
          />
          <Route
            path='/add-book'
            component={SearchPage}
          />
          <Route
            path='/add-note'
            component={AddNotePage}
          />
          <Route
            component={NotFoundPage}
          />
        </Switch>
      </>
    )
  }

  render() {
    const value = {
      notes: this.state.notes,
      books: this.state.books,
      addBook: this.handleAddBook,
      addNote: this.handleAddNote,
      deleteNote: this.handleDeleteNote,
      deleteBook: this.handleDeleteBook,
    }
    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
          <nav className='App_nav'>
            {this.renderNavRoutes()}
          </nav>
          <header className='App_header'>
            <h1>
              <Link to='/'>Bibliofile</Link>
              {' '}
            </h1>
          </header>
          <main className='App_main'>
            {this.renderMainRoutes()}
          </main>
        </div>
      </ApiContext.Provider>
    )
  }
}

export default App