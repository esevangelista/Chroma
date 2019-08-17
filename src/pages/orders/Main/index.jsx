import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Typography,
  Tag,
  Icon,
  Collapse,
  Row,
  Col,
  Select,
  Pagination,
  Spin,
  Empty,
} from 'antd';
import {
  fetchOrdersRequest,
  orderQuery,
} from '../../../ducks/orders';
import Pending from '../Pending/';
import Reserved from '../Reserved/';
import Shipped from '../Shipped/';
import Completed from '../Completed/';
import Canceled from '../Canceled/';

import './main.css';

const { Panel } = Collapse;
const { Option } = Select;
const { Text } = Typography;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const getColor = (status) => {
  let color = '';
  if (status === 'PENDING') color = 'volcano';
  if (status === 'RESERVED') color = 'blue';
  if (status === 'SHIPPED') color = 'purple';
  if (status === 'COMPLETED') color = 'green';
  if (status === 'CANCELED') color = 'red';
  // if (status === 'REFUNDED') color = 'lime-green';
  return color;
};
const options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.handleSelectStatus = this.handleSelectStatus.bind(this);
  }
  componentDidMount() {
    this.props.fetchOrdersRequest({});
    // window.scrollTo(0, 0);
  }
  handleSelectStatus(e) {
    const { query } = this.props.orders;
    this.props.orderQuery({ ...query, page: 1, status: e });
  }
  render() {
    const { isFetching, orders, query, pagination } = this.props.orders;
    const { firstName, lastName } = this.props.profile;
    const { total, page, limit } = pagination;
    return (
      <div>
        <div className="orders-container">
          <div className="order-header">
            <span id="label"> My Orders </span>
            <Select size="small" placeholder="Order Status" value={query.status || ''} onSelect={this.handleSelectStatus}>
              <Option value="">All </Option>
              <Option value="PENDING">Pending </Option>
              <Option value="RESERVED">Reserved </Option>
              <Option value="SHIPPED">Shipped </Option>
              <Option value="COMPLETED">Completed </Option>
              <Option value="CANCELED">Canceled </Option>
              {
                //<Option value="RETURNED">Returned </Option>
                //<Option value="REFUNDED">Refunded </Option>
              }
            </Select>
          </div>
          <div className="order-content">
            {
              isFetching ?
                <Spin indicator={antIcon} style={{ position: 'absolute', top: '50%', left: '50%' }} />
              :
                <div className="order-body">
                  {
                    orders.length > 0 ?
                      <div className="order-main">
                        <Collapse
                          bordered={false}
                          accordion
                          expandIconPosition="right"
                          expandIcon={({ isActive }) => isActive ? <Icon type="caret-up" /> : <Icon type="caret-down" /> }
                          className="order-collapse"
                        >
                          {orders.map(o => (
                            <Panel
                              header={
                                <Row type="flex" justify="start" align="middle">
                                  <Col xs={24} md={24} xl={7}><Text strong id="order-id"> Order #{o._id} </Text></Col>
                                  <Col xs={24} md={8} xl={5}><Text id="total">{o.seller.firstName} {o.seller.lastName}</Text></Col>
                                  <Col xs={24} md={8} xl={7}><Text id="date">{new Date(o.datePurchased).toLocaleString('en-US', options)}</Text></Col>
                                  <Col xs={24} md={4} xl={3}><Text id="total">&#8369;{o.balance} </Text></Col>
                                  <Col xs={24} md={4} xl={2}><Tag color={getColor(o.status)}> {o.status} </Tag></Col>
                                </Row>
                              }
                              key={o._id}
                            >
                              <div className="expanded-row-container">
                                <Row type="flex" justify="space-around" align="top">
                                  <Col xs={24} md={10} xxl={8} className="invoice-items">
                                    <div className="head">
                                      <span id="label-summary"> Order Summary </span><br />
                                      <Text type="secondary"> #{o._id} </Text><br />
                                      <Text type="secondary"> Seller:  </Text>
                                      <Text><Link to={`/artists/${o.seller._id}`}> {o.seller.firstName} {o.seller.lastName} </Link> </Text> <br />
                                    </div>
                                    {o.products.map(p => (
                                      <Row gutter={{ md: 8, lg: 8 }} className="item-container" type="flex" justify="start" align="middle" key={p._id}>
                                        <Col xs={3} lg={3}>
                                          <Link to={`/artworks/${p._id}`}>
                                            <img className="thumbnail" src={p.images[0].publicURL} alt={p.title} />
                                          </Link>
                                        </Col>
                                        <Col xs={8} lg={8} className="info">
                                          <Link to={`/artworks/${p._id}`}>
                                            <Text className="text"> {p.title} </Text><br />
                                          </Link>
                                        </Col>
                                        <Col xs={8} lg={7} style={{ textAlign: 'right' }} >
                                          <Text className="text" > <span>&#8369;</span> {p.price}  x {o.tally[p._id]} </Text>
                                        </Col>
                                        <Col xs={5} lg={6} style={{ textAlign: 'right' }} >
                                          <Text className="text" > <span>&#8369;</span> {p.price * o.tally[p._id]} </Text>
                                        </Col>
                                      </Row>
                                    ))}
                                    <div className="checkout-container">
                                      <div className="checkout-info">
                                        <Text className="label"> Sub Total </Text>
                                        <Text className="value"> <span>&#8369;</span> {o.balance} </Text>
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
                                        <Text strong className="value grandtotal"> <span>&#8369;</span> {o.balance} </Text>
                                      </div>
                                    </div>
                                    <div className="del-info">
                                      <Text strong className="lbl"> Delivery Information </Text><br />
                                      <Text id="name"> {firstName} {lastName} </Text><br />
                                      <Text id="mobile"> {o.mobile} </Text><br />
                                      {
                                        o.authorizedRecipient ?
                                          <Text>Authorized Recipient: {o.authorizedRecipient}<br /></Text>
                                        : ''
                                      }
                                      <Text> {o.housenum} {o.street} {o.brgy}</Text><br />
                                      <Text> {o.city} {o.province} Region {o.region} </Text><br />
                                      <Text> Landmarks: {o.landmarks} </Text>
                                    </div>
                                  </Col>
                                  <Col xs={24} md={12} xl={10} xxl={8} className="manage-order">
                                    {
                                      o.status === 'PENDING' ?
                                        <Pending order={o} />
                                      : o.status === 'RESERVED' ?
                                        <Reserved order={o} />
                                      : o.status === 'SHIPPED' ?
                                        <Shipped order={o} />
                                      : o.status === 'COMPLETED' ?
                                        <Completed order={o} />
                                      : o.status === 'CANCELED' ?
                                        <Canceled order={o} />
                                      : ''
                                    }
                                  </Col>
                                </Row>
                              </div>
                            </Panel>
                          ))}
                        </Collapse>
                        <Pagination
                          current={page}
                          total={total}
                          pageSize={limit}
                          size="small"
                          hideOnSinglePage
                          className="paginate"
                          pageSizeOptions={['12', '24', '36', '48']}
                          showSizeChanger
                          onChange={p => this.props.handleOrderQuery({ ...query, page: p })}
                          onShowSizeChange={(_, size) => size !== limit ? this.props.handleOrderQuery({ ...query, page: 1, limit: size }) : null}
                        />
                      </div>
                    :
                      <div className="order-empty">
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
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

Main.propTypes = {
  fetchOrdersRequest: PropTypes.func.isRequired,
  orderQuery: PropTypes.func.isRequired,
  orders: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    orders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    query: PropTypes.shape().isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => {
  const { profile } = state.user;
  const { orders } = state;
  return { orders, profile };
};

const mapDispatchToProps = {
  fetchOrdersRequest,
  orderQuery,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
