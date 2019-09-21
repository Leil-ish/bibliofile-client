import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import AddNotePage from './AddNotePage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <AddNotePage />
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});