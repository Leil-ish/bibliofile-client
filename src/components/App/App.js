import React, {Component} from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import Nav from '../Nav/Nav';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import AddBookPage from '../../routes/AddBookPage/AddBookPage';
import LandingPage from '../../routes/LandingPage/LandingPage';
import LoginPage from '../../routes/LoginPage/LoginPage';
import SignUpPage from '../../routes/SignUpPage/SignUpPage';
import LibraryPage from '../../routes/LibraryPage/LibraryPage';
import NotesPage from '../../routes/NotesPage/NotesPage';
import SingleBookPage from '../../routes/SingleBookPage/SingleBookPage';
import EditBookPage from '../../routes/EditBookPage/EditBookPage';
import BookNotesPage from '../../routes/BookNotesPage/BookNotesPage'
import SearchPage from '../../routes/SearchPage/SearchPage';
import LibraryContext from '../../contexts/LibraryContext';
import AddNotePage from '../../routes/AddNotePage/AddNotePage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import Error from '../Error/Error'
import {getBooksForLibrary, getNotesForBook} from '../../library-helper';
import './App.css';

class App extends Component {

  static contextType = LibraryContext;


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

    handleDeleteNote = noteId => {
      this.setState({
        notes: this.state.notes.filter(note => note.id !== noteId)
      })
    }

    handleDeleteBook = bookId => {
      this.setState({
        books: this.state.books.filter(book => book.id !==bookId)
      })
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
                  component={routeProps => {    
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
                exact
                path='/library/:bookId/notes'
                component={routeProps => {
                  const {bookId} = routeProps.match.params
                  const notesForBook = getNotesForBook(notes, bookId)
                  return (
                    <BookNotesPage
                      {...routeProps}
                      notes={notesForBook}
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
            {['/library/:bookId/add-note'].map(path =>
              <PrivateRoute
                exact
                key={path}
                path={path}
                component={routeProps => {
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
            {['/library/:bookId/edit-book'].map(path =>
              <PrivateRoute
                exact
                key={path}
                path={path}
                component={routeProps => {
                  return (
                    <EditBookPage
                      {...routeProps}
                    />
                  )
                }}
              />
            )}
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
              component={routeProps =>
                <Nav
                  books={books}
                  notes={notes}
                  {...routeProps}
                />
              }
            />
          )}
          {['/library/:bookId/edit-book'].map(path =>
            <PrivateRoute
              exact
              key={path}
              path={path}
              component={routeProps =>
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
            path='/library/:bookId/notes'
            component={routeProps => {
              const {bookId} = routeProps.match.params
              const notesForBook = getNotesForBook(notes, bookId)
              return (
                <Nav
                  {...routeProps}
                  notesForBook={notesForBook}
                />
              )
            }}
            />
            <Route
              exact path='/'
              component={Nav}
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
            </h1>
            <h2>Your Personal Virtual Library</h2>
          </header>
          <main className='App_main'>
            <Error>
              {this.renderMainRoutes()}
            </Error>
          </main>
          <nav className='App_nav'>
            <Error>
              {this.renderNavRoutes()}
            </Error>
          </nav>
        </div>
    )
  }
}

export default App