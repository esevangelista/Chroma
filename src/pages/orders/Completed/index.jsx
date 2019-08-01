import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Typography,
  Tag,
  Modal,
  Timeline,
  Button,
} from 'antd';

const { Text } = Typography;
const options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

class Completed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      isReceiptVisible: false,
    };
    this.showProof = this.showProof.bind(this);
    this.showReceipt = this.showReceipt.bind(this);
  }
  showProof() {
    this.setState({ isVisible: !this.state.isVisible });
  }
  showReceipt() {
    this.setState({ isReceiptVisible: !this.state.isReceiptVisible }); 
  }
  render() {
    const { order } = this.props;
    return (
      <div className="pending-container">
        <div className="head">
          <span id="label-summary"> Order History</span><br />
          <Tag color="green"> {order.status} </Tag>
        </div>
        <Timeline className="timeline" reverse>
          <Timeline.Item color="green">
            {new Date(order.datePurchased).toLocaleString('en-US', options)} <br />
            <br />You have successfully placed an order <br />
          </Timeline.Item>
          <Timeline.Item color="green">
            {new Date(order.datePaid).toLocaleString('en-US', options)} <br />
            Proof of payment uploaded. <a id="view-link" onClick={this.showProof}> View </a>
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
          <Timeline.Item color="green">
            {new Date(order.dateShipped).toLocaleString('en-US', options)} <br />
            Ordered items were forwarded to LBC Express for delivery.<br />
            Your tracking number: 3390919072710004<br />
            <a id="view-link" onClick={this.showReceipt}>View courier-issued receipt</a>
            <br />
            <Modal
              centered
              visible={this.state.isReceiptVisible}
              onCancel={this.showReceipt}
              maskClosable
              footer={null}
              className="preview"
            >
              <img style={{ width: '100%' }} src={order.proofOfPayment.publicURL} alt="Official Receipt" />
            </Modal>
            <Button className="btn-track" type="primary">
              <a href="https://www.lbcexpress.com/track/?tracking_no=3390919072710004" target="_blank" rel="noopener noreferrer">
                Track
              </a>
            </Button>
          </Timeline.Item>
          <Timeline.Item color="green">
            {new Date(order.dateReceived).toLocaleString('en-US', options)} <br />
            Your order has been delivered.
          </Timeline.Item>
        </Timeline>
        <div className="whatsnext">
          <Text strong>What's next? </Text><br />
          <Text type="secondary">You can now write a review and rate this artist!</Text>
        </div>
      </div>
    );
  }
}

Completed.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => state.orders;
const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(Completed);
