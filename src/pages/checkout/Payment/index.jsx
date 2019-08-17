import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, Spin, Collapse, Checkbox, Button, Icon, Steps, Typography } from 'antd';
import { addOrderRequest } from '../../../ducks/orders';
import './payment.css';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const { Step } = Steps;
const { Text } = Typography;
const { Panel } = Collapse;

const deadline = new Date();
deadline.setDate(deadline.getDate() + 7);
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      showPayment: true,
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({ checked: !this.state.checked });
  }
  render() {
    const { cart, orders } = this.props;
    const { isFetching, products, tally, total } = cart;
    const { newOrder } = orders;
    return (
      <div className="shipping-container">
        {
          isFetching ?
            <Spin indicator={antIcon} style={{ position: 'absolute', top: '50%', left: '50%' }} />
          : !isFetching && products.length > 0 && newOrder.mobnum ?
              <Row className="payment-container" type="flex" justify="center" align="top">
                <Steps status="error" current={1} size="small" direction="horizontal" className="checkout-steps">
                  <Step title="SHIPPING" />
                  <Step title="PAYMENT" />
                  <Step title="CONFIRMATION" />
                </Steps>
                <Col xs={24} sm={24} md={24} lg={12} xl={10} xxl={8} className="cart-content">
                  <span id="cart-sum"> Cart Summary </span>
                  {products.map(p =>
                    <Row gutter={{ md: 16 }}className="item-container" type="flex" justify="start" align="middle" key={p._id}>
                      <Col xs={7} sm={6}>
                        <Link to={`/artworks/${p._id}`}>
                          <img className="thumbnail" src={p.images[0].publicURL} alt={p.title} />
                        </Link>
                      </Col>
                      <Col xs={11} sm={12} className="info">
                        <Link to={`/artworks/${p._id}`}>
                          <Text className="text"> {p.title} </Text><br />
                          <Text className="text" type="secondary"> {p.artform}</Text>
                        </Link>
                      </Col>
                      <Col xs={6} sm={6} style={{ textAlign: 'right' }} >
                        <Text className="text" > <span>&#8369;</span> {p.price} ({tally[p._id]}) </Text>
                      </Col>
                    </Row>)
                  }
                  <div className="checkout-container">
                    <div className="checkout-info">
                      <Text className="label"> Sub Total </Text>
                      <Text className="value"> <span>&#8369;</span> {total} </Text>
                    </div>
                  </div>
                  <div className="checkout-container">
                    <div className="checkout-info">
                      <Text className="label"> Delivery Fee </Text>
                      <Text className="value"> <span>&#8369;</span> 0 </Text>
                    </div>
                  </div>
                  <div className="checkout-container">
                    <div className="checkout-info">
                      <Text strong className="label"> TOTAL </Text>
                      <Text strong className="value grandtotal"> <span>&#8369;</span> {total} </Text>
                    </div>
                  </div>
                  <div className="del-info">
                    <Text strong> Delivery Address </Text><br />
                    <Text> {newOrder.housenum} {newOrder.street} {newOrder.brgy} {newOrder.city} </Text><br />
                    <Text> {newOrder.province} Region {newOrder.region} </Text><br />
                    <Text> Landmarks: {newOrder.landmarks} </Text>
                  </div>
                </Col>
                { this.state.showPayment ?
                    <Col xs={24} sm={24} md={24} lg={12} xl={14} xxl={10} className="payment-main-container">
                      <span id="label"> Preferred Payment Method </span>
                      <Collapse bordered={false} defaultActiveKey={['2']} activeKey={['2']} className="collapse-payment">
                        <Panel showArrow={false} header={<Checkbox disabled value="CC"> Credit Card </Checkbox>} key="1">
                          This option is currently unavailable.
                        </Panel>
                        <Panel showArrow={false} header={<Checkbox checked={this.state.checked} onChange={this.toggle}> Bank Deposit </Checkbox>} key="2">
                          Want to pay via deposit? You can complete your purchase via online transfer or over the counter bank transaction.
                        </Panel>
                        <Panel showArrow={false} header={<Checkbox disabled value="COD"> Cash On Delivery </Checkbox>} key="3">
                          This option is currently unavailable.
                        </Panel>
                      </Collapse>
                      <Button disabled={!this.state.checked} onClick={() => this.setState({ showPayment: false })} type="primary" className="form-button">
                        Continue
                      </Button>
                    </Col>
                  :
                    <Col xs={24} sm={24} md={24} lg={12} xl={14} xxl={10} className="payment-main-container">
                      <span id="label"> Terms of Service </span>
                      <ol>
                        <li>
                          Once your order is placed, the seller will be sending
                          you a message containing the necessary information for fund transfer (bank account name, account number).
                        </li>
                        <li>
                          Items in your invoice are reserved
                          under your account only until 7:00pm of {monthNames[deadline.getMonth()]} {deadline.getDate()}, {deadline.getFullYear()}.  
                          We accept online and mobile transfers!
                        </li>
                        <li>
                          If you haven't sent the seller your proof of payment before 7:00pm of {monthNames[deadline.getMonth()]} {deadline.getDate()}, {deadline.getFullYear()} ,
                            your reservation will be automatically cancelled.
                        </li>
                        <li>
                          To provide proof of payment, select the order in the orders page and upload
                          a clear photo of your deposit slip.
                          TIP: Keep the hard copy, just in case.
                          For online or mobile transfers, simply reply
                          to the attach the a screenshot of your transaction.
                        </li>
                        <li>
                          Once the seller received your proof of payment, kindly wait for the seller to ship and upload tracking details. You may check the status of your order/s at the orders page.
                        </li>
                      </ol>
                      <Button type="primary" onClick={() => this.props.addOrderRequest()}className="form-button">
                        Place My Order/s
                      </Button>
                    </Col>
                }
              </Row>
          : <Redirect to="/checkout/shipping" />
        }
      </div>
    );
  }
}

Payment.propTypes = {
  addOrderRequest: PropTypes.func.isRequired,
  cart: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
  }).isRequired,
  orders: PropTypes.shape({
    newOrder: PropTypes.shape({
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => {
  const { cart, orders, user } = state;
  const { profile } = user;
  return { cart, orders, profile };
};

const mapDispatchToProps = {
  addOrderRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
