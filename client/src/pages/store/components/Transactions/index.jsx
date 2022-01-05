import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Typography,
  Tag,
  Input,
  Button,
  Icon,
  Collapse,
  Spin,
  Row,
  Col,
  Table,
  Select,
  Breadcrumb,
  Pagination,
  Empty,
} from 'antd';
import {
  fetchTransactionsRequest,
  handleTransactionsQuery,
  changeActiveTransaction,
  updateTransactionRequest,
} from '../../../../ducks/transactions';
import Pending from './Pending/';
import Reserved from './Reserved/';
import Shipped from './Shipped/';
import Completed from './Completed/';
import Canceled from './Canceled/';
import './transaction.css';

const { Panel } = Collapse;
const { Search } = Input;
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


const prepData = orders =>
  orders.map(o => ({
    key: o._id,
    orderID: o._id,
    customer: `${o.ownedBy.firstName} ${o.ownedBy.lastName}`,
    total: o.balance,
    created: new Date(o.datePurchased).toLocaleString('en-US', options),
    status: o.status,
    metadata: o,
  }));


const columns = [
  {
    title: 'Order ID',
    dataIndex: 'orderID',
    key: 'orderID',
  },
  {
    title: 'Created',
    dataIndex: 'created',
    key: 'created',
    sorter: true,
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
    sorter: true,
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    sorter: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      let color = '';
      if (status === 'PENDING') color = 'volcano';
      if (status === 'RESERVED') color = 'blue';
      if (status === 'SHIPPED') color = 'purple';
      if (status === 'COMPLETED') color = 'green';
      if (status === 'CANCELED') color = 'red';
      // if (status === 'REFUNDED') color = 'lime-green';
      return <Tag color={color} key={status}> {status} </Tag>;
    },
  },
];

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      expandedRows: [],
    };
    this.handleSelectStatus = this.handleSelectStatus.bind(this);
    this.handleSearchName = this.handleSearchName.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.expandIcon = this.expandIcon.bind(this);
  }
  componentDidMount() {
    this.props.fetchTransactionsRequest();
  }
  handleSelectStatus(e) {
    const { query } = this.props.transactions;
    this.props.handleTransactionsQuery({ ...query, page: 1, status: e });
  }
  handleSearchName(e) {
    const { query } = this.props.transactions;
    this.props.handleTransactionsQuery({ ...query, page: 1, name: e });
  }
  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }
  handleClear() {
    this.props.handleTransactionsQuery({ page: 1 });
  }
  expandIcon(props) {
    if (props.expanded) {
      return <a className="up" onClick={e => {
          props.onExpand(props.record, e);
      }}><Icon type="caret-up" /></a>
    }
    return <a className="down" onClick={e => {
        props.onExpand(props.record, e);
    }}><Icon type="caret-down" /></a> 
  }

  handleTableChange = (pagination, filters, sorter) => {
    const { pageSize, current } = pagination;
    const { field, order } = sorter;
    const { query } = this.props.transactions;
    let sort = '-datePurchased';
    if (sorter.field) {
      const col = field === 'total' ? 'balance' : field === 'name' ? 'firstName' : 'datePurchased';
      sort = order === 'ascend' ? `${col}` : `-${col}`;
    }
    this.props.handleTransactionsQuery({
      ...query,
      limit: pageSize,
      page: current,
      sort,
    });
  }
  render() {
    const {
      isFetching,
      error,
      message,
      transactions,
      query,
      pagination,
    } = this.props.transactions;
    const { total, page, limit } = pagination;
    return (
      <div>
        <div className="transactions-container-mobile">
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item><Link to="/my-store/overview"><Icon type="shop" /></Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/my-store/transactions"> Transactions </Link></Breadcrumb.Item>
            {
              query && query.status ?
                <Breadcrumb.Item> {query.status} </Breadcrumb.Item>
              : <Breadcrumb.Item> All  </Breadcrumb.Item>
            }
          </Breadcrumb>
          <div className="order-header">
            <span id="label"> My Orders </span>
            <Search className="search" value={this.state.name} onChange={this.handleNameChange} allowClear onSearch={this.handleSearchName} placeholder="Customer name e.g John" enterButton />
            <Select placeholder="Order Status" value={query.status || ''} onSelect={this.handleSelectStatus}>
              <Option value="">All </Option>
              <Option value="PENDING">Pending </Option>
              <Option value="RESERVED">Reserved </Option>
              <Option value="SHIPPED">Shipped </Option>
              <Option value="COMPLETED">Completed </Option>
              <Option value="CANCELED">Canceled </Option>
            </Select>
          </div>
          <div className="order-content">
            {
              isFetching ?
                <Spin indicator={antIcon} style={{ position: 'absolute', top: '50%', left: '50%' }} />
              :
                <div className="order-body">
                  {
                    transactions.length > 0 ?
                      <div className="order-main">
                        <Collapse
                          bordered={false}
                          accordion
                          expandIconPosition="right"
                          expandIcon={({ isActive }) => isActive ? <Icon type="caret-up" /> : <Icon type="caret-down" /> }
                          className="order-collapse"
                        >
                          {transactions.map(o => (
                            <Panel
                              header={
                                <Row type="flex" justify="start" align="middle">
                                  <Col xs={24} sm={24} md={24}><Text strong id="order-id"> Order #{o._id} </Text></Col>
                                  <Col xs={24} sm={12} md={8}><Text id="total">{o.ownedBy.firstName} {o.ownedBy.lastName}</Text></Col>
                                  <Col xs={24} sm={12} md={8}><Text id="date">{new Date(o.datePurchased).toLocaleString('en-US', options)}</Text></Col>
                                  <Col xs={24} sm={12} md={4}><Text id="total">&#8369;{o.balance} </Text></Col>
                                  <Col xs={24} sm={12} md={4}><Tag color={getColor(o.status)}> {o.status} </Tag></Col>
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
                                      <Text id="name"> {o.ownedBy.firstName} {o.ownedBylastName} </Text><br />
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
                          // hideOnSinglePage
                          className="paginate"
                          pageSizeOptions={['12', '24', '36', '48']}
                          showSizeChanger
                          onChange={p => this.props.handleTransactionsQuery({ ...query, page: p })}
                          onShowSizeChange={(_, size) => size !== limit ? this.props.handleTransactionsQuery({ ...query, page: 1, limit: size }) : null}
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
        <div className="transactions-container">
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item><Link to="/my-store/overview"><Icon type="shop" /></Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/my-store/transactions"> Transactions </Link></Breadcrumb.Item>
            {
              query && query.status ?
                <Breadcrumb.Item> {query.status} </Breadcrumb.Item>
              : <Breadcrumb.Item> All  </Breadcrumb.Item>
            }
          </Breadcrumb>
          <div className="transactions-content">
            <Row className="filters" type="flex" justify="space-between" align="middle">
              <Col lg={3}>
                <span id="header"> Orders </span>
              </Col>
              <Col lg={6} className="status-container">
                <Select placeholder="Order Status" value={query.status || ''} onSelect={this.handleSelectStatus}>
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
              </Col>
              <Col lg={6}>
                <Search className="search" value={this.state.name} onChange={this.handleNameChange} onSearch={this.handleSearchName} placeholder="e.g John" allowClear enterButton />
              </Col>
              <Col lg={4}>
                <Button id="reset" shape="round" onClick={this.handleClear}> Reset Filters </Button>
              </Col>
            </Row>
            <Table
              className="table"
              columns={columns}
              loading={isFetching}
              size="middle"
              dataSource={prepData(transactions)}
              onChange={this.handleTableChange}
              pagination={{
                current: pagination.page,
                total: pagination.total,
                pageSize: pagination.limit,
                showSizeChanger: true,
                pageSizeOptions: ['12', '24', '36', '48'],
                showTotal: total => `Total of ${total} orders`,
              }}
              expandedRowRender={record => (
                <div className="expanded-row-container">
                  <Row type="flex" justify="space-around" align="top">
                    <Col lg={10} xxl={8} className="invoice-items">
                      <div className="head">
                        <span id="label-summary"> Order Summary </span><br />
                        <Text type="secondary"> #{record.key} </Text><br />
                      </div>
                      {record.metadata.products.map(p =>
                        <Row gutter={{ lg: 8 }} className="item-container" type="flex" justify="start" align="middle" key={p._id}>
                          <Col lg={3}>
                            <Link to={`/artworks/${p._id}`}>
                              <img className="thumbnail" src={p.images[0].publicURL} alt={p.title} />
                            </Link>
                          </Col>
                          <Col lg={8} className="info">
                            <Link to={`/artworks/${p._id}`}>
                              <Text className="text"> {p.title} </Text><br />
                            </Link>
                          </Col>
                          <Col lg={7} style={{ textAlign: 'right' }} >
                            <Text className="text" > <span>&#8369;</span> {p.price}  x {record.metadata.tally[p._id]} </Text>
                          </Col>
                          <Col lg={6} style={{ textAlign: 'right' }} >
                            <Text className="text" > <span>&#8369;</span> {p.price * record.metadata.tally[p._id]} </Text>
                          </Col>
                        </Row>)
                      }
                      <div className="checkout-container">
                        <div className="checkout-info">
                          <Text className="label"> Sub Total </Text>
                          <Text className="value"> <span>&#8369;</span> {record.metadata.balance} </Text>
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
                          <Text strong className="value grandtotal"> <span>&#8369;</span> {record.metadata.balance} </Text>
                        </div>
                      </div>
                      <div className="del-info">
                        <Text strong className="lbl"> Delivery Information </Text><br />
                        <Text id="name"> {record.metadata.ownedBy.firstName} {record.metadata.ownedBy.lastName} </Text><br />
                        <Text id="mobile"> {record.metadata.mobile} </Text><br />
                        {
                          record.metadata.authorizedRecipient ?
                            <Text>Authorized Recipient: {record.metadata.authorizedRecipient}<br /></Text>
                          : ''
                        }
                        <Text> {record.metadata.housenum} {record.metadata.street} {record.metadata.brgy}</Text><br />
                        <Text> {record.metadata.city} {record.metadata.province} Region {record.metadata.region} </Text><br />
                        <Text> Landmarks: {record.metadata.landmarks} </Text>
                      </div>
                    </Col>
                    <Col lg={12} xl={10} xxl={8} className="manage-order">
                      {
                        record.metadata.status === 'PENDING' ?
                          <Pending order={record.metadata} />
                        : record.metadata.status === 'RESERVED' ?
                          <Reserved order={record.metadata} />
                        : record.metadata.status === 'SHIPPED' ?
                          <Shipped order={record.metadata} />
                        : record.metadata.status === 'COMPLETED' ?
                          <Completed order={record.metadata} />
                        : record.metadata.status === 'CANCELED' ?
                          <Canceled order={record.metadata} />
                        : ''
                      }
                    </Col>
                  </Row>
                </div>
              )}
              expandRowByClick
              expandedRowKeys={this.state.expandedRows}
              expandIcon={props => this.expandIcon(props)}
              onExpand={(expanded, record) => {
                this.setState({ expandedRows: expanded ? [record.key] : [] });
                this.props.changeActiveTransaction(expanded ? record : {});
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
Transactions.propTypes = {
  fetchTransactionsRequest: PropTypes.func.isRequired,
  handleTransactionsQuery: PropTypes.func.isRequired,
  changeActiveTransaction: PropTypes.func.isRequired,
  updateTransactionRequest: PropTypes.func.isRequired,
  transactions: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    error: PropTypes.bool.isRequired,
    query: PropTypes.shape({}),
    transactions: PropTypes.arrayOf(PropTypes.shape({})),
    pagination: PropTypes.shape({
      page: PropTypes.number,
      total: PropTypes.number,
      limit: PropTypes.number,
    }).isRequired,
    active: PropTypes.shape({}),
  }).isRequired,
  profile: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => {
  const { profile } = state.user;
  const { transactions } = state;
  return { transactions, profile };
};

const mapDispatchToProps = {
  fetchTransactionsRequest,
  handleTransactionsQuery,
  changeActiveTransaction,
  updateTransactionRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
