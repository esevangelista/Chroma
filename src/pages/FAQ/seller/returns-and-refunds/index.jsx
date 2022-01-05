import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Typography, Divider } from 'antd';

const { Text, Title, Paragraph } = Typography;

class ReturnsRefunds extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="seller-faq-why">
        <Breadcrumb className="routes">
          <Breadcrumb.Item>
            <Link to="/FAQs/artists">Artist's Handbook</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/FAQs/artists/returns-and-refunds">Returns and Refunds</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Title level={3} id="title">Returns and Refunds</Title>
        <Divider />
        <Paragraph id="para">
          Just like for payments, we let the the buyer and seller handle returns and refunds. Users may utilize
          the chat feature to settle concerns over their transaction. Should there be more concerns, please send us an email
          with attached receipts of your transaction and conversation.
        </Paragraph>
        <Divider />
        <Text id="more-on"> Read a similar article about <Link to="/FAQs/artists/payment">payments</Link>.</Text>
      </div>
    );
  }
}

export default ReturnsRefunds;
