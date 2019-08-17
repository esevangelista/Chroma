import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Typography,
  Tag,
  Button,
  Upload,
  Icon,
  Timeline,
  message,
  Popconfirm,
} from 'antd';
import {
  uploadProofOfPaymentRequest,
  cancelOrderRequest,
} from '../../../ducks/orders';
import './pending.css';

const { Text } = Typography;

const options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

class Pending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newFile: null,
    };
    this.handleUpload = this.handleUpload.bind(this);
  }
  handleUpload(e) {
    e.preventDefault();
    const data = new FormData();
    if (this.state.newFile) {
      data.append('dest', 'PAYMENT');
      data.append('files', this.state.newFile);
      const { _id } = this.props.order;
      this.props.uploadProofOfPaymentRequest(_id, data);
    }
  }
  render() {
    const { order } = this.props;
    const { _id } = order;
    const uploadProps = {
      showFileList: false,
      accept: '.png, .jpeg, .jpg',
      fileList: [],
      beforeUpload: (file) => {
        const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isImg) {
          message.error('You can only upload JPG, PNG, JPEG files!');
        } else {
          this.setState({ newFile: file });
        }
        return false;
      },
    };

    return (
      <div className="pending-container">
        <div className="head">
          <span id="label-summary"> Order History</span><br />
          <Tag color="volcano"> {order.status} </Tag>
        </div>
        <Timeline className="timeline">
          <Timeline.Item color="green">
            {new Date(order.datePurchased).toLocaleString('en-US', options)} <br />
            You have successfully placed an order
          </Timeline.Item>
        </Timeline>
        <div className="whatsnext">
          <Text strong> What's next? </Text><br />
          <Text type="secondary"> Wait for the seller's message for the payment details.</Text>
          <Text type="secondary"> Once paid, upload a scanned photo of the proof of payment</Text><br /> 
        </div>
        <div className="upload-container">
          <Upload {...uploadProps}>
            <Button size="small"><Icon type="upload" /> Choose File</Button>
            {
              this.state.newFile ? <Icon className="check" type="check-circle" /> : ''
            }
          </Upload>
          <Button
            type="primary"
            onClick={this.handleUpload}
            disabled={!this.state.newFile}
            id="btn-submit"
          >
          Submit
          </Button>
        </div>
        <Popconfirm
          placement="top"
          title="Are you sure you want to cancel your order?"
          onConfirm={() => this.props.cancelOrderRequest(_id)}
          okText="Yes"
          cancelText="No"
        >
          <Button shape="round" id="btn-cancel">Cancel Order </Button>
        </Popconfirm>
      </div>
    );
  }
}

Pending.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  uploadProofOfPaymentRequest: PropTypes.func.isRequired,
  cancelOrderRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.orders;
const mapDispatchToProps = { uploadProofOfPaymentRequest, cancelOrderRequest };

export default connect(mapStateToProps, mapDispatchToProps)(Pending);
