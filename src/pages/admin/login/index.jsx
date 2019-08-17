import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Input, Icon, Form, Button } from 'antd';
import { adminLoginRequest } from '../../../ducks/admin';
import Logo from '../../../global/logo';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { username, password } = values;
        this.props.adminLoginRequest({ username, password });
      }
    });
  }
  render() {
    const { isGettingSession, error, message, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className="admin-login-container">
        <Link to="/">
          <Logo />
        </Link>
        { error ?
          <Alert
            message="Error"
            description={message}
            type="error"
            closable
          /> : ''
        }
        <Form onSubmit={this.handleLogin} className="form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Username required.' }],
            })(<Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              allowClear
            />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Password required.' }],
            })(<Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              allowClear
            />)}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-button"
              disabled={isGettingSession}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

Login.propTypes = {
  adminLoginRequest: PropTypes.func.isRequired,
  isGettingSession: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  message: PropTypes.string,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => state.admin.auth;
const mapDispatchToProps = { adminLoginRequest };

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login));
