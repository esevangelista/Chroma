import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton, Typography, Row, Col, Button, Icon, Breadcrumb, Select, Collapse } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SlideShow from 'react-image-show';
import { getActiveArtRequest } from '../../../ducks/artworks';
import { updateCartRequest } from '../../../ducks/cart';
import { updateWishlistRequest } from '../../../ducks/wishlist';
import { handleLoginModal } from '../../../ducks/auth';

import './ViewArtwork.css';

const { Option } = Select;
const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

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
    window.scrollTo(0, 0);
  }
  qtyChange = value => this.setState({ qty: value });
  handleUpdateCart = async () => {
    const { profile } = this.props;
    if (profile && profile._id) {
      const { activeArtwork, cart } = this.props;
      const products = cart.products || [];
      if (!cart.products.some(i => i._id == activeArtwork._id)) {
        await products.push(activeArtwork);
      }
      let val = parseInt(cart.tally[activeArtwork._id]) + this.state.qty || this.state.qty;
      if (val > activeArtwork.quantity) val = this.state.qty;
      const tally = { id: activeArtwork._id, val };
      this.props.updateCartRequest(products, tally);
    } else this.props.handleLoginModal(true);
  }

  handleAddToWishlist() {
    const { profile } = this.props;
    if (profile && profile._id) {
      const { _id } = this.props.activeArtwork;
      let products = this.props.wishlist.map(w => w._id) || [];
      if (products.includes(_id)) products = products.filter(p => p !== _id);
      else products.push(_id);
      this.props.updateWishlistRequest(products);
    } else this.props.handleLoginModal(true);
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
      status,
      quantity,
    } = activeArtwork;
    const formattedDesc = description ? description.split('\n') : '';
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
              <Row className="content" type="flex" justify="space-around">
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
                  <Text id="form"> {artform} by </Text>
                  <Text id="artist"><Link to={`/artists/${artist._id}#art`} > {artist.firstName} {artist.lastName} </Link> </Text> <br />
                  <br />
                  <ul>
                    <li><Text> Size: {dimensions.height}H x {dimensions.width}W x {dimensions.depth} in</Text></li>
                    <li><Text> Style: {style} </Text></li>
                    <li><Text> Medium: {medium.map(m => <Text code key={m}> {m} </Text>)} </Text></li>
                    <li><Text> Subject: {subject.map(s => <Text code key={s}> {s} </Text>)} </Text></li>
                  </ul>
                  {
                    quantity > 1 ?
                      <div>
                        <Text id="qty-label"> QTY </Text>
                        <Select
                          showSearch
                          value={this.state.qty}
                          onChange={this.qtyChange}
                          id="qty-selector"
                        >
                          {
                            [...Array(quantity).keys()].map(i =>
                              <Option key={i} value={i + 1}> {i + 1} </Option>)
                          }
                        </Select>
                      </div>
                    : ''
                  }
                  <br /><Text strong id="price"> <span>&#8369;</span> {price} </Text><br />
                  <div className="btn-actions">
                    <Button disabled={status === 'SOLD' || (this.props.profile && this.props.profile._id && (artist._id === this.props.profile._id))} id="cart" icon="shopping" type="primary" loading={this.props.cart.isFetching} onClick={this.handleUpdateCart} >
                      Add to Cart
                    </Button>
                    <Button disabled={status === 'SOLD' || (this.props.profile && this.props.profile._id && (artist._id === this.props.profile._id))} id="fav" icon="heart" onClick={this.handleAddToWishlist} style={{ color: list.includes(activeArtwork._id) ? '#CA0000': '#828282' }}>
                      {
                        list.includes(activeArtwork._id) ? 'Saved to wishlist' : 'Add to my wishlist'
                      }
                    </Button>
                  </div>
                </Col>
              </Row>
              <Collapse
                className="more-info"
                bordered={false}
                defaultActiveKey={['1']}
                expandIconPosition="right"
                accordion
                expandIcon={({ isActive }) => <Icon type="down" rotate={isActive ? 180 : 0} />}
              >
                <Panel header="Artwork Description" key="1">
                  <div className="desc">
                    <Paragraph ellipsis={{ rows: 15, expandable: true }}>
                     {
                      formattedDesc.map(d => <span>{d}<br /></span>)
                     }
                    </Paragraph>
                  </div>
                  <br />
                </Panel>
                <Panel header="Shipping" key="2">
                  This artwork will be sold and shipped to you by
                  <Link to={`/artists/${artist._id}#art`}> {artist.firstName} {artist.lastName} </Link>.
                  The seller will be informing you of the tracking details once payment has been transferred and product has been shipped.
                </Panel>
                <Panel header="Returns and Refunds" key="3">
                  If you are not completely satisfied with your purchase you can
                  return it upon informing and discussing with the seller.
                  Returns and refunds shall be managed by the buyer and seller directly over chat or other preferred mode of communication.
                </Panel>
              </Collapse>
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
  handleLoginModal: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  profile: PropTypes.shape({
    _id: PropTypes.string,
  }),
};
const mapStateToProps = (state) => {
  const { active } = state.artworks;
  const { cart } = state;
  const { wishlist } = state.wishlist;
  const { profile } = state.user;
  return {
    ...active,
    cart,
    wishlist,
    profile,
  };
};
const mapDispatchToProps = {
  getActiveArtRequest,
  updateCartRequest,
  updateWishlistRequest,
  handleLoginModal,
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewArtwork);
