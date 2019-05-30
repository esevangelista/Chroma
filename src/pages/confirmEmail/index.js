import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { confirmEmailRequest } from '../../ducks/auth';
import { alertDisplay } from '../../ducks/feedback';
import './confirmEmail.css';


class ConfirmAccount extends React.PureComponent {
  componentDidMount() {
    const { confirmToken } = this.props.match.params;
    this.props.confirmEmailRequest(confirmToken);
  }

  render() {
    return (
      <div className="confirm-email-container">
        <Spin size="large" />
      </div>
    );
  }
}

ConfirmAccount.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      confirmToken: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  confirmEmailRequest: PropTypes.func.isRequired,
};
const mapStateToProps = state => state;
const mapDispatchToProps = {
  confirmEmailRequest,
  alertDisplay,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmAccount);
