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
import dummyStore from '../../dummy-store'
import {findNote, findBook, getBooksForLibrary} from '../../library-helper'
import './App.css';

class App extends Component {

    state = {
        books:[],
        notes:[],
        printType: "All",
        bookType: "All"
    };
  

  componentDidMount() {
    setTimeout(() => this.setState(dummyStore), 600)
  }

  renderMainRoutes() {
    const { books, notes } = this.state
    return (
      <>
        <Switch>
          `{['/book/:libraryId'].map(path =>
            <Route
              exact
              key={path}
              path={path}
              render={routeProps => {
                const { libraryId } = routeProps.match.params
                const booksForLibrary = getBooksForLibrary(books, libraryId)
                return (
                  <SingleBookPage
                    {...routeProps}
                    books={booksForLibrary}
                  />
                )
              }}
            />
          )}
          <Route
            path='/notes/:noteId'
            render={routeProps => {
              const { noteId } = routeProps.match.params
              const note = findNote(notes, noteId)
              return (
                <SingleNotePage
                  {...routeProps}
                  note={note}
                />
              )
            }}
          />
          <Route
            path='/add-book'
            component={SearchPage}
          />
          <Route
            path='/add-note'
            render={routeProps => {
              return (
                <AddNotePage
                  {...routeProps}
                  books={books}
                />
              )
            }}
          />
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
              path='/notes'
              component={NotesPage}
            />
            <Route
              component={NotFoundPage}
            />
        </Switch>
      </>
    )
  }

  renderNavRoutes() {
    const {books, notes} = this.state
    return (
      <>
       {['/library/:libraryId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            render={routeProps =>
              <Nav
                books={books}
                notes={notes}
                {...routeProps}
              />
            }
          />
        )}
        <Route
          path='/notes/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params
            const note = findNote(notes, noteId) || {}
            const book = findBook(books, note.libraryId)
            return (
              <Nav
                {...routeProps}
                book={book}
              />
            )
          }}
          />
          <Route
            path='/library'
            component={Nav}
          />
          <Route
            path='/notes'
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

  render() {
    return (
        <div className='App'>
          <header className='App_header'>
            <h1>
              <Link to='/'>Bibliofile</Link>
              {' '}
            </h1>
          </header>
          <main className='App_main'>
            {this.renderMainRoutes()}
          </main>
          <nav className='App_nav'>
            {this.renderNavRoutes()}
          </nav>
        </div>
    )
  }
}

export default App