import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Rate, Typography, Row, Col, Spin, Result, Statistic, Card} from 'antd';
import { getOverviewRequest } from '../../../../ducks/transactions';
import './overview.css';

const { Text } = Typography;

class Overview extends Component {
  componentDidMount() {
    this.props.getOverviewRequest();
    window.scrollTo(0, 0);
  }
  render() {
    const { overview, isFetching, error, message } = this.props;
    const {
      all,
      shipped,
      pending,
      reserved,
      canceled,
      completed,
      overallRating,
      one,
      two,
      three,
      four,
      five,
      totalProfit,
      artAvailable,
      artCount,
      artSold,
    } = overview;
    return (
      <div className="overview-content">
        <Text id="title"> Overview </Text>
        <Link to="/my-store/transactions">
          <Card hoverable bordered={false} className="container">
            <Text id="label">Transactions </Text><br />
            {
              isFetching ?
                <Spin />
              : error ?
                <Result status={500} description={message} />
              :
                <Row type="flex" justify="space-between" align="middle">
                  <Col xs={24} xl={3}>
                    <Statistic
                      title="Total Profit"
                      value={totalProfit}
                      prefix={<span>&#8369;</span>}
                    />
                  </Col>
                  <Col xs={12} sm={8} md={4} xl={3}>
                    <Statistic
                      title="All"
                      value={all}
                    />
                  </Col>
                  <Col xs={12} sm={8} md={4} xl={3}>
                    <Statistic
                      title="Pending"
                      value={pending}
                    />
                  </Col>
                  <Col xs={12} sm={8} md={4} xl={3}>
                    <Statistic
                      title="Reserved"
                      value={reserved}
                    />
                  </Col>
                  <Col xs={12} sm={8} md={4} xl={3}>
                    <Statistic
                      title="Shipped"
                      value={shipped}
                    />
                  </Col>
                  <Col xs={12} sm={8} md={4} xl={3}>
                    <Statistic
                      title="Completed"
                      value={completed}
                    />
                  </Col>
                  <Col xs={12} sm={8} md={4} xl={3}>
                    <Statistic
                      title="Canceled"
                      value={canceled}
                    />
                  </Col>
                </Row>
            }
          </Card>
        </Link>
        <Row type="flex" align="top" justify="space-between">
          <Col xs={24} md={8}>
            <Link to="/account/profile#reviews">
              <Card hoverable bordered={false} className="container">
                <Text id="label">Feedback</Text><br />
                {
                  isFetching ?
                    <Spin />
                  : error ?
                    <Result status={500} description={message} />
                  :
                    <Row type="flex" justify="space-between">
                      <Col xs={24} sm={12} md={24} xl={8} >
                        <Statistic
                          title="Overall Rating"
                          value={overallRating}
                        />
                      </Col>
                      <Col xs={24} sm={12} md={24} xl={12}>
                        <Text type="secondary">Reviews</Text><br />
                        <Rate disabled defaultValue={5} />
                        <Text>{five}</Text><br />
                        <Rate disabled defaultValue={4} />
                        <Text>{four}</Text><br />
                        <Rate disabled defaultValue={3} />
                        <Text>{three}</Text><br />
                        <Rate disabled defaultValue={2} />
                        <Text>{two}</Text><br />
                        <Rate disabled defaultValue={1} />
                        <Text>{one}</Text><br />
                      </Col>
                    </Row>
                }
              </Card>
            </Link>
          </Col>
          <Col xs={24} md={14}>
            <Link to="/my-store/products">
              <Card hoverable bordered={false} className="container">
                <Text id="label">Artworks </Text><br />
                {
                  isFetching ?
                    <Spin />
                  : error ?
                    <Result status={500} description={message} />
                  :
                    <Row type="flex" justify="space-between">
                      <Col xs={12} sm={8}>
                        <Statistic
                          title="All artworks"
                          value={artCount}
                        />
                      </Col>
                      <Col xs={12} sm={8}>
                        <Statistic
                          title="Available artworks"
                          value={artAvailable}
                        />
                      </Col>
                      <Col xs={12} sm={8}>
                        <Statistic
                          title="Sold out artworks"
                          value={artSold}
                        />
                      </Col>
                    </Row>
                }
              </Card>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}


Overview.propTypes = {
  getOverviewRequest: PropTypes.func.isRequired,
  overview: PropTypes.shape({ }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  message: PropTypes.string,
};

const mapStateToProps = state => state.transactions;
const mapDispatchToProps = { getOverviewRequest };

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
