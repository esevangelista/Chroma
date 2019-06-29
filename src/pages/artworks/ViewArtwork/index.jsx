import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton, Typography, Row, Col, Button, Icon, Breadcrumb, Select, Collapse } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SlideShow from 'react-image-show';
import { getActiveArtRequest } from '../../../ducks/artworks';
import { updateCartRequest } from '../../../ducks/cart';
import { updateWishlistRequest } from '../../../ducks/wishlist';

import './ViewArtwork.css';

const { Option } = Select;
const { Title, Text } = Typography;

class ViewArtwork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: 1,
    };
    this.qtyChange = this.qtyChange.bind(this);
    this.handleUpdateCart = this.handleUpdateCart.bind(this);
    this.handleAddToWishlist = this.handleAddToWishlist.bind(this);
  }
  componentDidMount() {
    this.props.getActiveArtRequest(this.props.match.params._id || this.props.activeArtwork._id);
  }
  qtyChange = value => this.setState({ qty: value });
  handleUpdateCart = async () => {
    const { activeArtwork, cart } = this.props;
    const products = cart.products || [];
    if (!cart.products.some(i => i._id == activeArtwork._id)) {
      await products.push(activeArtwork);
    }
    let val = parseInt(cart.tally[activeArtwork._id]) + this.state.qty || this.state.qty;
    if (val > activeArtwork.quantity) val = this.state.qty;
    const tally = { id: activeArtwork._id, val };
    this.props.updateCartRequest(products, tally);
  }

  handleAddToWishlist() {
    const { _id } = this.props.activeArtwork;
    let products = this.props.wishlist.map(w => w._id) || [];
    if (products.includes(_id)) products = products.filter(p => p !== _id);
    else products.push(_id);
    this.props.updateWishlistRequest(products);
  }
  render() {
    const { activeArtwork, isFetching } = this.props;
    const {
      images,
      title,
      artform,
      style,
      medium,
      subject,
      description,
      artist,
      dimensions,
      price,
      quantity,
    } = activeArtwork;
    const list = this.props.wishlist.map(w => w._id);
    return (
      <Skeleton loading={isFetching}>
        {
          activeArtwork && images ?
            <div className="active-art-container">
              <Breadcrumb className="routes">
                <Breadcrumb.Item>
                  <Link to="/"><Icon type="home" /></Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to="/artworks"> Artworks </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item> {artform} </Breadcrumb.Item>
                <Breadcrumb.Item> {title} </Breadcrumb.Item>
              </Breadcrumb>
              <Row className="content" type="flex" justify={"space-around"}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                  <SlideShow
                    width="100%"
                    images={images.map(i => i.publicURL)}
                    thumbnails={images.length > 1}
                    arrows={images.length > 1}
                    thumbnailsWidth="100%"
                    imagesWidth="100%"
                  />
                </Col>
                <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10} className="right-content">
                  <Title level={4} id="art-title"> {title} </Title>
                  <Text id="artist"> {artist.firstName} {artist.lastName} </Text> <br />
                  <Text> {artform} </Text> <br />
                  <Text> Size: {dimensions.height}H x {dimensions.width}W x {dimensions.depth} in</Text><br />
                  <br /><Text> Medium : {medium.map(m => <Text code key={m}> {m} </Text>)} </Text><br />
                  <Text> Style : {style} </Text><br />
                  <Text> Subject : {subject.map(s => <Text code key={s}> {s} </Text>)} </Text><br />
                  <br /><Text strong> Artwork Description </Text>
                  <br />
                  <div className="desc">
                    <Text> {description} </Text>
                  </div>
                  <br />
                  {
                    quantity > 1 ?
                      <Select
                        showSearch
                        value={this.state.qty}
                        onChange={this.qtyChange}
                      >
                        {
                          [...Array(quantity).keys()].map(i =>
                            <Option key={i} value={i + 1}> {i + 1} </Option>)
                        }
                      </Select>
                    : ''
                  }
                  <Text strong> PHP {price} </Text><br />
                  <div className="btn-actions">
                    <Button id="cart" icon="shopping" type="primary" loading={this.props.cart.isFetching} onClick={this.handleUpdateCart} >
                      Add to Cart
                    </Button>
                    <Button id="fav" icon="heart" onClick={this.handleAddToWishlist}>
                      {
                        list.includes(activeArtwork._id) ? 'Saved to wishlist' : 'Add to my wishlist'
                      }
                    </Button>
                  </div>
                  <Collapse accordion>
                  </Collapse>
                </Col>
              </Row>
            </div>
          : ''
        }
      </Skeleton>
    );
  }
}

ViewArtwork.propTypes = {
  activeArtwork: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  message: PropTypes.string,
  error: PropTypes.bool,
  getActiveArtRequest: PropTypes.func.isRequired,
  updateCartRequest: PropTypes.func.isRequired,
  updateWishlistRequest: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
const mapStateToProps = (state) => {
  const { active } = state.artworks;
  const { cart } = state;
  const { wishlist } = state.wishlist;
  return { ...active, cart, wishlist };
};
const mapDispatchToProps = { getActiveArtRequest, updateCartRequest,   updateWishlistRequest };
export default connect(mapStateToProps, mapDispatchToProps)(ViewArtwork);
