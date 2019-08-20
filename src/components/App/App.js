import React, {Component} from 'react'
import {Route, Switch, Link} from 'react-router-dom'
import Nav from '../Nav/Nav'
import PrivateRoute from '../Utils/PrivateRoute'
import PublicOnlyRoute from '../Utils/PublicOnlyRoute'
import AddBookPage from '../../routes/AddBookPage/AddBookPage'
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
import {findNote, getBooksForLibrary, getNotesForBook} from '../../library-helper'
import './App.css';

class App extends Component {

    state = {
        books:[],
        notes:[],
        error: false,
    };

    static getDerivedStateFromError(error) {
      console.error(error)
      return { hasError: true }
    }
  
  renderMainRoutes() {
    const {books, notes} = this.context
    return (
      <div className='App-main'>
        {this.state.hasError && <p className='red'>There was an error! Oh no!</p>}
          <Switch>
            `{['/library/:libraryId'].map(path =>
              <PrivateRoute
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
            <PrivateRoute
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
            <PrivateRoute
              path='/find-book'
              component={SearchPage}
            />
            <PrivateRoute
              path='/add-book'
              component={AddBookPage}
            />
            `{['/library/:libraryId/add-note'].map(path =>
              <PrivateRoute
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
              <PublicOnlyRoute
                path='/login'
                component={LoginPage}
              />
              <PublicOnlyRoute
                path='/signup'
                component={SignUpPage}
              />
              <PrivateRoute
                path='/library'
                component={LibraryPage}
              />
              <PrivateRoute
                path='/notes'
                component={NotesPage}
              />
              <Route
                component={NotFoundPage}
              />
          </Switch>
      </div>
    )
  }

  renderNavRoutes() {
    const {books, notes} = this.state
    return (
      <div className='App-nav'>
        {this.state.hasError && <p className='red'>There was an error! Oh no!</p>}
          {['/library/:libraryId'].map(path =>
            <PrivateRoute
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
          <PrivateRoute
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
            <PrivateRoute
              exact
              path='/library'
              component={Nav}
            />
            <PrivateRoute
              exact
              path='/notes'
              component={Nav}
            />
            <PrivateRoute
              path='/add-book'
              component={Nav}
            />
            <PrivateRoute
              path='/library/:libraryId/add-note'
              component={Nav}
            />
      </div>
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