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
import {findNote, getBooksForLibrary, getNotesForBook} from '../../library-helper'
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        hasError: false,
        borrowed: false,
    };
  }

    static getDerivedStateFromError(error) {
      console.error(error)
      return {hasError: true}
    }
  
  renderMainRoutes() {
    const {books, notes} = this.context
    return (
      <div className='App-main'>
        {this.state.hasError && <p className='red'>There was an error! Oh no!</p>}
          <Switch>
            `{['/library/:bookId'].map(path =>
              <PrivateRoute
                exact
                key={path}
                path={path}
                render={routeProps => {    
                  const {bookId} = routeProps.match.params
                  const booksForLibrary = getBooksForLibrary(books, bookId)
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
              path='/notes/:bookId'
              render={routeProps => {
                const {bookId} = routeProps.match.params
                const note = findNote(notes, bookId)
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
            `{['/library/:bookId/add-note'].map(path =>
              <PrivateRoute
                exact
                key={path}
                path={path}
                render={routeProps => {
                  const {bookId} = routeProps.match.params
                  const notesForBook = getNotesForBook(notes, bookId)
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
          {['/library/:bookId'].map(path =>
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
            path='/notes/:bookId'
            render={routeProps => {
              const {bookId} = routeProps.match.params
              const note = findNote(notes, bookId) || {}
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
              path='/find-book'
              component={Nav}
            />
            <PrivateRoute
              path='/add-book'
              component={Nav}
            />
            <PrivateRoute
              path='/library/:bookId/add-note'
              component={Nav}
            />
      </div>
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