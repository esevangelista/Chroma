import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Typography, Divider, Row, Col } from 'antd';
import './list.css';

const { Text, Title, Paragraph } = Typography;

class ListArtwork extends Component {
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
            <Link to="/FAQs/artists/listing-an-artwork">Listing an Artwork</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Title level={3} id="title">Listing an Artwork </Title>
        <Divider />
        <div className="section">
          <Title level={4} id="title">What types of images should you upload?</Title>
          <Paragraph>
            We allow artists to upload up to 7 images of their artworks. The images you upload are essential on marketing your artworks.
            Having a good set of photos will encourage potential customers to purchase your artworks. Here are some tips for choosing the right
            images for your artwork.
            <ul>
              <li>
                <Text strong>Lighting</Text><br />
                Make sure to take a photo of your artwork with a lighting that will capture the most accurate representation of your artwork.
              </li>
              <li>
                <Text strong>Post-processing</Text><br />
                Avoid heavily post processed images as it may confuse art buyers on the quality of your artwork.
              </li>
              <li>
                <Text strong>Image quality</Text><br />
                Make sure your image is not blurred or out of focus. Also keep in mind to avoid too much noise on your images. 
              </li>
            </ul>
          </Paragraph>
          <Paragraph>
            Here are some ideas on what type of images you should upload:
            <ul>
              <li>
                <Text strong>Full-frontal</Text><br />
                This is the actual picture of your artwork cropped to its full size without any external surface or objects around it.
                If you are selling an artwork framed, also include a photo with the frame you will provide.
              </li>
              <li>
                <Text strong>In a room</Text><br />
                A photo of your artwork placed in a wall, table, or cabinet. This will help users visualize how well will the artwork fit their desired environment. 
              </li>
              <li>
                <Text strong>Close-up</Text><br />
                A close-up photo that contains a detailed view of your artwork. This will be helpful in capturing the texture of your artwork.
              </li>
              <li>
                <Text strong>Packaged and Certificate of Authenticity</Text><br />
                A photo of your artwork when packaged will ensure the quality of packaging their artworks will arrive once delivered.
                A photo of your Certificate of Authenticity (COA) will also be helpful.
              </li>
            </ul>
          </Paragraph>
        </div>
        <Divider />
        <div className="section">
          <Title level={4} id="title"> Uploading Your Artworks</Title>
          <Paragraph>
            Before you list your artwork, please keep in mind that
            <ul>
              <li>
                CHROMA allows its users to sell paintings, drawings, sculptures, prints, photographs, and digital artworks only.
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
                This refers to the category your artwork belongs to. Categories include paintings, drawings, sculptures, prints, photographs, and digital artworks.
              </li>
              <li>
                <Text strong>Medium.</Text><br />
                List down the materials you used to create this artwork.
              </li>
              <li>
                <Text strong>Style.</Text><br />
                Select the art style for this artwork. Is it Baroque, Fine Art, Folk, or other?
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
          <li><Text id="more-on"><Link to="/FAQs/artists/store/artworks">Managing Your Artwork Listings</Link></Text></li>
          <li><Text id="more-on"><Link to="/FAQs/artists/delivery">How to package and ship an artwork?</Link></Text></li>
        </ul>
      </div>
    );
  }
}

export default ListArtwork;
