/**
 * Modules
 */
import React, { Component } from 'react';
import { Container, Item, Button, Icon, Dimmer, Loader, Rating } from 'semantic-ui-react';
import { browserHistory } from 'react-router';
import moment from 'moment';
import _ from 'lodash';

/**
 * Components
 */
import AppHeader from '../components/AppHeader';

class BookDetail extends Component {
  constructor(props) {
    super(props);

    this.apiUrl = 'https://www.googleapis.com/books/v1/volumes';

    this.state = {
      isLoading: true,
      data: {}
    };

    moment.locale('pt-br');
  }

  /**
   * Get the book details from the API and set the state accordingly
   */
  fetchData() {
    fetch(`${this.apiUrl}/${this.props.params.bookId}`)
      .then(response => response.json())
      .then(data => this.setState({ isLoading: false, data: data }));
  }

  componentWillMount() {
    this.fetchData();
  }

  /**
   * Get the biggest possible thumbnail or return a placeholder image
   *
   * @param  {Object} imageLinks Image links from the API
   * @param  {String} title      Text for the alternative image
   * @return {String}            Thumbnail URL
   */
  getThumbnail(imageLinks, title) {
    let thumbnail;

    if (imageLinks.small) {
      thumbnail = imageLinks.small;
    } else if (imageLinks.smallThumbnail) {
      thumbnail = imageLinks.smallThumbnail;
    } else {
      thumbnail = `https://placehold.it/300x450?text=${title}`;
    }

    return thumbnail.replace('&edge=curl', '');
  }

  render() {
    let bookDetail;

    if (this.state.data.volumeInfo) {
      const volumeInfo    = this.state.data.volumeInfo;
      const thumbnail     = this.getThumbnail(volumeInfo.imageLinks, volumeInfo.title);
      const publishedDate = moment(volumeInfo.publishedDate, 'YYYY-MM-DD');
      const rating        = volumeInfo.averageRating
        ? <Rating icon='star' defaultRating={volumeInfo.averageRating} maxRating={5} disabled title={`Avaliação: ${volumeInfo.averageRating}/5`} />
        : '';

      bookDetail = <Item>
        <Item.Image size='medium' src={thumbnail} />

        <Item.Content>
          <Item.Header>{volumeInfo.title}</Item.Header>
          <Item.Meta>{volumeInfo.subtitle}</Item.Meta>
          <Item.Description dangerouslySetInnerHTML={{ __html: volumeInfo.description }}></Item.Description>
          <Item.Extra>{rating}</Item.Extra>
          <Item.Extra><strong>Autor:</strong> {_.join(volumeInfo.authors, ', ')}</Item.Extra>
          <Item.Extra><strong>Editora:</strong> {volumeInfo.publisher}</Item.Extra>
          <Item.Extra><strong>Data de publicação:</strong> {publishedDate.format('LL')}</Item.Extra>
          <Item.Extra><strong>Número de páginas:</strong> {volumeInfo.printedPageCount}</Item.Extra>
          <Item.Extra><strong>Categorias:</strong> {volumeInfo.categories}</Item.Extra>
          <Item.Extra>
            <Button primary onClick={browserHistory.goBack}>
              <Icon name='left chevron' />
              Voltar
            </Button>
          </Item.Extra>
        </Item.Content>
      </Item>;
    } else {
      bookDetail = <div hidden={this.state.isLoading}><Item>
        <h2>Ops! Não conseguimos encontrar a sua requisição :(</h2>
        <Button primary onClick={browserHistory.goBack}>
          <Icon name='left chevron' />
          Voltar
        </Button>
      </Item></div>
    }

    return (
      <div className="BookDetail">
        <AppHeader />

        <Container className="Content">
          <Dimmer page active={this.state.isLoading}>
            <Loader />
          </Dimmer>

          <Item.Group>{bookDetail}</Item.Group>
        </Container>
      </div>
    );
  }
}

export default BookDetail;