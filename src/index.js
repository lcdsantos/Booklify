/**
 * Modules
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

/**
 * Views
 */
import App from './views/App';
import BookDetail from './views/BookDetail';

/**
 * Assets
 */
import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/detalhe/:bookId" component={BookDetail} />
  </Router>,
  document.getElementById('root')
);
