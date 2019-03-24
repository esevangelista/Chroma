import React, { Component } from 'react';
// import { Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Carousel, Layout, Button } from 'antd';
import './landing.css';


const { Content } = Layout;
const data = [
  {
    title: 'Print',
    attachment: '/landing/printocean.jpg',
  },
  {
    title: 'Painting',
    attachment: '/landing/colors.jpg',
  },
  {
    title: 'Drawing',
    attachment: '/landing/draw.jpg',
  },
  {
    title: 'Sculpture',
    attachment: '/landing/juliet.jpg',
  },
  {
    title: 'Photography',
    attachment: '/landing/natgeo.jpg',
  },
  {
    title: 'Digital Art',
    attachment: '/landing/retro.jpg',
  },
];


class Landing extends Component {
  render() {
    return (
      <Content>
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
              Commission
            </h3>
            <p>
              Hit two birds with one stone by transforming your idea into art and supporting independent artists within the Philippines.
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
              Commission
            </h3>
            <p>
              Hit two birds with one stone by transforming your idea into art and supporting independent artists within the Philippines.
            </p>
          </div>
        </Carousel>
        <Content className="site-content">
          <Row>
            <Col sm={24} md={12} lg={12} > <h2 className="category-label"> Shop art by form </h2> </Col>
            <Col span={12}> <a href="/"  className="more"> More Options </a></Col>
          </Row>
          <Row type="flex" justify="space-between"  className="categories">
            {
              data.map(item => (
                    <Col key="item.title" xs={24} sm={12} md={8} lg={8} xl={4} >
                      <Link to="/">
                        <div className="container">
                          <img alt={item.title} src={item.attachment}/>
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
              data.map(item => (
                    <Col xs={24} sm={12} md={8} lg={8} xl={4} >
                      <Link to="/">
                        <div className="container">
                          <img alt={item.title} src={item.attachment}/>
                          <p> {item.title} </p>
                        </div>
                      </Link>
                    </Col>
                ),
              )
            }
          </Carousel>
          <a href="/"  className="active-on-mobile more-mobile"> More Options </a>
        </Content>
        <section className="banner">
          <h3> Interested in selling your artworks? </h3>
          <Button className="btn-mor"> More info </Button>
        </section>
      </Content>
    );
  }
}

export default Landing;
