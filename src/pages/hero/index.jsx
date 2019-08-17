import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import './hero.css';


class Hero extends Component {
  render() {
    return (
      <div className="hero-mask">
        <div className="hero-container">
          <h1> Explore the Artworld </h1>
          <p> Discover. Collect. Promote.</p>
          <Link to="/artworks">
            <Button
              className="btn-hero"
              size="large"
              type="primary"
            >
              Shop now
            </Button>
          </Link>
          <p className="link-to-list"> Interested in listing your artworks? <Link to="/FAQs/artists/why-sell">Click here</Link></p>
        </div>
      </div>
    );
  }
}

export default Hero;
