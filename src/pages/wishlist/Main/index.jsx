import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Typography,
  Breadcrumb,
  Card,
  Button,
  Icon,
  List,
  Row,
  Empty,
  Spin,
  Pagination,
} from 'antd';
import { updateWishlistRequest, fetchWishlistRequest, wishQueryPage, wishQueryLimit } from '../../../ducks/wishlist';
import { updateCartRequest } from '../../../ducks/cart';
import './main.css';

const { Text } = Typography;

class Main extends Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
    this.addToWishlist = this.addToWishlist.bind(this);
  }
  componentDidMount() {
    this.props.fetchWishlistRequest();
  }
  addToCart(prod) {
    const products = this.props.cart.products || [];
    if (!this.props.cart.products.some(i => i._id == prod._id)) {
      products.push(prod);
    }
    let val = parseInt(this.props.cart.tally[prod._id]) + 1 || 1;
    if (val > prod.quantity) val = 1;
    const tally = { id: prod._id, val };
    this.props.updateCartRequest(products, tally);
  }
  addToWishlist(_id) {
    let products = this.props.wishlist.wishlist.map(w => w._id) || [];
    if (products.includes(_id)) products = products.filter(p => p !== _id);
    else products.push(_id);
    this.props.updateWishlistRequest(products);
  }

  render() {
    const {
      isFetching,
      wishlist,
      total,
      page,
      limit,
    } = this.props.wishlist;
    const isEmpty = wishlist && wishlist.length === 0;
    const ids = wishlist ? wishlist.map(w => w._id) : [];
    return (
      <div className="products-main-container art-main-container">
        <div className="products-container art-container">
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item><Link to="/"><Icon type="home" /></Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/wishlist"> Wishlist </Link></Breadcrumb.Item>
          </Breadcrumb>
            {
              isFetching ?
                <Spin style={{ position: 'absolute', top: '50%', left: '50%'}} />
              :
              isEmpty ?
                <Empty />
              :
                <div>
                  <List
                    loading={isFetching}
                    className="wishlist artworks"
                    dataSource={wishlist}
                    renderItem={info => (
                      <List.Item>
                        <Card
                          loading={isFetching}
                          className="product artwork"
                          hoverable
                          size="small"
                          key={info._id}
                          cover={
                            <Link to={`/artworks/${info._id}`}>
                              <img
                                alt="example"
                                src={info.images[0].publicURL}
                              />
                            </Link>
                          }
                        >
                          <Link to={`/artworks/${info._id}`}>
                            <div>
                                <Text strong>{info.title}</Text><br />
                                <Text>By {info.artist.firstName} {info.artist.lastName}</Text>
                                <br />
                                <Text type="secondary">{info.dimensions.height}"x{info.dimensions.width}"x{info.dimensions.depth}</Text>
                                <br />
                            </div>
                          </Link>
                          <Row className="bottom-div" justify="space-between" type="flex">
                            <Link to={`/artworks/${info._id}`}>
                              <Text strong> PHP {info.price} </Text>
                            </Link>
                            <div className="actions">
                              <Button onClick={() => this.addToWishlist(info._id)} >
                                <Icon
                                  type="heart"
                                  style={{ color: ids.includes(info._id) ? '#CA0000' : 'inherit' }}
                                  theme={ids.includes(info._id) ? 'filled' : 'outlined'}
                                />
                              </Button>
                              <Button icon="shopping-cart" onClick={() => this.addToCart(info)} />
                            </div>
                          </Row>
                        </Card>
                      </List.Item>
                    )}
                  />
                  <Pagination
                    current={page}
                    total={total}
                    pageSize={limit}
                    hideOnSinglePage
                    pageSizeOptions={['12', '24', '36', '48']}
                    showSizeChanger
                    onChange={p => this.props.wishQueryPage(p)}
                    onShowSizeChange={(_, size) => size !== limit ? this.props.wishQueryLimit(size) : null}
                  />
                </div>
            }
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  fetchWishlistRequest: PropTypes.func.isRequired,
  updateWishlistRequest: PropTypes.func.isRequired,
  updateCartRequest: PropTypes.func.isRequired,
  wishQueryPage: PropTypes.func.isRequired,
  wishQueryLimit: PropTypes.func.isRequired,
  wishlist: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    total: PropTypes.number,
    page: PropTypes.number,
    limit: PropTypes.number,
    query: PropTypes.shape({
      limit: PropTypes.number,
      page: PropTypes.number,
    }),
    wishlist: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
    })),
  }).isRequired,
  cart: PropTypes.shape({
    products: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
    })),
  }),
};

const mapStateToProps = (state) => {
  const { wishlist, cart } = state;
  return { wishlist, cart };
};

const mapDispatchToProps = {
  fetchWishlistRequest,
  updateWishlistRequest,
  updateCartRequest,
  wishQueryLimit,
  wishQueryPage,
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
