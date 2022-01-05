import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spin, Icon, Result } from 'antd';
import { getArtistRequest } from '../../../../ducks/artists';
import Content from './content';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Reviews extends Component {
  componentDidMount() {
    this.props.getArtistRequest(this.props.me);
  }
  render() {
    const { isFetching, error, message } = this.props;
    return (
      <div>
        {
          isFetching ?
            <Spin indicator={antIcon} style={{ position: 'absolute', left: '50%', top: '50%' }} />
          : error ?
            <Result status="500" title='Something went wrong.' subTitle={message} />
          : <Content artist={this.props.artist} />
        }
      </div>
    );
  }
}

Reviews.propTypes = {
  getArtistRequest: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  artist: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => state.artists;
const mapDispatchToProps = { getArtistRequest };

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
