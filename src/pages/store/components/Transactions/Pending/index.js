import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Typography,
  Tag,
  Timeline,
} from 'antd';

const { Text } = Typography;
const options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

class Pending extends Component {
  render() {
    const { order } = this.props;
    return (
      <div className="pending-container">
        <div className="head">
          <span id="label-summary"> Order History</span><br />
          <Tag color="volcano"> {order.status} </Tag>
        </div>
        <Timeline className="timeline">
          <Timeline.Item color="green">
            {new Date(order.datePurchased).toLocaleString('en-US', options)} <br />
            {order.ownedBy.firstName} {order.ownedBy.lastName} placed an order <br />
          </Timeline.Item>
        </Timeline>
        <div className="whatsnext">
          <Text strong> What's next? </Text><br />
          <Text type="secondary">Send the necessary info (bank, account number, account name) to {order.ownedBy.firstName}. </Text>
          <Text type="secondary">
            Once {order.ownedBy.firstName} transferred the payment and uploaded a copy of the proof of payment,
            ship the items and update this record.
          </Text><br />
        </div>
      </div>
    );
  }
}

Pending.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => state.orders;
const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(Pending);
