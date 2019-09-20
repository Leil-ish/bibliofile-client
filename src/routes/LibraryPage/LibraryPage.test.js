import React from 'react';
import ReactDOM from 'react-dom';
import LibraryPage from './LibraryPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LibraryPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});