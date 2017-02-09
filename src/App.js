import React, { Component } from 'react';
import { Container, Menu, Dimmer, Loader } from 'semantic-ui-react';
import _ from 'lodash';
import SearchForm from './components/SearchForm';
import BookList from './components/BookList';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      items: [],
      query: 'little prince',
      currentPage: 1,
      totalPages: 0
    };

    this.updateItems = this.updateItems.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.executeQuery = this.executeQuery.bind(this);
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
    this.executeQuery();
  }

  updateQuery(query) {
    if (query) {
      this.setState({ isLoading: true, query: query }, this.executeQuery); // Executa a função `executeQuery` só depois que atualizar o state
    }
  }

  handlePaginationClick(e, { name }) {
    this.setState({ isLoading: true, currentPage: name }, this.executeQuery);
  }

  executeQuery() {
    const apiKey = 'AIzaSyBUPcdvuYoWqmMW02kJ26KcuTiB-lIzRtc';

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.query}&key=${apiKey}&startIndex=${(this.state.currentPage - 1) * 10}`)
      .then((response) => response.json())
      .then(data => this.updateItems(data));
  }

  updateItems(data) {
    this.setState({
      totalPages: Math.ceil(data.totalItems / 10),
      isLoading: false,
      items: data.items
    });
  }

  render() {
    const { currentPage, totalPages } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <Container>
          <Dimmer inverted page active={this.state.isLoading}>
            <Loader />
          </Dimmer>

          <SearchForm query={this.state.query} loading={this.state.isLoading} updateQuery={this.updateQuery} />

          <BookList items={this.state.items} />

          <p>Total de páginas: {totalPages}</p>
          <p>Página: {currentPage}</p>

          <Menu pagination>
            {_.times(totalPages, index => <Menu.Item key={index} name={String(index+1)} active={currentPage === String(index+1)} onClick={this.handlePaginationClick} />)}

            <Menu.Item name='1' active={currentPage === '1'} onClick={this.handlePaginationClick} />
            <Menu.Item name='2' active={currentPage === '2'} onClick={this.handlePaginationClick} />
            <Menu.Item disabled>...</Menu.Item>
            <Menu.Item name='10' active={currentPage === '10'} onClick={this.handlePaginationClick} />
            <Menu.Item name='11' active={currentPage === '11'} onClick={this.handlePaginationClick} />
            <Menu.Item name='12' active={currentPage === '12'} onClick={this.handlePaginationClick} />
          </Menu>
        </Container>
      </div>
    );
  }
}

export default App;
