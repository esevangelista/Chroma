import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../pages/header';
import Main from '../pages/Main/';
import Footer from '../global/footer/';
import ConfirmAccount from '../pages/confirmEmail';
import AlertContainer from '../global/alertContainer';
import { checkUserSession } from '../ducks/users';
import './App.css';


const { Content } = Layout;

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  // componentDidMount() {
  //   this.props.checkUserSession();
  // }
  render() {
    return (
      <Layout>
        <AlertContainer />
        <Content>
          <Switch>
            <Route path="/verify-account/:confirmToken" component={ConfirmAccount} />
            <Route exact path="/"component={props => <Main {...props} />} />
          </Switch>
        </Content>
        <Footer />
      </Layout>
    );
  }
}

// App.propTypes = {
//   checkUserSession: PropTypes.func.isRequired,
// };
// const mapStateToProps = state => state;

// export default withRouter(connect(mapStateToProps, { checkUserSession })(App));
export default withRouter(App);
