import React from 'react';
import ReactDOM from 'react-dom';
import EditBookPage from './EditBookPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditBookPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});