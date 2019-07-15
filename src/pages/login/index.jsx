import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Alert, Modal } from 'antd';
import { loginRequest, alertClear, handleLoginModal } from '../../ducks/auth';
import RegForm from '../register/';
import './login.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerIsVisible: false,
      // showModal: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.showRegister = this.showRegister.bind(this);
    this.hideRegister = this.hideRegister.bind(this);
    this.clearAlert = this.clearAlert.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  clearAlert = () => {
    this.props.alertClear();
  }

  toggleModal = () => {
    // this.setState({ showModal: !this.state.showModal });
    this.props.handleLoginModal(!this.props.visible);
  }
  showRegister = () => {
    this.setState({ registerIsVisible: true });
    this.clearAlert();
  }

  hideRegister = () => {
    this.setState({ registerIsVisible: false });
  }

  handleLogin(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = { email: this.props.form.getFieldValue('login@@email').trim(), password: this.props.form.getFieldValue('login@@password').trim() };
        this.props.loginRequest(data);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isFetching, error, isMobile, visible, isCartIcon } = this.props;
    const { registerIsVisible } = this.state;
    return (
      <div>
        {
          isMobile ?
            <a onClick={this.toggleModal}> Join/Login </a>
          :
            <Button onClick={this.toggleModal} className="popover" id="btn-user"><Icon type={isCartIcon ? "shopping" : "user"} /></Button>
        }
        <Modal
          className="login-modal"
          centered
          visible={visible}
          footer={null}
          destroyOnClose
          afterClose={this.clearAlert}
          onCancel={this.toggleModal}
          maskClosable={!isFetching}
        >
          {
            registerIsVisible ?
              <div>
                <RegForm />
                Already have an account? <a onClick={this.hideRegister} className="btn-switch-form">Sign in</a>
              </div>
            :
              <Form onSubmit={this.handleLogin} className="login-form">
                <h3> Log in to your account </h3>
                { error ? (
                    <Alert type="error" message={"Incorrect email and/or password. "} closable />
                ) : (
                  ''
                )}
                <Form.Item>
                  {getFieldDecorator('login@@email', {
                    rules: [
                      { required: true, message: 'Email is missing.' },
                      { type: 'email', message: 'The input is not valid E-mail!' },
                    ],
                  })(
                    <Input
                      prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="Email Address"
                    />,
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('login@@password', {
                    rules: [{ required: true, message: 'Password is missing.' }],
                  })(
                    <Input.Password
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="Password"
                    />,
                  )}
                </Form.Item>
                <Form.Item>
                  <Button loading={isFetching} type="primary" htmlType="submit" className="login-form-button">
                    Log in
                  </Button>
                  <a className="login-form-forgot" onClick={this.showRegister}>
                    Forgot password?
                  </a>
                  <a onClick={this.showRegister} className="btn-switch-form">Create an account</a>
                </Form.Item>
              </Form>
          }
        </Modal>
      </div>
    );
  }
}

LoginForm.propTypes = {
  form: PropTypes.shape({
    validateFields: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
    resetFields: PropTypes.func.isRequired,
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  message: PropTypes.string,
  error: PropTypes.bool,
  loginRequest: PropTypes.func.isRequired,
  alertClear: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  handleLoginModal: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  error: false,
  message: '',
};

const mapStateToProps = (state) => {
  return { ...state.auth.login };
};

export default connect(
  mapStateToProps,
  { loginRequest, alertClear, handleLoginModal },
)(Form.create()(LoginForm));
