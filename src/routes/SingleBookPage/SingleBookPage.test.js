import React from 'react';
import ReactDOM from 'react-dom';
import SingleBookPage from './SingleBookPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SingleBookPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});