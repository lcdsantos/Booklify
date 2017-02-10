import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const localStorageMock = (function() {
  var store = {};
  return {
    getItem: function(key) {
      return store[key];
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
