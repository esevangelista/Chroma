import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Row, Col, Layout, Alert } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginRequest } from '../duck';

const FormItem = Form.Item;

class LoginForm extends Component {
  render() {
    return (
       <Layout>
        <Form>
        <FormItem>
          <Input
            placeholder="Test"
            size="large"
          />
        </FormItem>
        </Form>
      </Layout>
    )
  }
}

export default LoginForm;
