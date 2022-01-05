import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Typography, Divider } from 'antd';
import './whysell.css';

const { Text, Title, Paragraph } = Typography;

class WhySell extends Component {
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
            <Link to="/FAQs/artists/why-sell">Why Sell</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Title level={3} id="title"> Why Sell On CHROMA </Title>
        <Divider />
        <Paragraph id="para">
          CHROMA aims to help rising and independent artists promote their works in the Philippine artworld.
          Joining us means increasing exposure to opportunities as we 
          intend to create a space for Filipino artists to cultivate 
          their career and provide an accessible and efficient way to introduce their talent and expand their market size. 
        </Paragraph>
        <Text id="what"> What can you do with CHROMA? </Text>
        <ul className="list">
          <li>
            Upload your artworks and manage them in a dashboard created for you.
          </li>
          <li>
            You will have direct control on your transactions and products.
          </li>
          <li>
            Directly communicate with a customer to establish or increase level of trust.
          </li>
        </ul>
        <Divider />
        <Text id="more-on"> Read more on our article about <Link to="/FAQs/artists/getting-started"> getting started</Link>.</Text>
      </div>
    );
  }
}

export default WhySell;
