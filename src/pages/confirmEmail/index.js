import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
    const { isFetching, error } = this.props;
    return (
      <div>
        {
          isFetching ?
            <div className="confirm-email-container">
              <Spin size="large" />
            </div>
          : error ?
            <Redirect to={error === false ? "/" : "/kkkkk"} />
          : <Redirect to="/kkkkk" />
        }
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
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};
const mapStateToProps = state => state.auth.confirmEmail;
const mapDispatchToProps = {
  confirmEmailRequest,
  alertDisplay,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmAccount);
