import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Spin, Icon } from 'antd';
import Header from '../header/';
import Footer from '../../global/footer/';
import Main from './Main/';
import ViewArtist from './ViewArtist/';
import { checkUserSession } from '../../ducks/users';
import './artists.css';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const { Content } = Layout;

class Artist extends Component {
  componentDidMount() {
    this.props.checkUserSession();
  }
  render() {
    const { isGettingSession } = this.props;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {
          isGettingSession ?
            <Spin indicator={antIcon} style={{ margin: '32px 0', position: 'absolute', left: '50%' }} />
          :
            <Layout>
              <Header {...this.props} />
              <Content className="site-content art-site-content">
                <Switch>
                  <Route exact path="/artists" component={Main} {...this.props} />
                  <Route path="/artists/:_id" component={ViewArtist} {...this.props} />
                </Switch>
              </Content>
              <Footer />
            </Layout>
        }
      </div>
    );
  }
}

Artist.propTypes = {
  checkUserSession: PropTypes.func.isRequired,
  isGettingSession: PropTypes.bool.isRequired,
};

const mapStateToProps = state => state.user;

const mapDispatchToProps = {
  checkUserSession,
};

export default connect(mapStateToProps, mapDispatchToProps)(Artist);
