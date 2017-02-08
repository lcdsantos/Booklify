import React, { Component } from 'react';
import Book from './components/Book';
import logo from './logo.svg';
import _ from 'lodash';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { query: 'little prince', items: [] };
    this.executeQuery();
  }

  render() {
    let bookList;

    if (this.state.items) {
      bookList = _.map(this.state.items, item => (
        <Book key={item.id} info={item} />
      ));
    } else {
      bookList = <h1>Nenhum resultado encontrado :(</h1>;
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <form onSubmit={this.handleSubmit}>
          <input type="search" placeholder="Buscar..." onChange={this.handleChange} value={this.state.query} />
          <button>Buscar</button>
        </form>

        <div className="BookList">{bookList}</div>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ query: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.executeQuery();
  }

  executeQuery() {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.query}`)
      .then((response) => response.json())
      .then((data) => this.setState({ items: data.items }));
  }
}

export default App;
