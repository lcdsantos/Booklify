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

    this.apiUrl = 'https://www.googleapis.com/books/v1/volumes';
    this.apiKey = 'AIzaSyBUPcdvuYoWqmMW02kJ26KcuTiB-lIzRtc';

    this.state = {
      isLoading: true,
      items: [],
      query: query,
      currentPage: 1,
      totalPages: 0
    };

    this.updateItems           = this.updateItems.bind(this);
    this.updateQuery           = this.updateQuery.bind(this);
    this.executeQuery          = this.executeQuery.bind(this);
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
    this.buildPagination       = this.buildPagination.bind(this);
  }

  componentDidMount() {
    if (this.state.query) {
      this.executeQuery();
    } else {
      this.setState({ isLoading: false });
    }
  }

  /**
   * Update the state and browser's URL to match the query typed in the search bar and make sure
   * that the `executeQuery` function only run after the state has been set.
   *
   * @param {string} query The query
   */
  updateQuery(query) {
    if (query) {
      browserHistory.push(`?q=${query}`);
      this.setState({ isLoading: true, query: query, totalPages: 0 }, this.executeQuery);
    } else {
      browserHistory.push('');
    }
  }

  /**
   * Handle the click on pagination items
   *
   * @param {Event} e             JavaScript event for the click
   * @param {String} options.name The `name` prop in the element
   */
  handlePaginationClick(e, { name }) {
    this.setState({ isLoading: true, currentPage: name }, this.executeQuery);
  }

  /**
   * Make the API Call
   */
  executeQuery() {
    fetch(`${this.apiUrl}?q=${this.state.query}&key=${this.apiKey}&startIndex=${(this.state.currentPage - 1) * 10}&maxResults=10`)
      .then(response => response.json())
      .then(data => this.updateItems(data));
  }

  /**
   * Receives JSON response from the API and set the proper states
   * In order to get a more precise total pages count, we have to do
   * another API call with the (wrong) total pages to get the right one
   *
   * @see https://productforums.google.com/forum/#!topic/books-api/Y_uEJhohJCc
   * @param {Object} data JSON object from the API
   */
  updateItems(data) {
    if (this.state.totalPages === 0 && data.totalItems > 0) {
      fetch(`${this.apiUrl}?q=${this.state.query}&key=${this.apiKey}&startIndex=${data.totalItems - 1}&maxResults=1`)
        .then(response => response.json())
        .then(data => this.setState({ isLoading: false, totalPages: Math.ceil(data.totalItems / 10) }) );
    }

    this.setState({
      isLoading: false,
      items: data.items
    });
  }

  /**
   * Build an array of pages within a range
   * Based on this Gist https://gist.github.com/kottenator/9d936eb3e4e3c3e02598 by kottenator
   *
   * @param  {Integer} currentPage Currently active page
   * @param  {Integer} totalPages  Number of total pages
   * @return {Array}               A pagination as an array
   */
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
