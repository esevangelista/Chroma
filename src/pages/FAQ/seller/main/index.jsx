import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, List, Typography, Divider } from 'antd';
import './main.css';

const { Text } = Typography;
const data = [
  {
    key: '0',
    icon: 'rocket',
    title: 'Why Sell On Chroma',
    description: 'Wondering how can chroma help you promote your works? ',
    route: '/FAQs/artists/why-sell',
  },
  {
    key: '1',
    icon: 'read',
    title: 'Getting Started',
    description: 'A simple guide on how to start selling on Chroma.',
    route: '/FAQs/artists/getting-started',
  },
  {
    key: '2',
    icon: 'shop',
    title: 'Managing Your Artwork Listings',
    description: 'Helpful instructions to familiarize yourself on the managing your listings.',
    route: '/FAQs/artists/artworks',
  },
  {
    key: '2.1',
    icon: 'book',
    title: 'Managing Your Transactions',
    description: 'Familiarize yourself on the managing your transactions.',
    route: '/FAQs/artists/transactions',
  },
  {
    key: '3',
    icon: 'picture',
    title: 'Listing Your Artworks',
    description: 'Your step-by-step tutorial on how to add and update an artwork listing.',
    route: '/FAQs/artists/listing-an-artwork',
  },
  {
    key: '4',
    icon: 'audit',
    title: 'Payments',
    description: 'Learn how you can manage your payment.',
    route: '/FAQs/artists/payment',
  },
  {
    key: '5',
    icon: 'interaction',
    title: 'Returns and Refunds',
    description: 'How does returns and refunds work?',
    route: '/FAQs/artists/returns-and-refunds',
  },
  {
    key: '5',
    icon: 'table',
    title: 'Delivery',
    description: 'Tips on packaging and shipping your artworks',
    route: '/FAQs/artists/delivery',
  },
  {
    key: '7',
    icon: 'stop',
    title: 'Deactivate Your Seller Account',
    description: 'Learn how to deactivate your account.',
    route: '/FAQs/artists/deactivate',
  },
];


class Main extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="seller-faq-main">
        <Text id="title"> Artist's Handbook </Text>
        <Divider />
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item key={item.key}>
              <Link to={item.route}>
                <List.Item.Meta
                  avatar={<Avatar icon={item.icon} />}
                  title={item.title}
                  description={item.description}
                />
              </Link>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default Main;
