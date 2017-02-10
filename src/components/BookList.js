/**
 * Modules
 */
import React, { Component } from 'react';
import { Item, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router';
import moment from 'moment';
import _ from 'lodash';

/**
 * Assets
 */
import './BookList.css';

class BookList extends Component {
  constructor(props) {
    super(props);

    moment.locale('pt-br');
  }

  render() {
    const bookList = _.map(this.props.items, item => {
      const thumbnail = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.smallThumbnail.replace('&edge=curl', '') : `https://placehold.it/128x165?text=${item.volumeInfo.title}`;
      const textSnippet = item.searchInfo && item.searchInfo.textSnippet;
      // const publishedDate = moment(item.volumeInfo.publishedDate, 'YYYY-MM-DD');

      return <Item key={item.id}>
        <Item.Image size='tiny' src={thumbnail} />

        <Item.Content>
          <Item.Header as={Link} to={`/detalhe/${item.id}`}>{item.volumeInfo.title}</Item.Header>
          <Item.Meta>{item.volumeInfo.subtitle}</Item.Meta>
          <Item.Description dangerouslySetInnerHTML={{ __html: textSnippet }}></Item.Description>
          <Item.Extra>{_.join(item.volumeInfo.authors, ', ')}</Item.Extra>
          <Item.Extra>
            <Button primary floated='right' as={Link} to={`/detalhe/${item.id}`}>
              Ver mais detalhes
              <Icon name='right chevron' />
            </Button>
          </Item.Extra>
        </Item.Content>
      </Item>
    });

    const hasItems = typeof this.props.items !== 'undefined';

    return (
      hasItems
        ? <Item.Group className="BookList">{bookList}</Item.Group>
        : <h1>Nenhum resultado encontrado :(</h1>
    );
  }
}

export default BookList;