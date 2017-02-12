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

  /**
   * Return items in localStore as an array
   *
   * @return {Array} Items saved in localStorage
   */
  getLikedItemsFromLocalStorage() {
    const liked = localStorage.getItem('liked');

    return liked ? JSON.parse(liked) : [];
  }

  /**
   * Handle the click on the like buttons
   *
   * @param {Event} e             JavaScript event for the click
   * @param {String} options.name The `name` prop in the element
   */
  handleLikeClick(e, { name }) {
    const itemId = name;
    const likedItems = this.getLikedItemsFromLocalStorage();

    if (_.includes(this.state.likedItems, itemId)) {
      _.pull(likedItems, itemId);
    } else {
      likedItems.push(itemId);
    }

    localStorage.setItem('liked', JSON.stringify(likedItems));
    this.setState({ likedItems: likedItems });
  }

  /**
   * Surrounds searched words in a <mark> tag to highlight it
   *
   * @param  {String} text  Input string
   * @param  {String} query The searched query
   * @return {String}       The original string with the words highlighted
   */
  highlightQuery(text = '', query) {
    const words = query.split(/\s+/).join('|');
    const matchRE = new RegExp('\\b(' + words + ')', 'ig');

    return text.replace(matchRE, '<mark>$&</mark>');
  }

  render() {
    const bookList = _.map(this.props.items, item => {
      const query = this.props.query;
      const volumeInfo = item.volumeInfo;

      const thumbnail = (volumeInfo.imageLinks)
        ? volumeInfo.imageLinks.smallThumbnail.replace('&edge=curl', '')
        : `https://placehold.it/128x165?text=${volumeInfo.title}`;

      const textSnippet = item.searchInfo && this.highlightQuery(item.searchInfo.textSnippet, query);
      const title       = this.highlightQuery(volumeInfo.title, query);
      const subtitle    = this.highlightQuery(volumeInfo.subtitle, query);
      const authors     = this.highlightQuery(_.join(volumeInfo.authors, ', '), query);

      return <Item key={item.id}>
        <Item.Image as={Link} to={`/detalhe/${item.id}`} size='tiny' src={thumbnail} />

        <Item.Content>
          <Item.Header as={Link} to={`/detalhe/${item.id}`} dangerouslySetInnerHTML={{ __html: title }}></Item.Header>
          <Item.Meta dangerouslySetInnerHTML={{ __html: subtitle }}></Item.Meta>
          <Item.Description dangerouslySetInnerHTML={{ __html: textSnippet }}></Item.Description>
          <Item.Extra dangerouslySetInnerHTML={{ __html: authors }}></Item.Extra>
          <Item.Extra>
            <Button as={Link} to={`/detalhe/${item.id}`} primary floated='right' icon='right chevron' content='Ver mais detalhes' labelPosition='right' />
            <Button toggle active={_.includes(this.state.likedItems, item.id)} floated='right' icon='heart' content='Curtir' labelPosition='left' name={item.id} onClick={this.handleLikeClick} />
          </Item.Extra>
        </Item.Content>
      </Item>
    });

    return (
      this.props.items
        ? <Item.Group className="BookList">{bookList}</Item.Group>
        : <div><h1>Nenhum resultado encontrado :(</h1><h3>Tente pesquisar novamente usando outros termos.</h3></div>
    );
  }
}

export default BookList;