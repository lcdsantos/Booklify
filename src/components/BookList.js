/**
 * Modules
 */
import React, { Component } from 'react';
import { Item, Button } from 'semantic-ui-react';
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

    this.handleLikeClick = this.handleLikeClick.bind(this);

    this.state = { likedItems: [] };

    moment.locale('pt-br');
  }

  componentDidMount() {
    this.setState({ likedItems: this.getLikedItemsFromLocalStorage() });
  }

  getLikedItemsFromLocalStorage() {
    const liked = localStorage.getItem('liked');

    return liked ? JSON.parse(liked) : [];
  }

  handleLikeClick(e, { name }) {
    const itemId = name;
    const likedItems = this.getLikedItemsFromLocalStorage();

    if (this.isLiked(itemId)) {
      _.pull(likedItems, itemId);
    } else {
      likedItems.push(itemId);
    }

    localStorage.setItem('liked', JSON.stringify(likedItems));
    this.setState({ likedItems: likedItems });
  }

  isLiked(id) {
    return _.includes(this.state.likedItems, id);
  }

  highlightQuery(str) {
    const words = this.props.query.split(/\s+/).join('|');
    const matchRE = new RegExp('\\b(' + words + ')', 'ig');

    return str.replace(matchRE, '<mark>$&</mark>');
  }

  render() {
    const bookList = _.map(this.props.items, item => {
      const volumeInfo = item.volumeInfo;

      const thumbnail = (volumeInfo.imageLinks)
        ? volumeInfo.imageLinks.smallThumbnail.replace('&edge=curl', '')
        : `https://placehold.it/128x165?text=${volumeInfo.title}`;

      const textSnippet = item.searchInfo && this.highlightQuery(item.searchInfo.textSnippet);
      const title = volumeInfo.title && this.highlightQuery(volumeInfo.title);
      const subtitle = volumeInfo.subtitle && this.highlightQuery(volumeInfo.subtitle);
      const authors = volumeInfo.authors && this.highlightQuery(_.join(volumeInfo.authors, ', '));

      return <Item key={item.id}>
        <Item.Image as={Link} to={`/detalhe/${item.id}`} size='tiny' src={thumbnail} />

        <Item.Content>
          <Item.Header as={Link} to={`/detalhe/${item.id}`} dangerouslySetInnerHTML={{ __html: title }}></Item.Header>
          <Item.Meta dangerouslySetInnerHTML={{ __html: subtitle }}></Item.Meta>
          <Item.Description dangerouslySetInnerHTML={{ __html: textSnippet }}></Item.Description>
          <Item.Extra dangerouslySetInnerHTML={{ __html: authors }}></Item.Extra>
          <Item.Extra>
            <Button as={Link} to={`/detalhe/${item.id}`} primary floated='right' icon='right chevron' content='Ver mais detalhes' labelPosition='right' />
            <Button toggle active={this.isLiked(item.id)} floated='right' icon='heart' content='Curtir' labelPosition='left' name={item.id} onClick={this.handleLikeClick} />
          </Item.Extra>
        </Item.Content>
      </Item>
    });

    const hasItems = typeof this.props.items !== 'undefined';

    return (
      hasItems
        ? <Item.Group className="BookList">{bookList}</Item.Group>
        : <div><h1>Nenhum resultado encontrado :(</h1><h3>Tente pesquisar novamente usando outros termos.</h3></div>
    );
  }
}

export default BookList;