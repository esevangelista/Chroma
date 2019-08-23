import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Carousel, Layout, Button } from 'antd';
import { handleQueryType } from '../../ducks/artworks';
import './landing.css';


const { Content } = Layout;
// const data = [
//   {
//     title: 'Print',
//     attachment: '/landing/printocean.jpg',
//   },
//   {
//     title: 'Painting',
//     attachment: '/landing/colors.jpg',
//   },
//   {
//     title: 'Drawing',
//     attachment: '/landing/draw.jpg',
//   },
//   {
//     title: 'Sculpture',
//     attachment: '/landing/juliet.jpg',
//   },
//   {
//     title: 'Photography',
//     attachment: '/landing/natgeo.jpg',
//   },
//   {
//     title: 'Digital Art',
//     attachment: '/landing/retro.jpg',
//   },
// ];

const dataMobile = [
  {
    title: 'Print',
    attachment: '/landing/printocean-mobile.jp2',
  },
  {
    title: 'Painting',
    attachment: '/landing/colors-mobile.jp2',
  },
  {
    title: 'Drawing',
    attachment: '/landing/draw-mobile.jp2',
  },
  {
    title: 'Sculpture',
    attachment: '/landing/juliet-mobile.jp2',
  },
  {
    title: 'Photography',
    attachment: '/landing/natgeo-mobile.jp2',
  },
  {
    title: 'Digital Art',
    attachment: '/landing/retro-mobile.jp2',
  },
];
class Landing extends Component {
  render() {
    return (
      <Content className="landing-content">
        <Row gutter={{ md: 16, lg: 8 }} className="hero-extension">
          <Col span={8}>
            <img src="/icons/exploration.svg" alt="explore" />
            <h3>
              Discover
            </h3>
            <p>
             Browse art of different forms, styles, and subjects from online galleries managed by the artists.
            </p>
          </Col>
          <Col span={8}>
            <img src="/icons/pop-art.svg" alt="art" />
            <h3>
              Collect
            </h3>
            <p>
              Shop affordable and unique artworks directly from  thousands of artists around the Philippines
            </p>
          </Col>
          <Col span={8} >
            <img src="/icons/support.svg" alt="commission" />
            <h3>
              Promote
            </h3>
            <p>
              Support and help independent Filipino artists promote their works.
            </p>
          </Col>
        </Row>
        <Carousel dots className="active-on-mobile">
          <div>
            <img src="/icons/exploration.svg" alt="explore" />
            <h3>
              Discover
            </h3>
            <p>
             Browse art of different forms, styles, and subjects from online galleries managed by the artists.
            </p>
          </div>
          <div>
            <img src="/icons/pop-art.svg" alt="art" />
            <h3>
              Collect
            </h3>
            <p>
              Shop affordable and unique artworks directly from  thousands of artists around the Philippines
            </p>
          </div>
          <div>
            <img src="/icons/support.svg" alt="commission" />
            <h3>
              Promote
            </h3>
            <p>
              Support and help independent Filipino artists promote their works.
            </p>
          </div>
        </Carousel>
        <div className="landingg">
          <Row>
            <Col sm={24} md={12} lg={12} > <h2 className="category-label"> Shop art by form </h2> </Col>
            <Col span={12}> <a href="/artworks" className="more"> More Options </a></Col>
          </Row>
          <Row type="flex" justify="space-between" className="categories">
            {
              dataMobile.map(item => (
                <Col key={item.title} xs={24} sm={12} md={8} lg={8} xl={4} onClick={() => this.props.handleQueryType(item.title.toUpperCase())}>
                  <Link to="/artworks">
                    <div className="container">
                      <img alt={item.title} src={item.attachment} />
                      <p> {item.title} </p>
                    </div>
                  </Link>
                </Col>
                ),
              )
            }
          </Row>
          <Carousel className="active-on-mobile cat-slider" autoplay>
            {
              dataMobile.map(item => (
                    <Col key={item.title} xs={24} sm={12} md={8} lg={8} xl={4} onClick={() => this.props.handleQueryType(item.title.toUpperCase())}>
                      <Link to="/artworks">
                        <div key={item.title} className="container">
                          <img alt={item.title} src={item.attachment} />
                          <p> {item.title} </p>
                        </div>
                      </Link>
                    </Col>
                )
              )
            }
          </Carousel>
          <a href="/artworks" className="active-on-mobile more-mobile"> More Options </a>
        </div>
        <section className="banner">
          <h3> Interested in selling your artworks? </h3>
          <Link to="/FAQs/artists/getting-started"><Button className="btn-mor"> More info </Button></Link>
        </section>
      </Content>
    );
  }
}
Landing.propTypes = {
  handleQueryType: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.artworks;
const mapDispatchToProps = { handleQueryType };
export default connect(mapStateToProps, mapDispatchToProps)(Landing);
