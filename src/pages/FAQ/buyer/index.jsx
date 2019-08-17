import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Divider, Collapse, Typography } from 'antd';
import Logo from '../../../global/logo/';
import './buyer.css';

const { Content, Header } = Layout;
const { Panel } = Collapse;
const { Title, Text } = Typography;
const account = [
  {
    key: 'a1',
    q: 'How do I create an account?',
    a: 'You may register by clicking the user icon at the header (desktop) or by clicking the menu icon then the Join/Login link (mobile).',
  },
  {
    key: 'a2',
    q: 'Can I use my account for both buying and selling artworks?',
    a: 'Yes. If you wish to also sell artworks using the same account, you may do so by first activating your account as a seller in order to enable the seller dashboard.',
  },
  {
    key: 'a3',
    q: 'How do I activate my seller account?',
    a: 'Go to My Account and click the activate button at the bottom of the page.',
  },
  {
    key: 'a4',
    q: 'How can I update my account/profile?',
    a: 'Go to My Account then add or update your personal information.',
  },
  {
    key: 'a5',
    q: 'What should I do if I forgot my password',
    a: 'Go to /forgot-password and enter your email address. An email will be sent to you with instructions to reset your password.',
  },
  {
    key: 'a6',
    q: 'Can I change my email address?',
    a: 'Yes, you can change your email address at the account settings. You shall receive an email with the instructions to verify your account.',
  },
];

const shopping = [
  {
    key: 's0',
    q: 'What types of artwork are listed on this site?',
    a: 'Paintings, drawings, collages, sculptures, prints, photographs, and digital art are listed here on CHROMA.',
  },
  {
    key: 's1',
    q: 'How do I add an artwork to my wishlist',
    a: 'Hit the heart icon on the artwork you wish to put in your list.',
  },
  {
    key: 's2',
    q: 'How do I add an artwork to my shopping cart?',
    a: 'You can click the cart icon on the artwork or view the artwork and hit the add to cart button.',
  },
  {
    key: 's3',
    q: 'Why was the artwork removed from my wishlist?',
    a: 'The artwork was already sold out or unavailable.',
  },
  {
    key: 's4',
    q: 'Why was the artwork removed from my cart ?',
    a: 'The artwork was already sold out or unavailable.',
  },
  {
    key: 's5',
    q: 'What are the payment methods accepted here?',
    a: 'Unfortunately, we only allow bank deposit only for accepting payments. You may transfer your payment through online banking or over-the-counter. Payments are directly transferred to a bank account the seller informed the buyer about. ',
  },
  {
    key: 's8',
    q: 'How do I pay for an artwork?',
    a: 'Once your order has been placed, the seller will message you the bank account details to deposit the payment into. You may transfer the payment via online banking or over-the-counter. Once paid, update the transaction on your My Orders page and attach the proof of payment then kindly wait for the seller to ship your order. ',
  },
  {
    key: 's6',
    q: 'How can I contact an artist?',
    a: 'You can message the artist by clicking on the message icon on his/her profile.',
  },
  {
    key: 's7',
    q: 'How do I request for a return and refund?',
    a: 'Returns and refunds should be negotiated with the seller/artist. Message them through chat to address your concern.',
  },
];

const orders = [
  {
    key: 'o1',
    q: 'Where can I view my order status and history?',
    a: 'You can check your orders at the My Orders page. ',
  },
  {
    key: 'o2',
    q: 'Can I cancel an order? How?',
    a: 'You can cancel an order as long as you haven\'t paid for it yet. Simply click on the order you wish to cancel and click the Cancel Order button.',
  },
  {
    key: 'o3',
    q: 'Why was my order automatically canceled?',
    a: 'Your order was canceled because you weren\'t able to pay until the deadline for payment.',
  },
  {
    key: 'o4',
    q: 'What should I do after I paid for the artwork?',
    a: 'Go to My Orders and select the order you paid for. Upload the proof of payment and wait for the seller to ship your artworks.',
  },
  {
    key: 'o5',
    q: 'Do I need an account to purchase an artwork?',
    a: 'Yes. We require users to be registered in order to transact.',
  },
  {
    key: 'o6',
    q: 'How do I rate and review an artist?',
    a: 'On the My Orders page, select the specific order and submit your review and rating.',
  },
];
class BuyerFAQ extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <Layout>
        <Header className="faq-header">
          <Link to="/">
            <Logo />
          </Link>
        </Header>
        <Content className="faq-content">
          <div className="buyer-faq">
            <Title level={3} id="title"> Frequently Asked Questions for Art Buyers </Title>
            <Text type="secondary">If you have more questions, let us know at help@chroma.com</Text>
            <Divider />
            <div className="section">
              <Title level={4} id="title">My Account</Title>
              <Collapse bordered={false} expandIconPosition="right">
                {
                  account.map(a => <Panel header={a.q} key={a.key}>{a.a}</Panel>)
                }
              </Collapse>
            </div>
            <div className="section">
              <Title level={4} id="title">Shopping on CHROMA</Title>
              <Collapse bordered={false} expandIconPosition="right">
                {
                  shopping.map(a => <Panel header={a.q} key={a.key}>{a.a}</Panel>)
                }
              </Collapse>
            </div>
            <div className="section">
              <Title level={4} id="title">My Orders</Title>
              <Collapse bordered={false} expandIconPosition="right">
                {
                  orders.map(a => <Panel header={a.q} key={a.key}>{a.a}</Panel>)
                }
              </Collapse>
            </div>
            <div className="section">
              <Title level={4} id="title">Fraud and Abuse</Title>
              <Collapse bordered={false} expandIconPosition="right">
                <Panel header="How do i report fraud, scam, and other abusive behaviors on the site?" key="11">
                  Send us an email at report@chroma.com.
                </Panel>
              </Collapse>
            </div>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default BuyerFAQ;
