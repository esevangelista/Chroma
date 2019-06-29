import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spin, Icon, Button, Drawer, Row, Col, Typography, Badge, Popconfirm, Empty } from 'antd';
import { fetchCartRequest, updateCartRequest } from '../../ducks/cart';
import './cart.css';

const { Text } = Typography;

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    this.props.fetchCartRequest();
  }
  toggleDrawer = () => {
    this.setState({ isVisible: !this.state.isVisible });
    this.props.fetchCartRequest();
  }
  removeItem = async (_id) => {
    const products = await this.props.products.filter(item => item._id !== _id);
    const tally = { id: _id, val: 0 };
    this.props.updateCartRequest(products, tally);
  }
  render() {
    const { isFetching, products, total, tally, quantity } = this.props;
    return (
      <div className="cart-container">
        <Button id="btn-drawer" onClick={this.toggleDrawer} >
          {
            isFetching || (products && products.length < 1) ?
              <Icon type="shopping" />
            :
              <Badge count={products.length}>
                <Icon type="shopping" />
              </Badge>
          }
        </Button>
        <Drawer
          className="cart-drawer"
          placement="left"
          onClose={this.toggleDrawer}
          visible={this.state.isVisible}
        >
          {
            !isFetching && products ?
              <div className="cart-loaded">
                <p id="title"> Your Shopping Cart </p>
                <div className="cart-content">
                  {
                    products.length === 0 ?
                      <Empty />
                    :
                      products.map(p =>
                        <Row className="item-container" type="flex" justify="space-between" align="middle" key={p._id}>
                          <Col span={7}>
                            <Link to={`/artworks/${p._id}`}>
                              <img className="thumbnail" src={p.images[0].publicURL} alt={p.title}/>
                            </Link>
                          </Col>
                          <Col span={7}>
                            <Link to={`/artworks/${p._id}`}>
                              <Text className="text"> {p.title} </Text><br />
                              <Text className="text" type="secondary">  {p.style} {p.artform}</Text>
                            </Link>
                          </Col>
                          <Col span={5}>
                            <Text strong className="text"> <span>&#8369;</span> {p.price} ({tally[p._id]}) </Text>
                          </Col>
                          <Col span={2}>
                            <Popconfirm
                              placement="topRight"
                              title="Are you sure remove this on your cart ?"
                              onConfirm={() => this.removeItem(p._id)}
                              onCancel={null}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button onClick={null} icon="delete" id="btn-del" />
                            </Popconfirm>
                          </Col>
                        </Row>
                      )
                  }
                </div>
                <div className="checkout-container">
                  <div className="checkout-info">
                    <Text className="label"> SUBTOTAL </Text>
                    <Text strong className="value"> <span>&#8369;</span> {total} </Text>
                  </div>
                  <Button id="btn-checkout" type="primary"> CHECKOUT </Button>
                </div>
              </div>
            : <Spin />
          }
        </Drawer>
      </div>
    );
  }
}

Cart.propTypes = {
  fetchCartRequest: PropTypes.func.isRequired,
  updateCartRequest: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
  })),
  total: PropTypes.number,
  quantity: PropTypes.number,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  message: PropTypes.string,
};
const mapStateToProps = state => state.cart;
const mapDispatchToProps = { fetchCartRequest, updateCartRequest };
export default connect(mapStateToProps, mapDispatchToProps)(Cart);

