import React, { Component } from 'react';
// import { Route, Switch } from 'react-router-dom';
import { Button } from 'antd';
import './hero.css';


class Hero extends Component {
  render() {
    return (
      <div className="hero-mask">
        <div className="hero-container">
          <h1> Explore the Artworld </h1>
          <p> Discover. Collect. Commission.</p>
          <Button
            className="btn-hero"
            size="large"
            type="primary"
          >
            Shop now
          </Button>
          <p className="link-to-list"> Interested in listing your artworks? Click here</p>
        </div>
      </div>
    );
  }
}

export default Hero;
