import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Spin, Icon, Layout } from 'antd';
import { connect } from 'react-redux';
import Header from '../header/';
import Main from './Main/';
import { checkUserSession } from '../../ducks/users';
import Conversation from './Conversation/';
// import Web from './Web/';
import './index.css';

const { Content } = Layout;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Messages extends Component {
  componentDidMount() {
    this.props.checkUserSession();
  }
  render() {
    const { isGettingSession, profile } = this.props;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {
          isGettingSession ?
            <Spin indicator={antIcon} style={{ position: 'absolute', top: '50%', left: '50%' }} />
          :
            profile && profile._id ?
              <Layout className="msngr">
                <Header {...this.props} />
                <Content className="mobile site-content art-site-content">
                  <Switch>
                    <Route exact path="/messages" component={Main} {...this.props} />
                    <Route path="/messages/:uid" component={Conversation} {...this.props} />
                  </Switch>
                </Content>
                <Content className="web-view site-content art-site-content">
                  <Switch>
                    <Route path="/(messages|messages/:uid)/" component={Main} {...this.props} />
                  </Switch>
                </Content>
              </Layout>
            : <Redirect to="/" />
        }
      </div>
    );
  }
}

Messages.propTypes = {
  checkUserSession: PropTypes.func.isRequired,
  isGettingSession: PropTypes.bool.isRequired,
  profile: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => state.user;

const mapDispatchToProps = {
  checkUserSession,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Messages));
