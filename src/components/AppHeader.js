/**
 * Modules
 */
import React, { Component } from 'react';

/**
 * Assets
 */
import logo from './logo.svg';
import './AppHeader.css';

class AppHeader extends Component {
  render() {
    return (
      <div className="App-header">
        <img src={logo} className="App-logo" alt="Booklify" />
      </div>
    );
  }
}

export default AppHeader;