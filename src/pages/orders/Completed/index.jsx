import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Typography,
  Tag,
  Modal,
  Timeline,
  Button,
  Rate,
  Input,
  Icon,
} from 'antd';
import { addReviewRequest, editReviewRequest } from '../../../ducks/orders';
import './completed.css';

const { Text, Paragraph } = Typography;
const { TextArea } = Input;

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
      rating: null,
      review: null,
      isEdit: false,
    };
    this.showProof = this.showProof.bind(this);
    this.showReceipt = this.showReceipt.bind(this);
    this.submit = this.submit.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
  }
  componentWillMount() {
    const { review } = this.props.order;
    if (review) {
      this.setState({ rating: review.rating, review: review.review });
    }
  }
  submit(e) {
    e.preventDefault();
    const { _id } = this.props.order;
    const { rating, review } = this.state;
    this.props.addReviewRequest(_id, { rating, review });
  }
  submitEdit(e) {
    e.preventDefault();
    const { _id } = this.props.order.review;
    const { rating, review } = this.state;
    this.props.editReviewRequest(_id, { rating, review });
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
            You have successfully placed an order <br />
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
          {
            !order.review ?
              <div>
                <Text strong>What's next? </Text><br />
                <Text type="secondary">Rate and write a review for this artist (e.g Seller communication, delivery and packaging, or listing accuracy)!</Text>
              </div>
            :
              <div>
                {
                  this.state.isEdit ?
                    <Text strong>
                      Edit Review and Rating
                      <a
                        onClick={() =>
                          this.setState({
                            isEdit: false,
                            review: this.props.order.review.review,
                            rating: this.props.order.review.rating,
                          })
                        }
                      >
                        <Icon type="close" id="icon" />
                      </a>
                    </Text>
                  :
                    <div>
                      <Text strong> Review and rating </Text>
                      <Icon id="icon" type="edit" onClick={() => this.setState({ isEdit: true })} />
                    </div>
                }
              </div>
          }
          <div className="review-container">
            {
              !order.review ?
                <div className="new-review">
                  <Text strong> Rating </Text>
                  <Rate allowClear allowHalf value={this.state.rating} onChange={value => this.setState({ rating: value })} />
                  <Text strong> Review </Text>
                  <TextArea
                    placeholder="Tell us what you think"
                    autosize={{ minRows: 2, maxRows: 5 }}
                    value={this.state.review}
                    onChange={e => this.setState({ review: e.target.value })}
                  />
                  <Button
                    type="primary"
                    onClick={this.submit}
                    className="btn-submit"
                    disabled={!this.state.review || !this.state.rating || !/\S/.test(this.state.review)}
                  >
                    Submit Review
                  </Button>
                </div>
              :
                <div className="review">
                  {
                    this.state.isEdit ?
                      <div className="edit-review">
                        <Text strong> Rating </Text>
                        <Rate allowClear allowHalf value={this.state.rating} onChange={value => this.setState({ rating: value })} />
                        <Text strong> Review </Text>
                        <TextArea
                          placeholder="Tell us what you think"
                          autosize={{ minRows: 3, maxRows: 6 }}
                          value={this.state.review}
                          onChange={e => this.setState({ review: e.target.value })}
                        />
                        <Button
                          type="primary"
                          className="btn-submit"
                          onClick={this.submitEdit}
                          disabled={!this.state.review || !this.state.rating || !/\S/.test(this.state.review)}
                        >
                          Submit Review
                        </Button>
                      </div>
                    :
                      <div className="read-only">
                        <Rate disabled defaultValue={order.review.rating} />
                        <div className="review-read">
                          {
                            order.review.review.split('\n').map(p => <Paragraph key={p}> {p} </Paragraph>)
                          }
                        </div>
                      </div>
                  }
                </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

Completed.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  addReviewRequest: PropTypes.func.isRequired,
  editReviewRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.orders;
const mapDispatchToProps = { addReviewRequest, editReviewRequest };

export default connect(mapStateToProps, mapDispatchToProps)(Completed);
