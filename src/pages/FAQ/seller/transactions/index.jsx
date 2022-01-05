import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Typography, Divider, Row, Col, Tag } from 'antd';

const { Text, Title, Paragraph } = Typography;

class Transactions extends Component {
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
            <Link to="/FAQs/artists/transactions">Managing Your Transactions</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Title level={3} id="title">Managing Your Transactions </Title>
        <Divider />
        <div className="section">
          <Title level={4} id="title">How does it work?</Title>
          <Row type="flex" justify="space-around" align="middle">
            <Col xs={24} lg={24}>
              <img src="/faqs/seller/str-trans1.png" alt="" />
            </Col>
          </Row>
          <Paragraph>
            The process of completing a transaction will be explained in this article.
            All transactions will be visible at the transactions page in your dashboard.
            Transactions are categorized based on its current status. Your transactions may be categorized as
            pending, canceled, reserved, shipped, and completed. Below is an explanation on what this tags mean and
            what you should do.
            <ul>
              <li>
                <Tag color="volcano">Pending</Tag><br />
                Newly created transactions will be marked as pending. This means you should message the buyer as soon as possible
                 and send him/her the bank account details necessary for payment transfer. The transaction will be pending until the buyer
                 paid and attached a proof of payment or canceled the order. If the payment hasn't been paid for 7 days, it will automatically be
                 canceled. 
              </li>
              <li>
                <Tag color="red">Canceled</Tag><br />
                If a buyer was not able to deposit the payment 7 days after the order was placed,
                the transaction will be canceled and your artwork will be available for sale again.
                A buyer can also cancel his/her order as long as it's still pending and you haven't received payment yet.
              </li>
              <li>
                <Tag color="blue">Reserved</Tag><br />
                Once the buyer attached a proof of payment and transferred the money to your bank account,
                the items ordered will now be officially reserved. This means that you should package and ship the items
                to the address provided by the buyer.
              </li>
              <li>
                <Tag color="purple">Shipped</Tag><br />
                Once you have sent the order to the courier, you should update the record on the dashboard and upload a receipt
                that confirms that the order was successfully handed over to the courier. To let the buyer track the order, it is
                necessary to provide the courier used and the tracking number.
              </li>
              <li>
                <Tag color="green">Completed</Tag><br />
                Once the buyer has received the package, you may now update the record to conclude the transaction.
                This step is important in order to allow the buyer rate and review the transaction.
              </li>
            </ul>
          </Paragraph>
        </div>
        <Divider />
        <Text id="related">Related Articles </Text><br />
        <ul>
          <li><Text id="more-on"><Link to="/FAQs/artists/store/artworks">Managing Your Artwork Listings</Link></Text></li>
          <li><Text id="more-on"><Link to="/FAQs/artists/delivery">How to package and ship an artwork?</Link></Text></li>
        </ul>
      </div>
    );
  }
}

export default Transactions;
