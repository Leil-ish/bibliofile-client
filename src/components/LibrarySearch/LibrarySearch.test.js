import React from 'react';
import ReactDOM from 'react-dom';
import LibrarySearch from './LibrarySearch';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LibrarySearch />, div);
  ReactDOM.unmountComponentAtNode(div);
});