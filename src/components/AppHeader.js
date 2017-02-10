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
      <div className="AppHeader">
        <img src={logo} className="AppLogo" alt="Booklify" />
      </div>
    );
  }
}

export default AppHeader;