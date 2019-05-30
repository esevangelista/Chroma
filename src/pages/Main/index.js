import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import Hero from '../hero/';
import Landing from '../landing/';
import Header from '../header/';
import { checkUserSession } from '../../ducks/users';
import './main.css';

const { Content } = Layout;

class Main extends Component {
  componentDidMount() {
    this.props.checkUserSession();
  }
  render() {
    return (
      <Content>
        <Layout>
          <Header {...this.props} />
          <Content>
            <Hero />
            <Landing />
          </Content>
        </Layout>
      </Content>
    );
  }
}

Main.propTypes = {
  checkUserSession: PropTypes.func.isRequired,
};
const mapStateToProps = state => state;

export default connect(mapStateToProps, { checkUserSession })(Main);
// export default Main;