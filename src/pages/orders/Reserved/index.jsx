import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Typography,
  Tag,
  Modal,
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


class Reserved extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
    this.showProof = this.showProof.bind(this);
  }
  showProof() {
    this.setState({ isVisible: !this.state.isVisible });
  }
  render() {
    const { order } = this.props;
    return (
      <div className="pending-container">
        <div className="head">
          <span id="label-summary"> Order History</span><br />
          <Tag color="blue"> {order.status} </Tag>
        </div>
        <Timeline className="timeline" reverse>
          <Timeline.Item color="green">
            {new Date(order.datePurchased).toLocaleString('en-US', options)} <br />
            <br />You have successfully placed an order <br />
          </Timeline.Item>
          <Timeline.Item color="green">
            {new Date(order.datePaid).toLocaleString('en-US', options)} <br />
            Proof of payment uploaded. <a id="view-link" onClick={this.showProof}>View</a>
            <br />Items in this transaction are now reserved. <br />
            <Modal
              centered
              visible={this.state.isVisible}
              onCancel={this.showProof}
              maskClosable
              footer={null}
              className="preview"
            >
              <img style={{ width: '100%' }} src={order.proofOfPayment.publicURL} alt="Proof of Payment" />
            </Modal>
          </Timeline.Item>
        </Timeline>
        <div className="whatsnext">
          <Text strong> What's next? </Text><br />
          <Text type="secondary"> The seller can now ship your orders to you.</Text>
          <Text type="secondary"> You can track your orders once the tracking details are provided by the seller.</Text><br />
        </div>
      </div>
    );
  }
}

Reserved.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => state.orders;
const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(Reserved);
