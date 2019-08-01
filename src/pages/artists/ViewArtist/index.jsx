import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spin, Icon } from 'antd';
import { getArtistRequest } from '../../../ducks/artists';
import Content from './Content/';
import NotFound from '../../../global/notFound/';
import './viewArtist.css';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class ViewArtist extends Component {
  componentDidMount() {
    const { _id } = this.props.match.params;
    this.props.getArtistRequest(_id);
  }
  handleMenuClick = e => this.setState({ current: e.key });
  render() {
    const { isFetching, error, message } = this.props;
    return (
      <div>
        {
          isFetching ?
            <Spin indicator={antIcon} style={{ position: 'absolute', left: '50%', top: '50%' }} />
          : error ?
            <NotFound />
          : <Content match={this.props.match} />
        }
      </div>
    );
  }
}

ViewArtist.propTypes = {
  getArtistRequest: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  artist: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => state.artists;
const mapDispatchToProps = { getArtistRequest };

export default connect(mapStateToProps, mapDispatchToProps)(ViewArtist);
