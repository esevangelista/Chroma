import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Typography, Divider, Row, Col } from 'antd';

const { Text, Title, Paragraph } = Typography;

class Delivery extends Component {
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
            <Link to="/FAQs/artists/delivery">Delivery</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Title level={3} id="title">Tips on Packaging and Shipping</Title>
        <Text id="what">
          As the artist, you are responsible for properly
          packaging and shipping the artwork to your buyer. We highly advise
          including a Certificate of Authenticity(CoA).
        </Text>
        <Divider />
        <div className="section">
          <Title level={4} id="title">Prints</Title>
          <Text type="what">Lower value prints can be shipped rolled in a tube:</Text>
          <Paragraph>
            <ul>
              <li>
                Use a sturdy mailing tube over 2mm thick and a few inches longer than the width of your poster to avoid denting or damage in transit. 
                Your mailing tube should not be so narrow that it requires rolling the print very tightly as this is likely to cause damage
              </li>
              <li>
                Place your print in the centre of a soft piece of paper around 
                30cm longer than the print lengthwise and equal to the inner length 
                f your mailing tube widthwise, then place tissue paper just larger 
                than the print on all sides on top of the print.
              </li>
              <li>
                Fold the excess paper beneath the bottom of the print upward 
                and press down so the bottom edge of the print is resting in the 
                fold.
              </li>
              <li>
                Gently roll the piece upwards to a diameter just smaller than that 
                of your mailing tube.
              </li>
              <li>
                Carefully insert the rolled print into the tube- 
                the paper you have rolled the print in should fit snugly with the 
                length of the tube to ensure a buffer preventing movement during 
                shipping.
              </li>
              <li>
                Top the tube with its end cap, and be sure to secure 
                the caps on both ends with sturdy tape to ensure they do not come 
                off during shipment.
              </li>
            </ul>
          </Paragraph>
        </div>
        <Divider />
        <div className="section">
          <Title level={4} id="title">Works on Paper</Title>
          <Text type="what">We recommend sending higher-value prints and works on paper flat-packed:</Text>
          <Paragraph>
            <ul>
              <li>
               Wrap the work in acid free tissue paper.
                Plastic covering can be used for further protection against moisture.
              </li>
              <li>
                Create corner protectors for each of the corners of your work: 
                get a square piece of paper/acid free tissue paper, 
                adjust the scale according to the size of your work and 
                fold it in half to create a triangle, then in half again.
              </li>
              <li>
                Place these on each of the corners of your work, 
                then tape the protectors to a sturdy piece of cardboard or 
                foam core.
              </li>
              <li>
                Place two or more pieces of firm cardboard on either side 
                of the work and tape both sides together.
              </li>
              <li>
                Fully wrap the piece in a thick layer of bubble wrap.
              </li>
              <li>
                Surround the bubble wrap parcel with two pieces of corrugated cardboard to create an outer cover. 
                Ensure that edges of both pieces are securely taped together with no gaps.
              </li>
            </ul>
          </Paragraph>
        </div>
        <Divider />
        <div className="section">
          <Title level={4} id="title">Canvas, framed works, others</Title>
          <Paragraph>
            <ul>
              <li>
                Find a box or build a crate with sufficient room to fit the work with 1-2 inches of space on each side.
              </li>
              <li>
                Wrap the work in acid free tissue paper. Plastic covering can be used for further protection against moisture.
              </li>
              <li>
                Wrap the piece in at least two layers of bubble wrap and secure with tape. Ensure that the corners of the piece are sufficiently padded to withstand damage on impact.
              </li>
              <li>
                Place foam layers surrounding the piece and include additional packaging material to ensure a snug fit within the box, with no movement possible
              </li>
              <li>
                We recommend that any particularly valuable, large or fragile pieces are shipped in a custom-made crate.
              </li>
            </ul>
          </Paragraph>
        </div>
        <Divider />
        <div className="section">
          <Title level={4} id="title">Delivery</Title>
          <Paragraph>
            <ul>
              <li>
                All artworks should be sent via a fully traceable and insured method of shipment
              </li>
              <li>
                All information declared in any accompanying paperwork should be complete and truthful, including the value and purpose of the shipment
              </li>
            </ul>
          </Paragraph>
        </div>
        <Text>What are the packaging and delivery guidelines?.(2016, September 6).Retrieved from What are the packaging and delivery guidelines? https://sellers.artfinder.com/article/533-what-are-the-packaging-and-delivery-guidelines</Text>
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

export default Delivery;
