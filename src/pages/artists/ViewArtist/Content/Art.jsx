import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spin, Icon, Typography, Row, Col, Empty, List, Card, Button, Collapse, Radio, Pagination } from 'antd';
import { changeQueryArtist, changeQueryPage, changeQueryLimit, changeQueryType } from '../../../../ducks/products';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const { Text } = Typography;
const { Panel } = Collapse;

class Art extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
    };
    this.handleType = this.handleType.bind(this);
  }
  componentDidMount() {
    const { _id } = this.props.match.params;
    this.props.changeQueryArtist(_id);
  }
  handleType = (e) => {
    this.setState({ type: e.target.value });
    this.props.changeQueryType(e.target.value);
  }
  render() {
    const {
      isFetching,
      error,
      pagination,
      products,
      message,
    } = this.props.art;
    const isEmpty = products.length === 0;
    const ids = this.props.wishlist.map(w => w._id);
    const sections = [...new Set(products.map(i => i.artform))] || [];
    const { page, total, limit } = pagination;

    return (
      <div className="profile-art">
        {
          isFetching ?
            <Spin indicator={antIcon} style={{ position: 'relative', top: '50%' }} />
          : !error ?
              isEmpty ? <Empty /> :
                <Row className="profile-art-content">
                  <Col xs={24} sm={8} md={6} lg={6} xl={6} xxl={6} className="filterr">
                    <Collapse
                      bordered={false}
                      accordion
                      defaultActiveKey={['1']}
                      expandIconPosition="right"
                      className="art-collapse-filter"
                    >
                      <Panel header="Art Section" key="1" >
                        <Radio.Group className="radiotype" onChange={this.handleType} value={this.state.type}>
                          <Radio value=""> All Artworks </Radio>
                          {sections.map(s => <Radio key="s" value={s}> {s.charAt(0) + s.substring(1).toLowerCase()} </Radio>)}
                        </Radio.Group>
                      </Panel>
                    </Collapse>
                    <span id="page-info"> {page} - {total > limit ? limit : total} of {total} artworks </span>
                    <br />
                  </Col>
                  <Col xs={24} sm={16} md={18} lg={18} xl={18} xxl={18} className="col-items">
                    <List
                      loading={isFetching}
                      className="products artworks"
                      dataSource={products}
                      renderItem={info => (
                        <List.Item>
                          <Card
                            loading={isFetching}
                            className="art"
                            hoverable
                            size="small"
                            key={info._id}
                            cover={
                              <Link to={`/artworks/${info._id}`}>
                                <img alt="example" src={info.images[0].publicURL} style={{width: '100%'}} />
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
                    <Pagination
                      current={page}
                      total={total}
                      pageSize={limit}
                      // hideOnSinglePage
                      pageSizeOptions={['12', '24', '36', '48']}
                      showSizeChanger
                      onChange={p => this.props.changeQueryPage(p)}
                      onShowSizeChange={(_, size) => size !== limit ? this.props.changeQueryLimit(size) : null}
                    />
                  </Col>
                </Row>
          : <Text type="secondary"> {message} </Text>
        }
      </div>
    );
  }
}

Art.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  profile: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  changeQueryArtist: PropTypes.func.isRequired,
  art: PropTypes.shape({
    products: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
    })),
    pagination: PropTypes.shape({
      limit: PropTypes.number,
    }),
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    message: PropTypes.string,
  }).isRequired,
  changeQueryType: PropTypes.func.isRequired,
  changeQueryLimit: PropTypes.func.isRequired,
  changeQueryPage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { profile } = state.user;
  const { fetch } = state.product;
  const { wishlist } = state.wishlist;
  return { profile, art: fetch, wishlist };
};

const mapDispatchToProps = {
  changeQueryArtist,
  changeQueryType,
  changeQueryLimit,
  changeQueryPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Art);
