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

    this.state = {
      isLoading: true,
      data: {}
    };

    this.fetchData = this.fetchData.bind(this);

    moment.locale('pt-br');
  }

  fetchData() {
    fetch(`https://www.googleapis.com/books/v1/volumes/${this.props.params.bookId}`)
      .then(response => response.json())
      .then(data => this.setState({ isLoading: false, data: data }));
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    let bookDetail;

    if (this.state.data.volumeInfo) {
      const volumeInfo = this.state.data.volumeInfo;
      const thumbnail = volumeInfo.imageLinks ? volumeInfo.imageLinks.small.replace('&edge=curl', '') : `https://placehold.it/300x450?text=${volumeInfo.title}`;
      const publishedDate = moment(volumeInfo.publishedDate, 'YYYY-MM-DD');
      const rating = volumeInfo.averageRating ? <Rating icon='star' defaultRating={volumeInfo.averageRating} maxRating={5} disabled /> : '';

      bookDetail = <Item>
        <Item.Image size='medium' src={thumbnail} />

        <Item.Content>
          <Item.Header>{volumeInfo.title}</Item.Header>
          <Item.Meta>{volumeInfo.subtitle}</Item.Meta>
          <Item.Description dangerouslySetInnerHTML={{ __html: volumeInfo.description }}></Item.Description>
          <Item.Extra>{rating}</Item.Extra>
          <Item.Extra>Autor: {_.join(volumeInfo.authors, ', ')}</Item.Extra>
          <Item.Extra>Editora: {volumeInfo.publisher}</Item.Extra>
          <Item.Extra>Data de publicação: {publishedDate.format('LL')}</Item.Extra>
          <Item.Extra>Número de páginas: {volumeInfo.printedPageCount}</Item.Extra>
          <Item.Extra>Categorias: {volumeInfo.categories}</Item.Extra>
          <Item.Extra>
            <Button primary onClick={browserHistory.goBack}>
              <Icon name='left chevron' />
              Voltar
            </Button>
          </Item.Extra>
        </Item.Content>
      </Item>;
    }


    return (
      <div className="Detalhes">
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