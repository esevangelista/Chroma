import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Typography, Divider, Row, Col } from 'antd';

const { Text, Title, Paragraph } = Typography;

class Deactivate extends Component {
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
            <Link to="/FAQs/artists/deactivate">Deactivating Your Seller Account</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Title level={3} id="title">How to deactivate my seller account?</Title>
        <Divider />
        <div className="section">
          <Paragraph>
            To deactivate your account, go to your account settings (My Account page) and simply hit the deactivate button at the bottom of the page.
            When you deactivate your seller account, you will not be able to use the dashboard anymore until you activate once again.
            Deactivating seller account only affects your privileges as a seller which means that you can still use your account for browsing
            and buying artworks. If you wish to activate once again, you may do so at your account settings.
          </Paragraph>
        </div>
        <Divider />
        <Text id="related">Related Articles </Text><br />
        <ul>
          <li><Text id="more-on"><Link to="/FAQs/artists/store/getting-started">Getting Started</Link></Text></li>
        </ul>
      </div>
    );
  }
}

export default Deactivate;
