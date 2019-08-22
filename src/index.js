
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import {LibraryProvider } from './contexts/LibraryContext'
import {BookProvider} from './contexts/BookContext'
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(  
    <BrowserRouter>
        <LibraryProvider>
            <BookProvider>
                <App />
            </BookProvider>
        </LibraryProvider>
    </BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
