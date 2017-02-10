/**
 * Modules
 */
import React, { Component } from 'react';
import { Container, Menu, Dimmer, Loader } from 'semantic-ui-react';
import { browserHistory } from 'react-router';
import _ from 'lodash';

/**
 * Modules
 */
import AppHeader from '../components/AppHeader';
import SearchForm from '../components/SearchForm';
import BookList from '../components/BookList';

/**
 * Assets
 */
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const query = this.props.location ? this.props.location.query.q : '';

    this.state = {
      isLoading: true,
      items: [],
      query: (query ? query : ''),
      currentPage: 1,
      totalPages: 0
    };

    this.updateItems = this.updateItems.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.executeQuery = this.executeQuery.bind(this);
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
    this.buildPagination = this.buildPagination.bind(this);
  }

  componentDidMount() {
    if (this.state.query !== '') {
      this.executeQuery();
    } else {
      this.setState({ isLoading: false });
    }
  }

  updateQuery(query) {
    browserHistory.push(`?q=${query}`);

    if (query) {
      // Executa a função `executeQuery` só depois que atualizar o state
      this.setState({ isLoading: true, query: query, totalPages: 0 }, this.executeQuery);
    }
  }

  handlePaginationClick(e, { name }) {
    this.setState({ isLoading: true, currentPage: name }, this.executeQuery);
  }

  executeQuery() {
    const apiKey = 'AIzaSyBUPcdvuYoWqmMW02kJ26KcuTiB-lIzRtc';

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.query}&key=${apiKey}&startIndex=${(this.state.currentPage - 1) * 10}&maxResults=10`)
      .then((response) => response.json())
      .then(data => this.updateItems(data));
  }

  updateItems(data) {
    if (this.state.totalPages === 0) {
      const apiKey = 'AIzaSyBUPcdvuYoWqmMW02kJ26KcuTiB-lIzRtc';

      // Devido a um comportamento da API não é possivel fazer uma paginação precisa
      // Mais informações: https://productforums.google.com/forum/#!topic/books-api/Y_uEJhohJCc
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.query}&key=${apiKey}&startIndex=${data.totalItems - 1}&maxResults=1`)
        .then((response) => response.json())
        .then(data => this.setState({ isLoading: false, totalPages: Math.ceil(data.totalItems / 10) }) );
    }

    this.setState({
      isLoading: false,
      items: data.items
    });
  }

  buildPagination(currentPage, totalPages) {
    var current = parseInt(currentPage, 10);
    var last = parseInt(totalPages, 10);
    var delta = 4;
    var left = current - delta;
    var right = current + delta + 1;
    var range = [];
    var rangeWithDots = [];
    var l;

    for (let i = 1; i <= last; i++) {
      if (i === 1 || i === last || (i >= left && i < right)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 4) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  }

  render() {
    const { currentPage, totalPages } = this.state;
    const pagination = _.map(this.buildPagination(currentPage, totalPages), (page, index) => page === '...'
      ? <Menu.Item key={index} disabled>...</Menu.Item>
      : <Menu.Item key={index} name={String(page)} active={parseInt(currentPage, 10) === page} onClick={this.handlePaginationClick} />);

    return (
      <div className="App">
        <AppHeader />

        <Container className="Content">
          <Dimmer page active={this.state.isLoading}>
            <Loader />
          </Dimmer>

          <SearchForm query={this.state.query} loading={this.state.isLoading} updateQuery={this.updateQuery} />

          <BookList query={this.state.query} items={this.state.items} />

          {totalPages > 0 && <Menu pagination className="Pagination">{pagination}</Menu>}
        </Container>
      </div>
    );
  }
}

export default App;
