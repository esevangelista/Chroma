import React, { Component } from 'react';
import PropTypes from 'prop-types';
import zxcvbn from 'zxcvbn';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox, Alert } from 'antd';
import { registerRequest, alertClear } from '../../ducks/auth';
import './register.css';
import { getRequestService } from '../../api/apiRequest';

class RegForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validateUname: '',
      pwStrenghFeedback: '',
      isPasswordValid: false,
      score: -1,
    };
    this.clearAlert = this.clearAlert.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.validatePasswordStrength = this.validatePasswordStrength.bind(this);
    this.passwordStrength = this.passwordStrength.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  clearAlert = () => {
    this.props.alertClear();
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('reg@@password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };
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
    if (!value) return callback('Password is required.');
    const pw = zxcvbn(value);
    if (pw.score > 1) {
      this.setState({ isPasswordValid: true });
      callback();
    }
    return callback();
  }
  handleUsernameChange = async (rule, value, callback) => {
    if (!value) {
      this.setState({ validateUname: 'error' });
      return callback('Username is required.');
    }
    if (value.trim().length === 0 || value.length === 1) {
      this.setState({ validateUname: 'error' });
      return callback('Username must have at least two characters');
    }
    const isMatch = new RegExp('^[a-zA-Z0-9][a-zA-Z0-9_]+$').test(value);
    if (!isMatch) {
      this.setState({ validateUname: 'error' });
      return callback('Username must only contain alphanumeric characters and underscores.');
    }
    const uname = value.trim();
    const res = await getRequestService(`/users?username=${uname}&exact=true`);
    if (res.data.total > 0) {
      this.setState({ validateUname: 'error' });
      return callback('Username is already taken.');
    }
    this.setState({ validateUname: 'success' });
    return callback();
  }
  handleRegister(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { getFieldValue } = this.props.form;
        if (this.state.isPasswordValid) {
          const data = {
            email: getFieldValue('reg@@email'),
            firstName: getFieldValue('reg@@firstname'),
            lastName: getFieldValue('reg@@lastname'),
            username: getFieldValue('reg@@username'),
            password: getFieldValue('reg@@password'),
          };
          this.props.registerRequest(data);
          this.props.form.resetFields();
          this.setState({
            validateUname: '',
            pwStrenghFeedback: '',
            isPasswordValid: false,
            score: -1,
          });
        }
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isFetching, error, message } = this.props;
    return (
      <div>
        <Form onSubmit={this.handleRegister} className="reg-form">
          <h3> Join CHROMA Now! </h3>
          {
            message && message.length > 0 ?
              <Alert className="alert-reg" banner closable message={error ? message : 'Please check your email and verify your account.'} type={error ? 'error' : 'success'} />
            :
              ''
          }
          <Form.Item>
            {getFieldDecorator('reg@@firstname', {
              validateFirst: true,
              rules: [
                {
                  required: true,
                  message: 'Please input your first name',
                },
                { min: 2, message: 'First name must be at least 2 characters.' },
                { whitespace: true, message: 'First name must not be empty' },
              ],
            })(<Input placeholder="First Name" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('reg@@lastname', {
              validateFirst: true,
              rules: [
                {
                  required: true,
                  message: 'Please input your last name',
                },
                { min: 2, message: 'Last name must be at least 2 characters.' },
                { whitespace: true, message: 'Last name must not be empty' },
              ],
            })(<Input placeholder="Last Name" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('reg@@email', {
              validateFirst: true,
              rules: [
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Input is not valid E-mail!' },
              ],
            })(<Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email Address" />)}
          </Form.Item>
          <Form.Item hasFeedback required validateStatus={this.state.validateUname}>
            {getFieldDecorator('reg@@username', {
              rules: [
                { validator: this.handleUsernameChange },
              ],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item
            className="password-field in-register"
            hasFeedback
            required
            extra={
              <div>
                <span className="meter" data-score={this.state.score} />
                <div className="strength-feedback">{this.state.pwStrenghFeedback}</div>
              </div>
            }
          >
            {getFieldDecorator('reg@@password', {
              validateFirst: true,
              rules: [
                { validator: this.validatePasswordStrength },
                { whitespace: true, message: 'Spaces are not allowed.' },
              ],
            })(
              <Input.Password
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Password"
                onChange={this.passwordStrength}
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button loading={isFetching} type="primary" htmlType="submit" className="reg-form-button">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

RegForm.propTypes = {
  form: PropTypes.shape({
    validateFields: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
    getFieldValue: PropTypes.func.isRequired,
    resetFields: PropTypes.func.isRequired,
  }).isRequired,
  registerRequest: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  message: PropTypes.string,
  alertClear: PropTypes.func.isRequired,
};

RegForm.defaultProps = {
  error: false,
  message: '',
};

const mapStateToProps = (state) => {
  const { error, isFetching, message } = state.auth.register;
  return { error, isFetching, message };
};

export default connect(
  mapStateToProps,
  { registerRequest, alertClear },
)(Form.create()(RegForm));
