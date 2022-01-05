import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Typography, Divider, Row, Col } from 'antd';
import './artworks.css';

const { Text, Title, Paragraph } = Typography;

class Artworks extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="seller-faq-get-started">
        <Breadcrumb className="routes">
          <Breadcrumb.Item>
            <Link to="/FAQs/artists">Artist's Handbook</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/FAQs/artists/artworks">Managing Your Artwork Listings</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Title level={3} id="title">Managing Your Artwork Listings</Title>
        <Divider />
        <div className="section">
          <Paragraph>
            All artwork listings you added will be available through the My Artworks page at the store dashboard.
            You may browse, update, and remove artworks to your own will.
          </Paragraph>
          <Row type="flex" justify="space-around" align="middle">
            <Col xs={20} lg={11}>
              <img src="/faqs/seller/str-art.png" alt="" />
            </Col>
            <Col xs={20} lg={11}>
              <img src="/faqs/seller/str-art1.png" alt="" />
              <img src="/faqs/seller/str-art2.png" alt="" />
            </Col>
          </Row>
        </div>
        <Divider />
        <Text id="related">Related Articles </Text><br />
        <ul>
          <li><Text id="more-on"><Link to="/FAQs/artists/transactions">Managing Your Transactions</Link></Text></li>
          <li><Text id="more-on"><Link to="/FAQs/artists/listing-an-artwork">Listing An Artwork</Link></Text></li>
          <li><Text id="more-on"><Link to="/FAQs/artists/deactivate">Deactivate Seller Account</Link></Text></li>
        </ul>
      </div>
    );
  }
}

export default Artworks;
