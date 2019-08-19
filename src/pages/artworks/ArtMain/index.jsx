import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Typography,
  Breadcrumb,
  Card,
  Tag,
  Input,
  Button,
  Icon,
  List,
  Collapse,
  Row,
  Col,
  Radio,
  Checkbox,
  Empty,
  Pagination,
  Spin,
} from 'antd';
import {
  getArtRequest,
  handleQueryType,
  handleQueryStyle,
  handleQueryMedium,
  handleQuerySubject,
  handleQueryPrice,
  handleQueryDimensions,
  handleQueryStatus,
  handleQueryTitle,
  handleQueryArtist,
  cleanFilter,
  handleActiveArtwork,
  handleQueryLimit,
  handleQueryPage,
} from '../../../ducks/artworks';
import { updateWishlistRequest } from '../../../ducks/wishlist';
import { updateCartRequest } from '../../../ducks/cart';
import { handleLoginModal } from '../../../ducks/auth';
import { styles, medium, moreMedium, subject, moreSubject, cbox } from '../../store/components/constant';
import './artworksMain.css';

const { Text } = Typography;
const { Search } = Input;
const { Panel } = Collapse;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class ArtMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seeMore: false,
      moreSubj: false,
      priceErr: false,
      minP: null,
      maxP: null,
      heightErr: false,
      widthErr: false,
      depthErr: false,
      minH: null,
      maxH: null,
      minW: null,
      maxW: null,
      minD: null,
      maxD: null,
      type: null,
      style: null,
      medium: [],
      subject: [],
    };
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleStyleChange = this.handleStyleChange.bind(this);
    this.seeMoreMedium = this.seeMoreMedium.bind(this);
    this.seeMoreSubject = this.seeMoreSubject.bind(this);
    this.handleMediumChange = this.handleMediumChange.bind(this);
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleClearFilters = this.handleClearFilters.bind(this);
    this.handleMinPrice = this.handleMinPrice.bind(this);
    this.handleMaxPrice = this.handleMaxPrice.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleMinHeight = this.handleMinHeight.bind(this);
    this.handleMaxHeight = this.handleMaxHeight.bind(this);
    this.handleMinWidth = this.handleMinWidth.bind(this);
    this.handleMaxWidth = this.handleMaxWidth.bind(this);
    this.handleMinDepth = this.handleMinDepth.bind(this);
    this.handleMaxDepth = this.handleMaxDepth.bind(this);
    this.handleHeightChange = this.handleHeightChange.bind(this);
    this.handleWidthChange = this.handleWidthChange.bind(this);
    this.handleDepthChange = this.handleDepthChange.bind(this);
    this.addToWishlist = this.addToWishlist.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentDidMount() {
    this.props.getArtRequest();
    window.scrollTo(0, 0);
  }
  seeMoreMedium() {
    this.setState({ seeMore: !this.state.seeMore });
  }
  seeMoreSubject() {
    this.setState({ moreSubj: !this.state.moreSubj });
  }

  handleTypeChange = (e) => {
    this.setState({ type: e.target.value });
    this.props.handleQueryType(e.target.value);
  }
  handleStyleChange = (e) => {
    this.setState({ style: e.target.value });
    this.props.handleQueryStyle(e.target.value);
  }
  handleMediumChange(values) {
    this.setState({ medium: values });
    this.props.handleQueryMedium(values);
  }
  handleSubjectChange(values) {
    this.setState({ subject: values });
    this.props.handleQuerySubject(values);
  }
  handleClearFilters() {
    this.setState({
      priceErr: false,
      minP: null,
      maxP: null,
      heightErr: false,
      minH: null,
      maxH: null,
      widthErr: false,
      minW: null,
      maxW: null,
      depthErr: null,
      minD: null,
      maxD: null,
      type: null,
      style: null,
      medium: [],
      subject: [],
    });
    this.props.cleanFilter();
  }
  async handleMinHeight(e) {
    await this.setState({ minH: e.target.value });
    const { minH } = this.state;
    if (isNaN(minH) || minH < 0) await this.setState({ heightErr: true });
    else await this.setState({ heightErr: false });
  }
  async handleMaxHeight(e) {
    await this.setState({ maxH: e.target.value });
    const { maxH } = this.state;
    if (isNaN(maxH) || maxH < 0) await this.setState({ heightErr: true });
    else await this.setState({ heightErr: false });
  }
  async handleHeightChange() {
    const {
      minH,
      maxH,
      minW,
      maxW,
      minD,
      maxD,
    } = this.state;
    if ((minH && maxH) && parseInt(minH) > parseInt(maxH)) await this.setState({ heightErr: true });
    else {
      await this.setState({ priceErr: false });
      this.props.handleQueryDimensions({
        minH,
        maxH,
        minW,
        maxW,
        minD,
        maxD,
      });
    }
  }
  async handleMinWidth(e) {
    await this.setState({ minW: e.target.value });
    const { minW } = this.state;
    if (isNaN(minW) || minW < 0) await this.setState({ widthErr: true });
    else await this.setState({ widthErr: false });
  }
  async handleMaxWidth(e) {
    await this.setState({ maxW: e.target.value });
    const { maxW } = this.state;
    if (isNaN(maxW) || maxW < 0) await this.setState({ widthErr: true });
    else await this.setState({ widthErr: false });
  }
  async handleWidthChange() {
    const {
      minH,
      maxH,
      minW,
      maxW,
      minD,
      maxD,
    } = this.state;
    if ((minW && maxW) && parseInt(minW) > parseInt(maxW)) await this.setState({ widthErr: true });
    else {
      await this.setState({ widthErr: false });
      this.props.handleQueryDimensions({
        minH,
        maxH,
        minW,
        maxW,
        minD,
        maxD,
      });
    }
  }
  async handleMinDepth(e) {
    await this.setState({ minD: e.target.value });
    const { minD } = this.state;
    if (isNaN(minD) || minD < 0) await this.setState({ depthErr: true });
    else await this.setState({ depthErr: false });
  }
  async handleMaxDepth(e) {
    await this.setState({ maxD: e.target.value });
    const { maxD } = this.state;
    if (isNaN(maxD) || maxD < 0) await this.setState({ depthErr: true });
    else await this.setState({ depthErr: false });
  }
  async handleDepthChange() {
    const {
      minH,
      maxH,
      minW,
      maxW,
      minD,
      maxD,
    } = this.state;
    if ((minD && maxD) && parseInt(minD) > parseInt(maxD)) await this.setState({ depthErr: true });
    else {
      await this.setState({ depthErr: false });
      this.props.handleQueryDimensions({
        minH,
        maxH,
        minW,
        maxW,
        minD,
        maxD,
      });
    }
  }

  async handleMinPrice(e) {
    const minPrice = e.target.value;
    await this.setState({ minP: minPrice });
    if (isNaN(minPrice) || minPrice < 0) await this.setState({ priceErr: true });
    else await this.setState({ priceErr: false });
  }
  async handleMaxPrice(e) {
    const maxPrice = e.target.value;
    await this.setState({ maxP: maxPrice });
    if (isNaN(maxPrice) || maxPrice < 0) await this.setState({ priceErr: true });
    else await this.setState({ priceErr: false });
  }
  async handlePriceChange() {
    const { minP, maxP } = this.state;
    if ((minP && maxP && parseInt(minP) > parseInt(maxP)) === true) await this.setState({ priceErr: true });
    else {
      await this.setState({ priceErr: false });
      this.props.handleQueryPrice({ minP, maxP });
    }
  }

  addToWishlist = async (_id) => {
    const { profile } = this.props;
    if (profile && profile._id) {
      let products = await this.props.wishlist.map(w => w._id) || [];
      if (products.includes(_id)) products = await products.filter(p => p !== _id);
      else await products.push(_id);
      this.props.updateWishlistRequest(products);
    } else this.props.handleLoginModal(true);
  }
  handleAddToCart(prod) {
    const { profile } = this.props;
    if (profile && profile._id) {
      const products = this.props.cart.products || [];
      if (!this.props.cart.products.some(i => i._id == prod._id)) {
        products.push(prod);
      }
      let val = parseInt(this.props.cart.tally[prod._id]) + 1 || 1;
      if (val > prod.quantity) val = 1;
      const tally = { id: prod._id, val };
      this.props.updateCartRequest(products, tally);
    } else this.props.handleLoginModal(true);
  }
  render() {
    const {
      seeMore,
      moreSubj,
      priceErr,
      heightErr,
      widthErr,
      depthErr,
    } = this.state;
    const { isFetching, artworks } = this.props;
    const isEmpty = artworks.length === 0;
    const tags = (query) => {
      if (query) {
        const arr = [];
        const {
          title,
          artform,
          style,
          subject,
          medium,
          minPrice,
          maxPrice,
          minHeight,
          maxHeight,
          minWidth,
          maxWidth,
          minDepth,
          maxDepth,
        } = this.props.query;
        if (title) arr.push(title);
        if (artform) arr.push(artform);
        if (style) arr.push(style);
        if (medium) medium.map(m => arr.push(m));
        if (subject) subject.map(s => arr.push(s));
        if (minPrice && !maxPrice) arr.push(`Min Price: ${minPrice}`);
        if (maxPrice && !minPrice) arr.push(`Max Price: ${maxPrice}`);
        if (minPrice && maxPrice) arr.push(`Price: ${minPrice} - ${maxPrice}`);
        if (minHeight && !maxHeight) arr.push(`Min Height: ${minHeight}`);
        if (maxHeight && !minHeight) arr.push(`Max Height: ${maxHeight}`);
        if (minHeight && maxHeight) arr.push(`Height: ${minHeight} - ${maxHeight}`);
        if (minWidth && !maxWidth) arr.push(`Min Width: ${minWidth}`);
        if (maxWidth && !minWidth) arr.push(`Max Width: ${maxWidth}`);
        if (minWidth && maxWidth) arr.push(`Width: ${minWidth} - ${maxWidth}`);
        if (minDepth && !maxDepth) arr.push(`Min Depth: ${minDepth}`);
        if (maxDepth && !minDepth) arr.push(`Max Depth: ${maxDepth}`);
        if (minDepth && maxDepth) arr.push(`Depth: ${minDepth} - ${maxDepth}`);
        return arr;
      }
      return '';
    };
    const ids = this.props.wishlist.map(w => w._id);
    const { total, page, limit } = this.props.pagination;
    return (
      <div>
        {
          isFetching ? <Spin className="loader" indicator={antIcon} style={{ position: 'absolute', top: '50%', left: '50%' }} /> :
          <div className="products-main-container art-main-container">
            <div className="products-container art-container">
              <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item><Link to="/"><Icon type="home" /></Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/artworks"> Artworks </Link></Breadcrumb.Item>
                {
                  this.props.query && this.props.query.artform ?
                    <Breadcrumb.Item> {this.props.query.artform} </Breadcrumb.Item>
                  : <Breadcrumb.Item> All Artworks </Breadcrumb.Item>
                }
              </Breadcrumb>
              <Search className="search" placeholder="Search for title or keywords of an artwork" onSearch={value => this.props.handleQueryTitle(value)} allowClear enterButton />
              {
                tags(this.props.query).map(t => <Tag key={t} className="search-tags"> {t} </Tag>)
              }
              <Row className="filter-content">
                <Col xs={24} sm={24} md={24} lg={24} xl={6} xxl={6}>
                  <Collapse
                    bordered={false}
                    defaultActiveKey={['1']}
                    expandIconPosition="right"
                    accordion
                    className="collapse-filter"
                    expandIcon={({ isActive }) => <Icon type="down" rotate={isActive ? 180 : 0} />}
                  >
                    <Panel header="Filters" key="1" className="filter-panel">
                      <Collapse
                        bordered={false}
                        expandIconPosition="right"
                        accordion
                        className="collapse-inner"
                        expandIcon={({ isActive }) => <Icon type="caret-down" rotate={isActive ? 180 : 0} />}
                      >
                        <Panel header="TYPE" key="1">
                          <Radio.Group className="radio-type" onChange={this.handleTypeChange} value={this.state.type}>
                            <Radio value="PAINTING"> Painting</Radio>
                            <Radio value="PRINT"> Print </Radio>
                            <Radio value="DRAWING"> Drawing </Radio>
                            <Radio value="DIGITAL ART"> Digital Art </Radio>
                            <Radio value="PHOTOGRAPHY"> Photography </Radio>
                            <Radio value="SCULPTURE"> Sculpture </Radio>
                          </Radio.Group>
                        </Panel>
                        <Panel header="STYLE" key="2">
                          <Radio.Group className="radio-type" onChange={this.handleStyleChange} value={this.state.style}>
                            {
                              styles.map(styl =>
                                <Radio key={styl} value={styl.toUpperCase()}> {styl} </Radio>)
                            }
                          </Radio.Group>
                        </Panel>
                        <Panel header="MEDIUM" key="3">
                          <Checkbox.Group
                            options={seeMore ? cbox([...medium, ...moreMedium]) : cbox(medium)}
                            className="checkbox-type"
                            onChange={this.handleMediumChange}
                            value={this.state.medium}
                          />
                          {
                            seeMore ?
                              <a onClick={this.seeMoreMedium}> Less Options </a>
                            : <a onClick={this.seeMoreMedium}> More Options </a>
                          }
                        </Panel>
                        <Panel header="SUBJECT" key="4">
                          <Checkbox.Group
                            options={moreSubj ? cbox([...subject, ...moreSubject]) : cbox(subject)}
                            className="checkbox-type"
                            onChange={this.handleSubjectChange}
                            value={this.state.subject}
                          />
                          {
                            moreSubj ?
                              <a onClick={this.seeMoreSubject}> Less Options </a>
                            : <a onClick={this.seeMoreSubject}> More Options </a>
                          }
                        </Panel>
                        <Panel header="PRICE" key="5">
                          <Input.Group compact className="input-price">
                            <div className="price-range">
                              <Input placeholder="MIN" onChange={this.handleMinPrice} onPressEnter={this.handlePriceChange} value={this.state.minP} />
                              <Text type="secondary"> ~ </Text>
                              <Input placeholder="MAX" onChange={this.handleMaxPrice} onPressEnter={this.handlePriceChange} value={this.state.maxP} />
                            </div>
                            {
                              priceErr ?
                                <Text type="danger"> Price must be a valid range of amount </Text>
                              : ''
                            }
                          </Input.Group>
                        </Panel>
                        <Panel header="SIZE" key="6">
                          <Input.Group compact className="input-price">
                            <Text className="dimension-label"> HEIGHT (inches) </Text>
                            <div className="price-range">
                              <Input placeholder="MIN" onChange={this.handleMinHeight} onPressEnter={this.handleHeightChange} value={this.state.minH} />
                              <Text type="secondary"> ~ </Text>
                              <Input placeholder="MAX" onChange={this.handleMaxHeight} onPressEnter={this.handleHeightChange}value={this.state.maxH} />
                            </div>
                            {
                              heightErr ?
                                <Text type="danger"> Height range must be valid.  </Text>
                              : ''
                            }
                          </Input.Group>
                          <Input.Group compact className="input-price">
                            <Text className="dimension-label"> WIDTH (inches) </Text>
                            <div className="price-range">
                              <Input placeholder="MIN" onChange={this.handleMinWidth} onPressEnter={this.handleWidthChange} value={this.state.minW} />
                              <Text type="secondary"> ~ </Text>
                              <Input placeholder="MAX" onChange={this.handleMaxWidth} onPressEnter={this.handleWidthChange} value={this.state.maxW} />
                            </div>
                            {
                              widthErr ?
                                <Text type="danger"> Width range must be valid.  </Text>
                              : ''
                            }
                          </Input.Group>
                          <Input.Group compact className="input-price">
                            <Text className="dimension-label"> DEPTH (inches) </Text>
                            <div className="price-range">
                              <Input placeholder="MIN" onChange={this.handleMinDepth} onPressEnter={this.handleDepthChange} value={this.state.minD} />
                              <Text type="secondary"> ~ </Text>
                              <Input placeholder="MAX" onChange={this.handleMaxDepth} onPressEnter={this.handleDepthChange} value={this.state.maxD} />
                            </div>
                            {
                              depthErr ?
                                <Text type="danger"> Depth range must be valid.  </Text>
                              : ''
                            }
                          </Input.Group>
                        </Panel>
                      </Collapse>
                      <a className="clear" onClick={this.handleClearFilters}> Clear Filters</a>
                    </Panel>
                  </Collapse>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18} className="col-items">
                  {
                    isEmpty ?
                      <Empty />
                    :
                      <List
                        loading={isFetching}
                        className="products artworks"
                        dataSource={artworks}
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
                                    style={{ width: '100%' }}
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
                                  <Button disabled={(info.status === 'SOLD') || (this.props.profile && this.props.profile._id && (info.artist._id == this.props.profile._id))} onClick={() => this.addToWishlist(info._id)} >
                                    <Icon
                                      type="heart"
                                      style={{ color: ids.includes(info._id) ? '#CA0000' : 'inherit' }}
                                      theme={ids.includes(info._id) ? 'filled' : 'outlined'}
                                    />
                                  </Button>
                                  <Button disabled={(info.status === 'SOLD') || (this.props.profile && this.props.profile._id && (info.artist._id == this.props.profile._id))} icon="shopping-cart" onClick={() => this.handleAddToCart(info)} />
                                </div>
                              </Row>
                            </Card>
                          </List.Item>
                        )}
                      />
                  }
                </Col>
              </Row>
            </div>
            <Pagination
              current={page}
              total={total}
              pageSize={limit}
              hideOnSinglePage
              pageSizeOptions={['12', '24', '36', '48']}
              showSizeChanger
              onChange={p => this.props.handleQueryPage(p)}
              onShowSizeChange={(_, size) => size !== limit ? this.props.handleQueryLimit(size) : null}
            />
          </div>
        }
      </div>
    );
  }
}

ArtMain.propTypes = {
  artworks: PropTypes.arrayOf(PropTypes.object),
  pagination: PropTypes.shape({
    page: PropTypes.number,
    total: PropTypes.number,
    pages: PropTypes.number,
    limit: PropTypes.number,
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  query: PropTypes.any.isRequired,
  getArtRequest: PropTypes.func.isRequired,
  handleQueryType: PropTypes.func.isRequired,
  handleQueryStyle: PropTypes.func.isRequired,
  handleQueryMedium: PropTypes.func.isRequired,
  handleQuerySubject: PropTypes.func.isRequired,
  handleQueryPrice: PropTypes.func.isRequired,
  handleQueryDimensions: PropTypes.func.isRequired,
  handleQueryTitle: PropTypes.func.isRequired,
  handleQueryArtist: PropTypes.func.isRequired,
  handleQueryLimit: PropTypes.func.isRequired,
  handleQueryPage: PropTypes.func.isRequired,
  cleanFilter: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    _id: PropTypes.string,
  }),
  handleActiveArtwork: PropTypes.func.isRequired,
  updateWishlistRequest: PropTypes.func.isRequired,
  updateCartRequest: PropTypes.func.isRequired,
  handleLoginModal: PropTypes.func.isRequired,
  activeArtwork: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
  wishlist: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
  })),
  cart: PropTypes.shape({
    products: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
    })),
  }),
};

ArtMain.defaultProps = {
  artworks: [],
};
const mapStateToProps = (state) => {
  const { fetch, active } = state.artworks;
  const { activeArtwork } = active;
  const { profile } = state.user;
  const { wishlist } = state.wishlist;
  const { location } = state.router;
  const { cart } = state;
  return {
    ...fetch,
    activeArtwork,
    profile,
    wishlist,
    cart,
    location,
  };
};

const mapDispatchToProps = {
  getArtRequest,
  handleQueryType,
  handleQueryStyle,
  handleQueryMedium,
  handleQuerySubject,
  handleQueryPrice,
  handleQueryDimensions,
  handleQueryStatus,
  handleQueryTitle,
  handleQueryArtist,
  handleQueryLimit,
  handleQueryPage,
  cleanFilter,
  handleActiveArtwork,
  updateWishlistRequest,
  updateCartRequest,
  handleLoginModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtMain);
