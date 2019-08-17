import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import zxcvbn from 'zxcvbn';
import { Form, Icon, Input, Button, Alert, Typography } from 'antd';
import Logo from '../../global/logo/';
import './reset.css';

const minScore = 3;
const { Text } = Typography;

class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      score: -1,
      isPasswordValid: false,
      pwStrenghFeedback: '',
      message: null,
      error: null,
    };
    this.showHidePassword = this.showHidePassword.bind(this);
    this.passwordStrength = this.passwordStrength.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validatePasswordStrength = this.validatePasswordStrength.bind(this);
  }

  showHidePassword(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === 'input' ? 'password' : 'input',
    });
  }

  passwordStrength(e) {
    if (e.target.value === '') {
      this.setState({
        score: -1,
        pwStrenghFeedback: '',
      });
    } else {
      const pw = zxcvbn(e.target.value);
      this.setState({
        score: pw.score,
        pwStrenghFeedback: pw.feedback.warning,
      });
    }
  }

  validatePasswordStrength(rule, value, callback) {
    this.setState({ isPasswordValid: false });
    const password = value.length > 0 ? value : '';

    const pw = zxcvbn(password);
    if (pw.score >= minScore) {
      this.setState({ isPasswordValid: true });
      callback();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    // TODO not submitting validateFields is undefined
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { token } = this.props.match.params;
        const { password } = values;
        const data = { password: password.trim() };
        this.setState({ loading: true });
        axios({
          method: 'post',
          url: `/api/password-reset/${token}`,
          data,
        })
          .then((response) => {
            this.props.form.resetFields();
            let error = false;
            if (!response.data.success) error = true;
            this.setState({
              loading: false,
              message: response.data.message,
              error,
              score: -1,
              isPasswordValid: false,
              pwStrenghFeedback: '',
            });
          })
          .catch((error) => {
            this.setState({ loading: false });
            let message = 'Something went wrong.';
            if (error.response && error.response.data) {
              ({ message } = error.response.data);
            }
            this.setState({ message, error: true });
          });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { message, error } = this.state;
    return (
      <div className="forgot-main">
        <div className="forgot-body">
          <div className="forgot-container">
            <Link to="/">
              <Logo />
            </Link>
            <br />
            <Text id="title">Password Reset</Text>
            {
              message ?
                <Alert className="forgot-alert" message={message} type={error === true ? 'error' : 'success'} closable />
              : ''
            }
            <Form className="form" onSubmit={e => this.handleSubmit(e)}>
              <Form.Item
                className="password-field"
                extra={
                  <div>
                    <span className="meter" data-score={this.state.score} />
                    <div className="strength-feedback">{this.state.pwStrenghFeedback}</div>
                  </div>}
              >
                {getFieldDecorator('password', {
                  rules: [
                    { required: true, message: 'Please enter your new password.' },
                    { validator: this.validatePasswordStrength },
                  ],
                })(<Input.Password
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                  placeholder="New Password"
                  size="large"
                  onChange={this.passwordStrength}
                />)}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  size="large"
                  loading={this.state.loading}
                  disabled={!this.state.isPasswordValid}
                  htmlType="submit"
                  className="login-button"
                >
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

PasswordReset.propTypes = {
  form: PropTypes.shape({
    resetFields: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Form.create()(PasswordReset);
