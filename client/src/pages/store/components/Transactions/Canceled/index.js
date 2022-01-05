import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Tag,
  Timeline,
} from 'antd';

const options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

class Canceled extends Component {
  render() {
    const { order } = this.props;
    return (
      <div className="pending-container">
        <div className="head">
          <span id="label-summary"> Order History</span><br />
          <Tag color="red"> {order.status} </Tag>
        </div>
        <Timeline className="timeline" reverse>
          <Timeline.Item color="green">
            {new Date(order.datePurchased).toLocaleString('en-US', options)} <br />
            {order.ownedBy.firstName} {order.ownedBy.lastName} placed an order <br />
          </Timeline.Item>
          <Timeline.Item color="green">
            {new Date(order.dateCanceled).toLocaleString('en-US', options)} <br />
            {order.ownedBy.firstName} {order.ownedBy.lastName} canceled the order <br />
          </Timeline.Item>
        </Timeline>
      </div>
    );
  }
}

Canceled.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => state.orders;
const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(Canceled);
