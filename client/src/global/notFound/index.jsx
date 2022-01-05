import React from 'react';
import { Layout, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import './notFound.css';

const { Content } = Layout;

const NotFound = () => (
  <Content className="not-found">
    <Row type="flex" align="center" justify="center">
      <Col>
        <h1 className="page-title">404</h1>
        <p className="sub-title">
          Sorry, the page you were looking for doesn’t exist.
        </p>
        <Link
          to="/"
          className="ant-btn go-back-btn ant-btn-primary"
        >
          Home
        </Link>
      </Col>
    </Row>
  </Content>
);

export default NotFound;

