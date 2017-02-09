import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Item, Button, Icon } from 'semantic-ui-react';
import './BookList.css';

export default class BookList extends React.Component {
  constructor(props) {
    super(props);

    moment.locale('pt-br');
  }

  render() {
    const bookList = _.map(this.props.items, item => {
      const thumbnail = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.smallThumbnail : 'https://satyr.io/128x165?text=hello+world';
      const textSnippet = item.searchInfo && item.searchInfo.textSnippet;
      // const publishedDate = moment(item.volumeInfo.publishedDate, 'YYYY-MM-DD');

      return <Item key={item.id}>
        <Item.Image size='tiny' src={thumbnail} />

        <Item.Content>
          <Item.Header as='a'>{item.volumeInfo.title}</Item.Header>
          <Item.Meta>{item.volumeInfo.subtitle}</Item.Meta>
          <Item.Description dangerouslySetInnerHTML={{ __html: textSnippet }}></Item.Description>
          <Item.Extra>{_.join(item.volumeInfo.authors, ', ')}</Item.Extra>
          <Item.Extra>
            <Button primary floated='right'>
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
