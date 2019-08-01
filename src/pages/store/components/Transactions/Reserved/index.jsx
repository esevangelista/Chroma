import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Typography,
  Tag,
  Modal,
  Upload,
  Input,
  Button,
  Select,
  message,
  Icon,
  Timeline,
} from 'antd';
import { shipOrderRequest } from '../../../../../ducks/transactions';

const { Text } = Typography;
const { Option } = Select;
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
      newFile: null,
      courier: null,
      trackingNumber: null,
    };
    this.showProof = this.showProof.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCourier = this.handleCourier.bind(this);
    this.handleTrack = this.handleTrack.bind(this);
  }
  showProof() {
    this.setState({ isVisible: !this.state.isVisible });
  }
  handleCourier(e) {
    this.setState({ courier: e });
  }
  handleTrack(e) {
    this.setState({ trackingNumber: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    const { newFile, courier, trackingNumber } = this.state;
    if (newFile) {
      data.append('courier', courier);
      data.append('trackingNumber', trackingNumber);
      data.append('dest', 'SHIPPING');
      data.append('files', newFile);
      const { _id } = this.props.order;
      this.props.shipOrderRequest(_id, data);
    }
  }
  render() {
    const { order } = this.props;
    const { courier, trackingNumber, newFile } = this.state;
    const disable = !courier || !trackingNumber || !newFile;
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
            <br />Start preparing and shipping the items now. <br />
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
          <Text type="secondary">
            Once you processed the orders to the your chosen courier,
              upload a copy of the receipt issued by the courier company.
          </Text>
        </div>
        <div className="reserved-upload upload-container">
          <Text strong> Shipping transaction receipt </Text><br />
          <Upload {...uploadProps}>
            <Button><Icon type="upload" /> Choose File</Button>
            {
              newFile ? <Icon className="check" type="check-circle" /> : ''
            }
          </Upload>
          <Text strong> Select a courier </Text><br />
          <Select value={courier} onSelect={this.handleCourier}>
            <Option value="lbcexpress">LBC Express </Option>
            <Option value="ninjavan">Ninja Van </Option>
            <Option value="blackarrow">Black Arrow </Option>
            <Option value="other">Others </Option>
          </Select>
          <br />
          {
            courier === 'other' ?
              <div>
                <Text strong> If others, specify: </Text>
                <Input value={courier === 'other' ? '' : courier} onChange={this.handleCourier} />
              </div>
            : ''
          }
          <Text strong> Tracking Number </Text>
          <Input value={trackingNumber} onChange={this.handleTrack} />
          <Button
            type="primary"
            onClick={this.handleSubmit}
            disabled={disable}
            id="btn-submit"
            style={{
              marginTop: '16px',
              width: '100%',
              maxWidth: 'unset',
            }}
          >
            Submit
          </Button>
        </div>

      </div>
    );
  }
}

Reserved.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  shipOrderRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.orders;
const mapDispatchToProps = { shipOrderRequest };

export default connect(mapStateToProps, mapDispatchToProps)(Reserved);
