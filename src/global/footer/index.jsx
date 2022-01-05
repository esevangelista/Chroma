import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './footer.css';


class FooterContent extends Component {
  render() {
    return (
      <div className="footer">
        <Row type="flex" justify="center" align="top" className="footer-container">   
          <Col className="col-container" xs={12} sm={6} md={6} lg={6} xl={4} >
            <h3> Artworks </h3>
            <a href="/artworks"><p> Form </p></a>
            <a href="/artworks"><p> Style </p></a>
            <a href="/artworks"><p> Subject </p></a>
          </Col>
          <Col className="col-container" xs={12} sm={6} md={6} lg={6} xl={4} >
            <h3> Artists</h3>
            <a href="/artists"><p> Artist Search </p></a>
            <a href="/FAQs/artists/why-sell"><p> Sell on Chroma</p></a>
          </Col>
          <Col className="col-container" xs={12} sm={6} md={6} lg={6} xl={4}>
            <h3> FAQs</h3>
            <a href="/FAQs/artists"><p> For Artists </p></a>
            <a href="/FAQs/art-buyers"><p> For Art Buyers </p></a>
          </Col>
          <Col className="col-container" xs={12} sm={6} md={6} lg={6} xl={4}>
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
      </div>
    );
  }
}

export default FooterContent;
