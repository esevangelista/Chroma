import React, { Component } from 'react';
// import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import Header from '../header/';
import Hero from '../hero/';
import Landing from '../landing/';
import Footer from '../../global/footer/';
import './main.css';

const { Content } = Layout;

// class Main extends Component {
//   render() {
//     return (
//       <Content>
//         <Layout>
//           <Header />
//           <Content>
//             <Hero />
//             <Landing />
//           </Content>
//           <Footer />
//         </Layout>
//       </Content>
//     );
//   }
// }

class Main extends Component {
  render() {
    return (
       <Content>
        <Layout>
          <Header />
          <Content>
            <Hero />
            <Landing />
          </Content>
        </Layout>
        <Footer />
      </Content>
    )
  }
}
export default Main;
