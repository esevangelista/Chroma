import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Spin } from 'antd';
import Hero from '../hero/';
import Landing from '../landing/';
import Header from '../header/';
import Footer from '../../global/footer/';
import { checkUserSession } from '../../ducks/users';
import './main.css';

const { Content } = Layout;

class Main extends Component {
  componentDidMount() {
    this.props.checkUserSession();
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <Content>
        {
          this.props.isGettingSession ?
            <Spin style={{ top: '50%', left: '50%', position: 'absolute' }} />
          :
            <Layout>
              <Header {...this.props} />
              <Content className="land">
                <Hero />
                <Landing />
              </Content>
              <Footer />
            </Layout>
        }
      </Content>
    );
  }
}

Main.propTypes = {
  checkUserSession: PropTypes.func.isRequired,
  isGettingSession: PropTypes.bool.isRequired,
};
const mapStateToProps = state => state.user;

export default connect(mapStateToProps, { checkUserSession })(Main);
