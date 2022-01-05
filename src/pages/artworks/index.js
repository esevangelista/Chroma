import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Spin, Icon } from 'antd';
import Header from '../header/';
import Footer from '../../global/footer/';
import ArtMain from './ArtMain/';
import ViewArtwork from './ViewArtwork';
import { checkUserSession } from '../../ducks/users';
import { cleanFilter } from '../../ducks/artworks';
import './artworks.css';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const { Content } = Layout;

class Artworks extends Component {
  componentDidMount() {
    this.props.checkUserSession();
  }
  componentWillUnmount() {
    this.props.cleanFilter();
  }
  render() {
    const { isGettingSession } = this.props;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {
          isGettingSession ?
            <Spin indicator={antIcon} style={{ position: 'absolute', top: '50%' }} />
          :
            <Layout>
              <Header {...this.props} />
              <Content className="site-content art-site-content">
                <Switch>
                  <Route exact path="/artworks" component={ArtMain} {...this.props} />
                  <Route path="/artworks/:_id" component={ViewArtwork} {...this.props} />
                </Switch>
              </Content>
              <Footer />
            </Layout>
        }
      </div>
    );
  }
}

Artworks.propTypes = {
  checkUserSession: PropTypes.func.isRequired,
  isGettingSession: PropTypes.bool.isRequired,
  cleanFilter: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.user;

const mapDispatchToProps = {
  checkUserSession,
  cleanFilter,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Artworks));
