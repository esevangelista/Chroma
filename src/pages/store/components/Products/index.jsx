import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Typography,
  Card,
  Modal,
  Tag,
  Input,
  Button,
  Icon,
  List,
  Drawer,
  Collapse,
  Row,
  Col,
  Spin,
  Radio,
  Checkbox,
  Empty,
  Pagination,
  Breadcrumb,
} from 'antd';
import {
  fetchArtRequest,
  changeQueryType,
  changeQueryStyle,
  changeQueryMedium,
  changeQuerySubject,
  changeQueryPrice,
  changeQueryDimensions,
  changeQueryStatus,
  changeQueryTitle,
  changeQueryArtist,
  clearFilter,
  changeActiveProduct,
  updateDrawer,
  changeQueryLimit,
  changeQueryPage,
} from '../../../../ducks/products';
import ListArtwork from './ListArtwork/';
import ViewProduct from './ViewProduct/';
import { styles, medium, moreMedium, subject, moreSubject, cbox } from '../constant';
import './Products.css';

const { Text } = Typography;
const { Search } = Input;
const { Panel } = Collapse;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddDrawer: false,
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
    this.toggleAddDrawer = this.toggleAddDrawer.bind(this);
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
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.closeCardModal = this.closeCardModal.bind(this);
  }

  componentDidMount() {
    this.props.changeQueryArtist(this.props.profile._id);
  }
  closeCardModal() {
    this.props.changeActiveProduct({});
  }
  toggleAddDrawer() {
    this.setState({ showAddDrawer: !this.state.showAddDrawer });
  }
  seeMoreMedium() {
    this.setState({ seeMore: !this.state.seeMore });
  }
  seeMoreSubject() {
    this.setState({ moreSubj: !this.state.moreSubj });
  }

  handleTypeChange = (e) => {
    this.setState({ type: e.target.value });
    this.props.changeQueryType(e.target.value);
  }
  handleStyleChange = (e) => {
    this.setState({ style: e.target.value });
    this.props.changeQueryStyle(e.target.value);
  }
  handleStatusChange(values) {
    this.props.changeQueryStatus(values);
  }
  handleMediumChange(values) {
    this.setState({ medium: values });
    this.props.changeQueryMedium(values);
  }
  handleSubjectChange(values) {
    this.setState({ subject: values });
    this.props.changeQuerySubject(values);
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
    this.props.clearFilter();
    this.props.changeQueryArtist(this.props.profile._id);
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
      this.props.changeQueryDimensions({
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
      this.props.changeQueryDimensions({
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
      this.props.changeQueryDimensions({
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
    if ((minP && maxP) && parseInt(minP) > parseInt(maxP)) await this.setState({ priceErr: true });
    else {
      await this.setState({ priceErr: false });
      this.props.changeQueryPrice({ minP, maxP });
    }
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
    const { isFetching, products } = this.props;
    const isEmpty = products.length === 0;
    const tags = (query) => {
      if (query) {
        const arr = [];
        const {
          title,
          artform,
          style,
          subject,
          medium,
          status,
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
        if (status) status.map(st => arr.push(st));
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
    const { total, page, limit } = this.props.pagination;
    return (
      <div>
          <div className="products-main-container">
            <div className="products-container this">
              <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item><Link to="/my-store/overview"><Icon type="shop" /></Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/my-store/products"> My Artworks </Link></Breadcrumb.Item>
                {
                  this.props.query && this.props.query.artform ?
                    <Breadcrumb.Item> {this.props.query.artform} </Breadcrumb.Item>
                  : <Breadcrumb.Item> All  </Breadcrumb.Item>
                }
              </Breadcrumb>
              <Search className="search" placeholder="Search for title or keywords of an artwork" onSearch={value => this.props.changeQueryTitle(value)} allowClear enterButton />
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
                              <Input placeholder="MAX" onChange={this.handleMaxHeight} onPressEnter={this.handleHeightChange} value={this.state.maxH} />
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
                        <Panel header="STATUS" key="7">
                          <Checkbox.Group
                            options={['AVAILABLE', 'SOLD', 'HIDDEN']}
                            className="checkbox-type"
                            onChange={this.handleStatusChange}
                          />
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
                        className="products"
                        dataSource={products}
                        renderItem={info => (
                          <List.Item>
                            <Card
                              loading={isFetching}
                              className="product"
                              hoverable
                              onClick={() => {this.props.changeActiveProduct(info)}}
                              size="small"
                              key={info._id}
                              cover={
                                <img
                                  alt="example"
                                  src={info.images[0].publicURL}
                                />
                              }
                            >
                              <Text strong>{info.title}</Text>
                              <br />
                              <Text type="secondary">{info.dimensions.height}"x{info.dimensions.width}"x{info.dimensions.depth}</Text>
                              <br />
                              <Text type="secondary">{info.artform}</Text>
                              <br />
                              <Text strong> PHP {info.price} </Text>
                            </Card>
                          </List.Item>
                        )}
                      />
                  }
                </Col>
              </Row>
            </div>
            <Button className="btn-afx" icon="plus" shape="circle" onClick={this.toggleAddDrawer} />
            <Pagination
              current={page}
              total={total}
              pageSize={limit}
              hideOnSinglePage
              pageSizeOptions={['12', '24', '36', '48']}
              showSizeChanger
              onChange={p => this.props.changeQueryPage(p)}
              onShowSizeChange={(_, size) => size !== limit ? this.props.changeQueryLimit(size) : null}
            />
            <Drawer
              className="list-art-drawer"
              title="List an Artwork"
              visible={this.state.showAddDrawer}
              onClose={this.toggleAddDrawer}
              destroyOnClose
              closable
            >
              <ListArtwork />
            </Drawer>
            <Modal
              className="active-product-modal"
              visible={this.props.activeProduct._id !== undefined}
              footer={null}
              onCancel={this.closeCardModal}
              destroyOnClose
            >
              <ViewProduct />
            </Modal>
            <Drawer
              className="list-art-drawer"
              title="Update Artwork"
              visible={this.props.update.selectedProduct._id !== undefined}
              onClose={() => this.props.updateDrawer({})}
              destroyOnClose
              closable
            >
              <ListArtwork isUpdate />
            </Drawer>
        </div>
      </div>
    );
  }
}

Products.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
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
  changeQueryType: PropTypes.func.isRequired,
  changeQueryStyle: PropTypes.func.isRequired,
  changeQueryMedium: PropTypes.func.isRequired,
  changeQuerySubject: PropTypes.func.isRequired,
  changeQueryPrice: PropTypes.func.isRequired,
  changeQueryDimensions: PropTypes.func.isRequired,
  changeQueryStatus: PropTypes.func.isRequired,
  changeQueryTitle: PropTypes.func.isRequired,
  changeQueryArtist: PropTypes.func.isRequired,
  changeQueryLimit: PropTypes.func.isRequired,
  changeQueryPage: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  changeActiveProduct: PropTypes.func.isRequired,
  activeProduct: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
  update: PropTypes.shape({
    selectedProduct: PropTypes.shape({
      _id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  updateDrawer: PropTypes.func.isRequired,
};

Products.defaultProps = {
  products: [],
};
const mapStateToProps = (state) => {
  const { fetch, update } = state.product;
  const { profile } = state.user;
  return { ...fetch, update, profile };
};

const mapDispatchToProps = {
  fetchArtRequest,
  changeQueryType,
  changeQueryStyle,
  changeQueryMedium,
  changeQuerySubject,
  changeQueryPrice,
  changeQueryDimensions,
  changeQueryStatus,
  changeQueryTitle,
  changeQueryArtist,
  changeQueryLimit,
  changeQueryPage,
  clearFilter,
  changeActiveProduct,
  updateDrawer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
