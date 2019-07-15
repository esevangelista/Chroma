import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Form, Input, Button, Alert, Modal } from 'antd';
import { connect } from 'react-redux';
import zxcvbn from 'zxcvbn';
import { updateAccountRequest, changeAccountTypeRequest } from '../../../../ducks/users';
import { getRequestService } from '../../../../api/apiRequest';
import { logoutRequest } from '../../../../ducks/auth';
import EmailForm from './EmailForm/';
import SwitchAccount from './SwitchAccount/';
import './account.css';

// const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validateUname: '',
      score: -1,
      pwStrenghFeedback: '',
      isPWValid: false,
      pwStatus: '',
      showEmailModal: false,
      showTypeModal: false,
    };
    this.handleAccSubmit = this.handleAccSubmit.bind(this);
    this.handleUnameChange = this.handleUnameChange.bind(this);
    this.validatePWStrength = this.validatePWStrength.bind(this);
    this.passwordStrength = this.passwordStrength.bind(this);
    this.toggleEmailModal = this.toggleEmailModal.bind(this);
    this.showConfirm = this.showConfirm.bind(this);
  }
  componentWillMount() {
    if (this.props.message === 'Please check your email for instructions.') {
      this.setState({ showEmailModal: true });
    }
  }
  showConfirm = () => this.setState({ showTypeModal: !this.state.showTypeModal });
  toggleEmailModal = () => this.setState({ showEmailModal: !this.state.showEmailModal });
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
  validatePWStrength(rule, value, callback) {
    if (!value) {
      this.setState({ isPWValid: null, pwStatus: '' });
      this.props.form.setFieldsValue({ oldPW: undefined });
      return callback();
    }
    this.setState({ isPWValid: false, pwStatus: 'warning' });
    const pw = zxcvbn(value);
    if (pw.score > 1) {
      this.setState({ isPWValid: true, pwStatus: 'success' });
      callback();
    }
    return callback();
  }
  handleAccSubmit(e) {
    e.preventDefault();
    const { isPWValid } = this.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          firstName: values.fname,
          lastName: values.lname,
          email: values.email,
          username: values.username,
        };
        if (isPWValid && values.oldPW && values.newPW) {
          data.currentPassword = values.oldPW;
          data.newPassword = values.newPW;
        }
        this.props.updateAccountRequest(data);
      }
    });
  }

  handleUnameChange = async (rule, value, callback) => {
    if (value === this.props.profile.username) return callback();
    this.setState({ validateUname: 'validating' });
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
  render() {
    const {
      form,
      profile,
      isGettingSession,
      error,
      message,
    } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    const { showEmailModal } = this.state;
    const initialValue = profile;
    return (
      <div className="acc-form-container">
        {
          message && message !== 'Please check your email for instructions.' ?
            <Alert className="alert-reg" banner closable message={message} type={error === true ? 'error' : 'success'} />
          : ''
        }
        <Form onSubmit={this.handleAccSubmit} layout="horizontal" colon={false} className="acc-form">
          <Form.Item label="First Name">
            {getFieldDecorator('fname', {
              initialValue: initialValue.firstName,
              validateFirst: true,
              rules: [
                { required: true, message: 'Please provide your first name' },
                { min: 2, message: 'First name must be at least 2 characters long.' },
                { whitespace: true, message: 'Name must not be empty.' },
              ],
            })(<Input placeholder="ex. Juan " />)}
          </Form.Item>
          <Form.Item label="Last Name">
            {getFieldDecorator('lname', {
              initialValue: initialValue.lastName,
              validateFirst: true,
              rules: [
                { required: true, message: 'Please provide your last name' },
                { min: 2, message: 'Last name must be at least 2 characters long.' },
                { whitespace: true, message: 'Name must not be empty.' },
              ],
            })(<Input placeholder="ex. Juan " />)}
          </Form.Item>
          <Form.Item label="Username" hasFeedback required validateStatus={this.state.validateUname}>
            {getFieldDecorator('username', { initialValue: initialValue.username, rules: [ {validator: this.handleUnameChange} ], })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)}
          </Form.Item>
          <Form.Item className="email-area" label="Email Address" required>
            {getFieldDecorator('email', { initialValue: initialValue.email })(<Input disabled prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email Address" />)}
            <a id="change-mail" onClick={this.toggleEmailModal}> Change Email Address </a>
          </Form.Item>
          <span id="link-label"> Account Password </span>
          <div className="link-container">
            <Form.Item label="Current Password">
              {getFieldDecorator('oldPW', { rules: [{ required: getFieldValue('newPW') && getFieldValue('newPW').length >= 1, message: 'Current password is required.' }] })(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Old Password" />)}
            </Form.Item>
            <Form.Item
              label="New Password"
              className="password-field email-area"
              hasFeedback
              validateStatus={this.state.pwStatus}
              extra={
                <div>
                  <span className="meter" data-score={this.state.score} />
                  <div className="strength-feedback">{this.state.pwStrenghFeedback}</div>
                </div>
              }
            >
              {getFieldDecorator('newPW', {
                validateFirst: true,
                rules: [{ validator: this.validatePWStrength }, { whiteSpace: true, message: 'Spaces are not allowed.' }],
              })(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="New Password" onChange={this.passwordStrength} />)}
            </Form.Item>
          </div>
          <Form.Item>
            <span id="manage"> Manage Account Type</span>
            <Button shape="round" id="change-acc-type" onClick={this.showConfirm}>
              {initialValue.isArtist ? 'Deactivate Artist Account' : 'Activate Artist Account' }
            </Button>
          </Form.Item>
          <Form.Item>
            <Button loading={isGettingSession} type="primary" htmlType="submit" className="form-button">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
        <Modal
          className="login-modal change-mail-modal"
          visible={showEmailModal}
          afterClose={message === 'Please check your email for instructions.' ? this.props.logoutRequest : null}
          destroyOnClose
          centered
          footer={null}
          onCancel={this.toggleEmailModal}
          maskClosable={!isGettingSession}
        >
          <EmailForm />
        </Modal>
        <Modal
          className="change-type-modal"
          visible={this.state.showTypeModal}
          destroyOnClose
          centered
          onCancel={this.showConfirm}
          onOk={() =>
            this.props.changeAccountTypeRequest({ toArtist: !this.props.profile.isArtist })
          }
          maskClosable={!isGettingSession}
        >
          <SwitchAccount />
        </Modal>
      </div>
    );
  }
}
AccountForm.propTypes = {
  profile: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    isArtist: PropTypes.bool.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    getFieldValue: PropTypes.func.isRequired,
    validateFieldsAndScroll: PropTypes.func.isRequired,
    setFieldsValue: PropTypes.func.isRequired,
  }).isRequired,
  isGettingSession: PropTypes.bool.isRequired,
  updateAccountRequest: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  logoutRequest: PropTypes.func.isRequired,
  changeAccountTypeRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.user;

const mapDispatchToProps = {
  updateAccountRequest,
  logoutRequest,
  changeAccountTypeRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(AccountForm));
