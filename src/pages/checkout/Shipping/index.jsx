import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { regions, provinces, cities } from 'philippines';
import { Row, Col, Typography, Steps, Form, Input, Select, Switch, Button } from 'antd';
import { handleNewOrder } from '../../../ducks/orders';
import './shipping.css';

const { Text } = Typography;
const { Step } = Steps;
const { Option } = Select;

class Shipping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredProvinces: [],
      filteredCities: [],
    };
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handleProvinceChange = this.handleProvinceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    if (this.props.profile.location) {
      if (this.props.profile.location.region) {
        this.setState({
          filteredProvinces: provinces.filter(pr =>
            pr.region === this.props.profile.location.region) || [],
        });
      }
      if (this.props.profile.location.province) {
        this.setState({
          filteredCities: cities.filter(pr =>
            pr.province === this.props.profile.location.province) || [],
        });
      }
    }
  }
  handleRegionChange = (e) => {
    this.setState({
      filteredProvinces: provinces.filter(pr => pr.region === e) || [],
      filteredCities: [],
    });
    this.props.form.setFieldsValue({ province: undefined });
    this.props.form.setFieldsValue({ city: undefined });
  }
  handleProvinceChange = (e) => {
    this.setState({ filteredCities: cities.filter(c => c.province === e) || [] });
    this.props.form.setFieldsValue({ city: undefined });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handleNewOrder(values);
      }
    });
  }
  render() {
    const { profile, cart, form } = this.props;
    const { products, tally, total } = cart;
    const { location } = profile;
    const { filteredProvinces, filteredCities } = this.state;
    const { getFieldDecorator } = form;
    return (
      <div className="shipping-container">
        {products.length > 0 ?
          <Row type="flex" align="top" justify="center">
            <Steps current={0} size="small" direction="horizontal" className="checkout-steps">
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
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={14} xxl={10} className="ship-info">
              <span id="ship-label"> Shipping Information </span>
              <Form onSubmit={this.handleSubmit} colon={false} className="acc-form">
                <span id="label"> Contact Information </span>
                <div className="del-add">
                  <Form.Item label="Mobile Number">
                    {getFieldDecorator('mobnum', {
                      initialValue: profile.mobile ? profile.mobile : undefined,
                      validateFirst: true,
                      rules: [
                        { required: true, message: 'Mobile number is missing.' },
                        { pattern: new RegExp(/^(09|\+639)\d{9}$/), message: 'Invalid mobile number' },
                      ],
                    })(<Input placeholder="e.g. 09215688208" />)}
                  </Form.Item>
                  <Form.Item label="Authorized Recipient (optional)">
                    {getFieldDecorator('recip', {
                      rules: [{ pattern: new RegExp(/^[\w\s]+\/((09|\+639)\d{9}$)/), message: 'Invalid format' }],
                    })(<Input placeholder="Cassie Mondragon/09213456799" />)}
                  </Form.Item>
                </div>
                <span id="label"> Delivery Address </span>
                <div className="del-add">
                  <div className="loc-container">
                    <Form.Item label="House/Unit/Bldg. #">
                      {getFieldDecorator('housenum', {
                        initialValue: profile.location ? profile.location.housenum : null,
                        rules: [{ required: true, message: 'House/Unit/Building # missing.' }],
                      })(<Input placeholder="e.g. 298 or 1112 1/F" />)}
                    </Form.Item>
                    <Form.Item label="Street">
                      {getFieldDecorator('street', {
                        initialValue: profile.location ? profile.location.street : null,
                        rules: [{ required: true, message: 'Street is missing.' }],
                      })(<Input placeholder="e.g. Yumul St." />)}
                    </Form.Item>
                    <Form.Item label="Barangay">
                      {getFieldDecorator('brgy', {
                        initialValue: profile.location ? profile.location.brgy : null,
                        rules: [{ required: true, message: 'Barangay is missing.' }],
                      })(<Input placeholder="e.g. Gomez" />)}
                    </Form.Item>
                  </div>
                  <Form.Item label="Region">
                    {getFieldDecorator('region', {
                      initialValue: profile.location ? profile.location.region : undefined,
                      rules: [{ required: true, message: 'Region is missing.' }],
                    })(<Select placeholder="Choose your region" onChange={this.handleRegionChange}>{ regions.map(r => <Option key={r.key} value={r.key}> {r.long} ({r.name}) </Option>)}</Select>)}
                  </Form.Item>
                  <Form.Item label="Province">
                    {getFieldDecorator('province', {
                      initialValue: profile.location ? profile.location.province : undefined,
                     rules: [{ required: true, message: 'Province is missing.' }],
                   })(<Select placeholder="Choose your province" onChange={this.handleProvinceChange} disabled={filteredProvinces.length === 0}>{ filteredProvinces.map(p => <Option key={p.name} value={p.key}> {p.name} </Option>) }</Select>)}
                  </Form.Item>
                  <Form.Item label="Town/City">
                    {getFieldDecorator('city', {
                      initialValue: profile.location ? profile.location.city : undefined,
                      rules: [{ required: true, message: 'City is missing.' }],
                    })(<Select showSearch disabled={filteredCities.length === 0} placeholder="Choose your city">{filteredCities.map(c => <Option key={c.name} value={c.name}> {c.name} </Option>)}</Select>)}
                  </Form.Item>
                  <Form.Item label="Landmarks">
                    {getFieldDecorator('landmarks', {
                      initialValue: profile.location ? profile.location.landmarks : undefined,
                      rules: [{ required: true, message: 'Landmarks missing.' }],
                    })(<Input.TextArea autosize={{ minRows: 2, max: 7 }} />)}
                  </Form.Item>
                  <Form.Item label="Set as my default address" >
                    {getFieldDecorator('asDefault', { valuePropName: 'checked' })(<Switch />)}
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="form-button">
                      Save & Proceed to Payment
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </Col>
          </Row>
          : <p> Cart is Empty </p>
        }
      </div>
    );
  }
}

Shipping.propTypes = {
  cart: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
  }).isRequired,
  profile: PropTypes.shape({
    location: PropTypes.shape({
      region: PropTypes.string,
      province: PropTypes.string,
    }).isRequired,
  }).isRequired,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    getFieldValue: PropTypes.func.isRequired,
    setFieldsValue: PropTypes.func.isRequired,
    validateFieldsAndScroll: PropTypes.func.isRequired,
  }).isRequired,
  handleNewOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { cart, user } = state;
  const { profile } = user;
  return { cart, profile };
};

const mapDispatchToProps = {
  handleNewOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Shipping));
