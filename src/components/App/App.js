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
import ApiContext from '../../services/ApiContext'
import dummyStore from '../../dummy-store'
import {findNote, getBooksForLibrary, getNotesForBook} from '../../library-helper'
import './App.css';

class App extends Component {

    state = {
        books:[],
        notes:[],
    };
  
  componentDidMount() {
    setTimeout(() => this.setState(dummyStore), 600)
  }

  renderMainRoutes() {
    const {books, notes} = this.context
    return (
      <>
        <Switch>
          `{['/library/:libraryId'].map(path =>
            <Route
              exact
              key={path}
              path={path}
              render={routeProps => {    
                const {libraryId} = routeProps.match.params
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
            path='/notes/:libraryId'
            render={routeProps => {
              const {libraryId} = routeProps.match.params
              const note = findNote(notes, libraryId)
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
          `{['/library/:libraryId/add-note'].map(path =>
            <Route
              exact
              key={path}
              path={path}
              render={routeProps => {
                const {libraryId} = routeProps.match.params
                const notesForBook = getNotesForBook(notes, libraryId)
                return (
                  <AddNotePage
                    {...routeProps}
                    notes={notesForBook}
                  />
                )
              }}
            />
          )}
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
          exact
          path='/notes/:libraryId'
          render={routeProps => {
            const {libraryId} = routeProps.match.params
            const note = findNote(notes, libraryId) || {}
            return (
              <Nav
                {...routeProps}
                note={note}
              />
            )
          }}
          />
          <Route
            exact
            path='/library'
            component={Nav}
          />
          <Route
            exact
            path='/notes'
            component={Nav}
          />
          <Route
            path='/add-book'
            component={Nav}
          />
          <Route
            path='/library/:libraryId/add-note'
            component={Nav}
          />
      </>
    )
  }

  render() {
    const value = {
      books: this.state.books,
      notes: this.state.notes,
    }
    return (
      <ApiContext.Provider value={value}>
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
      </ApiContext.Provider>
    )
  }
}

export default App