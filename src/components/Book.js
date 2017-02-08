import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import './Book.css';

export default class Book extends React.Component {
  constructor(props) {
    super(props);

    moment.locale('pt-br');
  }

  render() {
    const thumbnail = (this.props.info.volumeInfo.imageLinks) ? this.props.info.volumeInfo.imageLinks.smallThumbnail : 'https://satyr.io/128x165?text=hello+world';
    const publishedDate = moment(this.props.info.volumeInfo.publishedDate, 'YYYY-MM-DD');
    const textSnippet = this.props.info.searchInfo && this.props.info.searchInfo.textSnippet;

    return (
      <div className="Card">
        <div className="CardHeader">
          <img src={thumbnail && thumbnail} alt="" width="128" height="165" />
          <div>
            <h2 className="BookTitle">{this.props.info.volumeInfo.title}</h2>
            <h4 className="BookSubTitle">{this.props.info.volumeInfo.subtitle}</h4>
          </div>
        </div>
        <table className="BookInfo">
          <tbody>
            <tr>
              <th><strong>Autor:</strong></th>
              <td>{_.join(this.props.info.volumeInfo.authors, ', ')}</td>
            </tr>
            <tr>
              <th><strong>Editora:</strong></th>
              <td>{this.props.info.volumeInfo.publisher}</td>
            </tr>
            <tr>
              <th><strong>Data de publicação:</strong></th>
              <td>{publishedDate.format('LL')}</td>
            </tr>
            <tr>
              <th><strong>Descrição:</strong></th>
              <td dangerouslySetInnerHTML={{ __html: textSnippet }}></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
