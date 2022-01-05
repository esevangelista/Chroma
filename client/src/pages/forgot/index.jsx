import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Spin, Icon, Typography, Form, Button, Input, Alert } from 'antd';
import axios from 'axios';
import Logo from '../../global/logo/';
import { checkUserSession } from '../../ducks/users';
import './forgot.css';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const { Text } = Typography;

class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      message: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.checkUserSession();
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { email } = values;
        const data = { email: email.trim() };
        this.setState({ loading: true });
        axios({
          method: 'post',
          url: '/api/password-reset',
          data,
        })
          .then((response) => {
            let error = false;
            if (!response.data.success) error = true;
            this.setState({ loading: false, error, message: response.data.message });
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
    this.props.form.resetFields();
  }
  render() {
    const { isGettingSession, profile, form } = this.props;
    const { getFieldDecorator } = form;
    const { error, loading, message } = this.state;
    return (
      <div className="forgot-main">
        {
          isGettingSession ?
            <Spin indicator={antIcon} style={{ position: 'absolute', top: '50%' }} />
          : profile && profile._id ?
            <Redirect to="/" />
          :
            <div className="forgot-body">
              <div className="forgot-container">
                <Link to="/">
                  <Logo />
                </Link>
                <br />
                <Text id="title">Forgot Password</Text>
                {
                  message ?
                    <Alert className="forgot-alert" message={message} type={error ? 'error' : 'success'} closable />
                  : ''
                }
                <Form className="form">
                  <Form.Item>
                    {getFieldDecorator('email', {
                      rules: [
                        {
                          required: true,
                          message: 'Please type in your email!',
                        },
                        { type: 'email', message: 'Input is not valid E-mail!' },
                      ],
                    })(<Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                        }
                      placeholder="Enter email address"
                      size="large"
                    />)}
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      size="large"
                      htmlType="submit"
                      className="login-button"
                      loading={loading}
                      onClick={this.handleSubmit}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
        }
      </div>
    );
  }
}

Forgot.propTypes = {
  checkUserSession: PropTypes.func.isRequired,
  isGettingSession: PropTypes.bool.isRequired,
  profile: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
  form: PropTypes.shape({
    resetFields: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => state.user;
const mapDispatchToProps = { checkUserSession };

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Forgot));
