import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from 'antd';
import { alertHide } from '../../ducks/feedback';

class AlertContainer extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }
  handleClose() {
    this.props.alertHide();
  }
  render() {
    const { alertMessage, alertType } = this.props;
    return (
      <div>
        {
          alertMessage ?
            alertType === 'success' ?
              message.success(this.props.alertMessage, 5)
            :
              message.error(this.props.alertMessage, 5)
          : ''
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { alertMessage, alertType } = state.feedback;

  return {
    alertType,
    alertMessage,
  };
};

AlertContainer.propTypes = {
  alertMessage: PropTypes.string,
  alertType: PropTypes.string,
  alertHide: PropTypes.func,
};

AlertContainer.defaultProps = {
  alertMessage: null,
  alertType: null,
  alertHide,
};


export default connect(mapStateToProps, { alertHide })(AlertContainer);
