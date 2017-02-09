import React from 'react';
import { Form, Input } from 'semantic-ui-react';
import './SearchForm.css';

export default class SearchForm extends React.Component {
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
          <Input loading={this.props.loading} icon='search' action='Buscar' iconPosition='left' placeholder='Buscar...' name='query' onChange={this.handleChange} value={this.state.query} />
        </Form.Field>
      </Form>
    );
  }
}
