import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Alert } from 'antd';
import { connect } from 'react-redux';
import { getRequestService } from '../../../../../api/apiRequest';
import { changeEmailRequest } from '../../../../../ducks/users';


class EmailForm extends Component {
  constructor(props) {
    super(props);
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }
  handleEmailSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) this.props.changeEmailRequest({ email: values.newMail });
    });
  }
  validateEmail = async (rule, value, callback) => {
    if (value) {
      const email = value;
      const res = await getRequestService(`/users?email=${email}&exact=true`);
      if (res.data.total > 0) {
        return callback('Email is already taken.');
      }
    }
    return callback();
  }
  render() {
    const { isGettingSession, error, message } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleEmailSubmit} className="login-form">
        {
          message ?
            <Alert className="alert-reg" banner closable message={message} type={error === true? 'error' : 'success'} />
          : ''
        }
        <h3> Change current email </h3>
        <Form.Item label="New Email Address" hasFeedback>
          {getFieldDecorator('newMail', {
            validateFirst: true,
            rules: [
              { required: true, message: 'Field is empty.' },
              { type: 'email', message: 'Invalid E-mail!' },
              { validator: this.validateEmail },
              ],
            })(<Input placeholder="e.g. juandelacruz@gmail.com" />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" loading={isGettingSession} htmlType="submit" className="login-form-button">
            Confirm
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

EmailForm.propTypes = {
  changeEmailRequest: PropTypes.func.isRequired,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFieldsAndScroll: PropTypes.func.isRequired,
  }).isRequired,
  error: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  isGettingSession: PropTypes.bool.isRequired,
};

const mapStateToProps = state => state.user;
const mapDispatchToProps = { changeEmailRequest };

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(EmailForm));
