import React, { Component } from 'react';
// import { Route, Switch } from 'react-router-dom';
import { Layout, Row, Col, Divider } from 'antd';
import './footer.css';

const { Content } = Layout;

class Footer extends Component {
  render() {
    return (
      <Content>
        <Row type="flex" justify="center" className="footer-container">       
          <Col className="col-container" xs={12} sm={6} md={6} lg={6} xl={6} >
            <h3> Artworks </h3>
            <a href="/"><p> Form </p></a>
            <a href="/"><p> Style </p></a>
            <a href="/"><p> Subject </p></a>
          </Col>
          <Col className="col-container" xs={12} sm={6} md={6} lg={6} xl={6} >
            <h3> Artists</h3>
            <a href="/"><p> A-Z </p></a>
            <a href="/"><p> Commission artwork </p></a>
            <a href="/"><p> Sell on Chroma</p></a>
          </Col>   
          <Col className="col-container" xs={12} sm={6} md={6} lg={6} xl={6}>
            <h3> FAQs</h3>
            <a href="/"><p> For Artists </p></a>
            <a href="/"><p> For Art Buyers </p></a>
          </Col> 
          <Col className="col-container" xs={12} sm={6} md={6} lg={6} xl={6}>
            <h3> About </h3>
            <a href="/"><p> Chroma </p></a>
            <a href="/"><p> Contact Us </p></a>
          </Col>
        </Row>
        <div className="extra-mask">
          <div className="extra">
            <h4>© CHROMA 2019</h4>
            <a href="/"><p> Terms of Use </p></a>
            <a href="/"><p> Privacy Policy </p></a>
          </div>
        </div>
      </Content>
    );
  }
}

export default Footer;
