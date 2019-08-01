import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Typography,
  Tag,
  Modal,
  Timeline,
  Button,
  Popconfirm,
} from 'antd';
import { completeOrderRequest } from '../../../../../ducks/transactions';

const { Text } = Typography;
const getInfo = (courier) => {
  if (courier === 'lbcexpress') return { long: 'LBC Express', link: 'http://www.lbcexpress.com/track/?tracking_no=' };
  if (courier === 'ninjavan') return { long: 'Ninja Van', link: 'http://www.ninjavan.co/en-ph/tracking?id=' };
  if (courier === 'blackarrow') return { long: 'Black Arrow Express', link: 'http://locator.blackarrow.express/?ref_no=' };
  return { long: courier };
};
const options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

class Shipped extends Component {
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
    const info = getInfo(order.courier);
    const { _id } = order;
    return (
      <div className="pending-container">
        <div className="head">
          <span id="label-summary"> Order History</span><br />
          <Tag color="purple"> {order.status} </Tag>
        </div>
        <Timeline className="timeline" reverse>
          <Timeline.Item color="green">
            {new Date(order.datePurchased).toLocaleString('en-US', options)} <br />
            <br />
            {order.ownedBy.firstName} {order.ownedBy.lastName} placed an order <br />
          </Timeline.Item>
          <Timeline.Item color="green">
            {new Date(order.datePaid).toLocaleString('en-US', options)} <br />
            Proof of payment uploaded. <a id="view-link" onClick={this.showProof}> View </a>
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
            Ordered items were forwarded to {info.long} for delivery.<br />
            Tracking number: {order.trackingNumber}<br />
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
              <img style={{ width: '100%' }} src={order.shippingReceipt.publicURL} alt="Official Receipt" />
            </Modal>
            {
              info.link ?
                <Button className="btn-track" type="primary">
                  <a href={`${info.link}${order.trackingNumber}`} target="_blank" rel="noopener noreferrer">
                    Track
                  </a>
                </Button>
              : ''
            }
          </Timeline.Item>
        </Timeline>
        <div className="whatsnext">
          <Text strong> What's next? </Text><br />
          <Text type="secondary">Items are now shipped to {order.ownedBy.firstName} {order.ownedBy.lastName}. </Text>
          <Text type="secondary">Once you get notified of the delivery, update this record's status to COMPLETED to conclude this transaction.</Text>
          <Text type="secondary">
            You won't be able to update this record once COMPLETED. <br />
            Returns and refunds must be discussed over direct messages with the customer.
          </Text>

        </div>
        <Popconfirm
          placement="top"
          title="Are you sure you want to finish this transaction?"
          onConfirm={() => this.props.completeOrderRequest(_id, { status: 'COMPLETED' })}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" id="btn-cancel"> Complete Transaction</Button>
        </Popconfirm>
      </div>
    );
  }
}

Shipped.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  completeOrderRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.orders;
const mapDispatchToProps = { completeOrderRequest };

export default connect(mapStateToProps, mapDispatchToProps)(Shipped);
