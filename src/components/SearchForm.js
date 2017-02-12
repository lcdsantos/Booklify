/**
 * Modules
 */
import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';

/**
 * Assets
 */
import './SearchForm.css';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = { query: this.props.query };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ query: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.updateQuery(this.state.query);
  }

  render() {
    return (
      <Form className="SearchForm" onSubmit={this.handleSubmit}>
        <Form.Field>
          <Input loading={this.props.loading} icon='search' action='Buscar' iconPosition='left' placeholder='Tente buscar por um livro ou um autor...' name='q' onChange={this.handleChange} value={this.state.query || ''} />
        </Form.Field>
      </Form>
    );
  }
}

export default SearchForm;