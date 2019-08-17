import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Typography, Divider, Row, Col } from 'antd';
import './getStarted.css';

const { Text, Title, Paragraph } = Typography;

class GettingStarted extends Component {
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
            <Link to="/FAQs/artists/getting-started">Getting Started</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Title level={3} id="title"> Getting Started </Title>
        <Text id="what">Welcome to CHROMA! Below is a simple guide to walk you through on managing your account and selling artworks.</Text>
        <Divider />
        <div className="section">
          <Title level={4} id="title"> Creating An Account </Title>
          <Paragraph>
            To get started, create your CHROMA account by providing the necessary details.
            A verification mail shall be sent to your email address. Once your email has been confirmed,
            you will be redirected to the homepage.
          </Paragraph>
          <Row type="flex" justify="space-around" align="middle">
            <Col xs={20} lg={11}>
              <img src="/faqs/seller/register-s1.png" alt="" />
            </Col>
            <Col xs={20} lg={11}>
              <img src="/faqs/seller/register-s2.png" alt="" />
            </Col>
          </Row>
        </div>
        <Divider />
        <div className="section">
          <Title level={4} id="title">Activating Seller Account</Title>
          <Paragraph>
            Once you have registered and verified your account, you may start using your account 
            for buying and/or selling artworks. To be able to sell artworks, CHROMA requires a user to activate his/her seller account.
            Keep in mind that you can buy artworks as well regardless if you have activated or deactivated your seller account. 
          </Paragraph>
          <Paragraph>
            To activate seller account, head to the your account settings (My Account).
            Under the account settings tab, scroll to Manage Account Type and hit the button.
            Once activated, you'll have your own dashboard for managing your products and artworks located under the Store tab at the header.
          </Paragraph>
          <Row type="flex" justify="space-around" align="middle">
            <Col xs={20} lg={11}>
              <img src="/faqs/seller/profile-s0.png" alt="" />
            </Col>
            <Col xs={20} lg={11}>
              <img src="/faqs/seller/profile-s3.png" alt="" />
            </Col>
          </Row>
        </div>
        <Divider />
        <div className="section">
          <Title level={4} id="title"> Updating Profile Information </Title>
          <Paragraph>
            Populating your profile information is an important step on getting started as a seller.
            You may update your account information and profile information on your account settings.
            Profile information such as your avatar, social media links, biography, name, and location will be publicly.
            Note that we only display your city and province or region but not your complete address.
            Providing the important details will help you gain trust from your customers.
          </Paragraph>
          <Row type="flex" justify="space-around" align="middle">
            <Col xs={20} lg={11}>
              <img src="/faqs/seller/profile-s1.png" alt="" />
            </Col>
            <Col xs={20} lg={11}>
              <img src="/faqs/seller/profile-s5.png" alt="" />
            </Col>
            <Col xs={20} lg={11}>
              <img src="/faqs/seller/profile-s6.png" alt="" />
            </Col>
            <Col xs={20} lg={11}>
              <img src="/faqs/seller/profile-s7.png" alt="" />
            </Col>
          </Row>
        </div>
        <Divider />
        <div className="section">
          <Title level={4} id="title"> Uploading Your Artworks</Title>
          <Paragraph>
            Before you list your artwork, please keep in mind that
            <ul>
              <li>
                CHROMA allows its users to sell paintings, drawings, collages, sculptures, prints, photographs, and digital artworks only.
              </li>
              <li>
                CHROMA uses inches(in) as its unit of measurement. Make sure you know the correct dimensions of your artworks.
              </li>
              <li>
                Artworks must be priced in Philippine Peso (PHP).
              </li>
              <li>
                Only JPEG, JPG, and PNG image files will be accepted and uploaded.
              </li>
            </ul>
          </Paragraph>
          <Paragraph>
            Below is a list of the required information in order to successfully add an artwork to your store.
            <ul>
              <li>
                <Text strong>Artwork Title</Text>
              </li>
              <li>
                <Text strong>Artwork Description.</Text><br /> 
                This is your chance to describe and promote your artwork.
                What inspired you to create this artwork? Why did you use that specific art style? What medium/s and techniques did you use?
                Is it ready to hang? Will it be sold framed or unframed? Provide information relevant to the artwork you chose.
              </li>
              <li>
                <Text strong>Art Form.</Text><br />
                This refers to the category your artwork belongs to. Categories include paintings, drawings, collages, sculptures, prints, photographs, and digital artworks.
              </li>
              <li>
                <Text strong>Medium.</Text><br />
                List down the materials you used to create this artwork.
              </li>
              <li>
                <Text strong>Style.</Text><br />
                Select the art style for this artwork. Is it Baroque, Fine Art, Folk, or others?
              </li>
              <li>
                <Text strong>Subject.</Text><br />
                You may choose from the list we provided or input a subject you chose for this work.
              </li>
              <li>
                <Text strong>Dimensions.</Text><br />
                This includes the height, width, and depth (for sculptures) measured in inches.
              </li>
              <li>
                <Text strong>Quantity.</Text>
              </li>
              <li>
                <Text strong>Price(PHP).</Text>
              </li>
              <li>
                <Text strong>Images.</Text><br />
                Attach at most 7 images of your artwork. You can read some of our tips on what type of images you should upload <Link to="/FAQs/artists/listing-an-artwork" style={{ color: '#CA0000'}}>here</Link>.
              </li>
            </ul>
          </Paragraph>
          <Row type="flex" justify="space-around" align="middle">
            <Col xs={20} lg={11}>
              <img src="/faqs/seller/list0.png" alt="" />
            </Col>
            <Col xs={20} lg={11}>
              <img src="/faqs/seller/list1.png" alt="" />
            </Col>
            <Col xs={20} lg={11}>
              <img src="/faqs/seller/list2.png" alt="" />
            </Col>
            <Col xs={20} lg={11}>
              <img src="/faqs/seller/list3.png" alt="" />
            </Col>
          </Row>
        </div>
        <Divider />
        <Text id="related">Related Articles </Text><br />
        <ul>
          <li><Text id="more-on"><Link to="/FAQs/artists/artworks">Managing Your Artwork Listings</Link></Text></li>
          <li><Text id="more-on"><Link to="/FAQs/artists/listing-an-artwork">Listing An Artwork</Link></Text></li>
          <li><Text id="more-on"><Link to="/FAQs/artists/deactivate">Deactivate Seller Account</Link></Text></li>
        </ul>
      </div>
    );
  }
}

export default GettingStarted;
