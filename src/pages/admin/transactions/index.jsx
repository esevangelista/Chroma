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
import { adminTransactionsRequest, adminTransactionRequest, adminTransactionsQuery } from '../../../ducks/admin';
import './transactions.css';

const { Text } = Typography;

const { Option } = Select;

class Transactions extends Component {
  render() {
    return (
      <div>
      </div>
    );
  }
}

Transactions.propTypes = {
  adminTransactionsQuery: PropTypes.func.isRequired,
  adminTransactionRequest: PropTypes.func.isRequired,
  adminTransactionsRequest: PropTypes.func.isRequired,

}x