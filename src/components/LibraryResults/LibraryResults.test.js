import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import LibraryResults from './LibraryResults';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
        <LibraryResults />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});