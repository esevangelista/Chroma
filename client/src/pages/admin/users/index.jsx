import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  Select,
  Input,
  Icon,
  Alert,
  Table,
  Typography,
  Row,
  Col,
} from 'antd';
import { adminUsersRequest, adminUsersQuery } from '../../../ducks/admin';
import './users.css';

const { Text } = Typography;

const { Option } = Select;

const columns = [
  {
    title: 'Joined on',
    dataIndex: 'joined',
    key: 'joined',
    sorter: true,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    sorter: true,
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    sorter: true,
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
    sorter: true,
  },
  {
    title: 'Rating',
    dataIndex: 'rating',
    key: 'rating',
    sorter: true,
    filters: [
      { text: '5 stars', value: 5 },
      { text: '4+ stars', value: 4 },
      { text: '3+ stars', value: 3 },
      { text: '2+ stars', value: 2 },
      { text: '1+ stars', value: 1 },
    ],
    filterMultiple: false,
  },
  {
    title: 'Artist Profile',
    dataIndex: 'isArtist',
    key: 'isArtist',
    render: isArtist => isArtist ? <Link to={`/artists/${isArtist}`}><Icon type="select" /></Link> : '',
  },
];

const prepData = users =>
  users.map(o => ({
    key: o._id,
    name: `${o.firstName} ${o.lastName}`,
    email: o.email,
    username: o.username,
    location: o.location && o.location.province && o.location.city ? `${o.location.city}, ${o.location.province}` : '',
    isArtist: o.isArtist ? o._id : null,
    rating: o.rating,
    joined: moment(o.createdAt).format('MMM D YYYY, h:mm A'),
  }));

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'name',
      search: '',
    };
    this.handleTableChange = this.handleTableChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleCatChange = this.handleCatChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }
  componentWillMount() {
    const { query } = this.props;
    const { search, category } = query;
    if (search) this.setState({ search });
    if (category) this.setState({ category });
  }
  componentDidMount() {
    this.props.adminUsersRequest();
  }
  handleTableChange = (pagination, filters, sorter) => {
    const { pageSize, current } = pagination;
    const { field, order } = sorter;
    const { query } = this.props;
    let rating = 0;
    if (filters.rating) rating = filters.rating[0];
    let sort = 'firstName';
    switch (field) {
      case 'joined':
        sort = order === 'ascend' ? 'createdAt' : '-createdAt';
        break;
      case 'name':
        sort = order === 'ascend' ? 'name' : '-name';
        break;
      case 'email':
        sort = order === 'ascend' ? 'email' : '-email';
        break;
      case 'username':
        sort = order === 'ascend' ? 'username' : '-username';
        break;
      case 'rating':
        sort = order === 'ascend' ? 'rating' : '-rating';
        break;
      case 'location':
        sort = order === 'ascend' ? 'province' : '-province';
        break;
      default:
        sort = 'firstName';
        break;
    }
    this.props.adminUsersQuery({
      ...query,
      limit: pageSize,
      page: current,
      rating,
      sort,
    });
  }
  handleSearchChange = e => this.setState({ search: e.target.value });
  handleCatChange = e => this.setState({ category: e });
  handleSearch = () => {
    const { query } = this.props;
    const { search, category } = this.state;
    this.props.adminUsersQuery({
      ...query,
      search,
      category,
      page: 1,
    });
  }
  handleTypeChange = (e) => {
    const { query } = this.props;
    this.props.adminUsersQuery({
      ...query,
      isArtist: e === '' ? undefined : e === 'true',
      page: 1,
    });
  }
  handleClear() {
    this.props.adminUsersQuery({});
  }
  render() {
    const {
      isFetching,
      error,
      message,
      users,
      pagination,
      query,
    } = this.props;
    return (
      <div className="users-content">
        <Row gutter={{ xl: 32 }} className="filters" type="flex" justify="start" align="middle">
          <Col xl={4}>
            <Text strong id="main-label"> Users </Text>
          </Col>
          <Col xl={8}>
            <Input.Group compact>
              <Select value={this.state.category} onSelect={this.handleCatChange}>
                <Option value="name">Name </Option>
                <Option value="email">Email</Option>
                <Option value="username">Username</Option>
              </Select>
              <Input.Search
                enterButton
                value={this.state.search}
                onChange={this.handleSearchChange}
                onSearch={this.handleSearch}
              />
            </Input.Group>
          </Col>
          <Col xl={4}>
            <Select className="acc-type" value={query.isArtist ? query.isArtist.toString() : ''} onSelect={this.handleTypeChange}>
              <Option value="">All </Option>
              <Option value="true">Sellers only </Option>
              <Option value="false">Non-sellers only</Option>
            </Select>
          </Col>
          <Col xl={3}>
            <a onClick={() => this.handleClear}> Clear filters </a>
          </Col>
        </Row>
        <div className="users-container">
          {error ? <Alert closable message="Error" description={message} type="error" /> : ''}
          <Table
            dataSource={prepData(users)}
            columns={columns}
            onChange={this.handleTableChange}
            loading={isFetching}
            pagination={{
              current: pagination.page,
              total: pagination.total,
              pageSize: pagination.limit,
              showSizeChanger: true,
              pageSizeOptions: ['12', '24', '36', '48'],
              showTotal: total => `Total of ${total} users`,
            }}
          />
        </div>
      </div>
    );
  }
}

Users.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  message: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
  })),
  pagination: PropTypes.shape({}).isRequired,
  query: PropTypes.shape({}).isRequired,
  adminUsersRequest: PropTypes.func.isRequired,
  adminUsersQuery: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.admin.users;
const mapDispatchToProps = { adminUsersRequest, adminUsersQuery };

export default connect(mapStateToProps, mapDispatchToProps)(Users);

