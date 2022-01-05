import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Typography, Divider } from 'antd';

const { Text, Title, Paragraph } = Typography;

class Payments extends Component {
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
            <Link to="/FAQs/artists/payment">Payments</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Title level={3} id="title">How do I get paid?</Title>
        <Divider />
        <Paragraph id="para">
          CHROMA gives its users the freedom to communicate and directly through chat on how to handle the payment process. Once an order has been placed,
          you must message the buyer about the necessary bank account details for payment transfer.
          Wait until you receive payment and a proof of payment before shipping the ordered item/s.
        </Paragraph>
        <Divider />
        <Text id="more-on"> Read more on our article about <Link to="/FAQs/artists/transactions">transactions</Link>.</Text>
      </div>
    );
  }
}

export default Payments;
