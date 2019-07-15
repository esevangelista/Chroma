import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Typography,
  Rate,
  Breadcrumb,
  Card,
  Input,
  Icon,
  Collapse,
  Row,
  Col,
  Empty,
  Pagination,
  Select,
  Spin,
  Avatar,
} from 'antd';
import { regions, provinces, cities } from 'philippines';
import {
  fetchArtistsRequest,
  handleQueryName,
  handleQueryPage,
  handleQueryLimit,
  artistQueryRate,
  artistQueryLocation,
  artistQueryArtType,
  artistClearQuery,
} from '../../../ducks/artists';
import './main.css';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const { Search } = Input;
const { Text } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

const loc = (location) => {
  if (location) {
    if (location.region) {
      if (location.province) {
        if (location.city) {
          const pr = provinces.filter(p => p.key === location.province)[0];
          return `${location.city}, ${pr.name}`;
        }
        return `${location.province},${location.region}`;
      }
      return regions.filter(r => r.key === location.region)[0].long;
    }
  }
  return null;
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      filteredProvinces: [],
      filteredCities: [],
    };
    this.searchChange = this.searchChange.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handleProvinceChange = this.handleProvinceChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchArtistsRequest();
    if (this.props.query) {
      if (this.props.query.region) {
        this.setState({
          filteredProvinces: provinces.filter(pr =>
            pr.region === this.props.query.region),
          filteredCities: cities.filter(pr =>
            pr.province === this.props.query.province),
        });
      } else this.setState({ filteredCities: cities, filteredProvinces: provinces });
    } else this.setState({ filteredCities: cities, filteredProvinces: provinces });
  }
  handleProvinceChange = (e) => {
    const province = provinces.filter(p => p.name === e)[0];
    this.setState({ filteredCities: cities.filter(c => c.province === province.key) });
    this.props.artistQueryLocation({
      region: regions.filter(r => r.key === province.region)[0].key,
      province: province.key,
      city: '',
    });
  }
  handleCityChange = (e) => {
    const [city, province] = e.split('+');
    const prov = provinces.filter(p => p.key === province)[0];
    this.props.artistQueryLocation({
      region: prov.region,
      province,
      city,
    });
  }
  handleRegionChange = (e) => {
    this.setState({ filteredProvinces: provinces.filter(p => p.region === e) });
    this.props.artistQueryLocation({
      region: e,
      province: '',
      city: '',
    });
  }
  searchChange = e => this.setState({ search: e.target.value });
  render() {
    const { isFetching, query, artists } = this.props;
    const { filteredCities, filteredProvinces } = this.state;
    const { page, total, limit } = this.props.pagination;
    const isNotEmpty = artists && artists.length > 0;
    const formatProvince = query.province && query.province.length >= 1 ? provinces.filter(p => p.key === query.province)[0].name : '';
    const colProps = a => a.artworks.length === 0 ? { xs: 24, md: 14, xl: 10 } : { xs: 24, sm: 12, md: 14, xl: 12 };
    return (
      <div className="products-main-container">
        {
          isFetching ? <Spin className="loader" indicator={antIcon} style={{ position: 'absolute', top: '50%', left: '50%' }} /> :
          <div className="products-container artists-container">
            <Breadcrumb className="paths">
              <Breadcrumb.Item><Link to="/"><Icon type="home" /></Link></Breadcrumb.Item>
              <Breadcrumb.Item><Link to="/artists"> Artists </Link></Breadcrumb.Item>
            </Breadcrumb>
            <Search className="search" placeholder="ex. John" onSearch={name => this.props.handleQueryName(name)} onChange={this.searchChange} value={this.state.search} allowClear enterButton />
            <Row className="content">
              <Col xs={24} sm={24} md={8} lg={6} xl={6} xxl={6} className="col-filters">
                <div className="rating">
                  <span id="rate"> Rating </span>
                  <Rate allowClear value={query.rate || 0} onChange={(rate) => this.props.artistQueryRate(rate)} />
                </div>
                <div className="location">
                  <span id="region"> Region </span>
                  <Select size="small" onSelect={this.handleRegionChange} defaultValue={query.region} >
                    {regions.map(r => <Option key={r.key} value={r.key}> {r.long} ({r.name}) </Option>)}
                  </Select>
                  <span id="province"> Province/Area </span>
                  <Select size="small" showSearch defaultValue={formatProvince} onSelect={this.handleProvinceChange}>
                    {filteredProvinces.map(p => <Option key={p.name} value={p.name}> {p.name} </Option>)}
                  </Select>
                  <span id="city"> City/Town </span>
                  <Select size="small" showSearch defaultValue={query.city} onSelect={this.handleCityChange}>
                    {filteredCities.map(c => <Option key={`${c.name}${c.province}`} value={`${c.name}+${c.province}`}> {c.name} ({c.province}) </Option>)}
                  </Select>
                </div>
                <div className="category">
                  <span id="artform"> Art Category </span>
                  <Select size="small" defaultValue={query.artform} onSelect={(value) => this.props.artistQueryArtType(value)} >
                    <Option value="ANY"> Any </Option>
                    <Option value="PAINTING"> Painting </Option>
                    <Option value="PHOTOGRAPHY"> Photography </Option>
                    <Option value="DRAWING"> Drawing </Option>
                    <Option value="SCULPTURE"> Sculpture </Option>
                    <Option value="PRINT"> Print </Option>
                    <Option value="COLLAGE"> Collage </Option>
                    <Option value="DIGITAL ART"> Digital Art </Option>
                  </Select>
                </div>
                <span id="clear-btn" onClick={() => this.props.artistClearQuery()}> Clear Filters </span>
              </Col>
              <Col xs={24} sm={24} md={8} lg={6} xl={6} xxl={6} className="col-filters-mobile">
                <Collapse
                  bordered={false}
                  defaultActiveKey={['1']}
                  expandIconPosition="right"
                  accordion
                  className="collapse-mobile"
                  expandIcon={({ isActive }) => isActive ? <Icon type="minus" /> : <Icon type="plus" /> }
                >
                  <Panel header="Filters" key="1">
                    <div className="rating">
                      <span id="rate"> Rating </span>
                      <Rate allowClear value={query.rate || 0} onChange={(rate) => this.props.artistQueryRate(rate)} />
                    </div>
                    <div className="location">
                      <span id="region"> Region </span>
                      <Select size="small" onSelect={this.handleRegionChange} defaultValue={query.region} >
                        {regions.map(r => <Option key={r.key} value={r.key}> {r.long} ({r.name}) </Option>)}
                      </Select>
                      <span id="province"> Province/Area </span>
                      <Select size="small" showSearch defaultValue={formatProvince} onSelect={this.handleProvinceChange}>
                        {filteredProvinces.map(p => <Option key={p.name} value={p.name}> {p.name} </Option>)}
                      </Select>
                      <span id="city"> City/Town </span>
                      <Select size="small" showSearch defaultValue={query.city} onSelect={this.handleCityChange}>
                        {filteredCities.map(c => <Option key={`${c.name}${c.province}`} value={`${c.name}+${c.province}`}> {c.name} ({c.province}) </Option>)}
                      </Select>
                    </div>
                    <div className="category">
                      <span id="artform"> Art Category </span>
                      <Select size="small" defaultValue={query.artform} onSelect={(value) => this.props.artistQueryArtType(value)} >
                        <Option value="ANY"> Any </Option>
                        <Option value="PAINTING"> Painting </Option>
                        <Option value="PHOTOGRAPHY"> Photography </Option>
                        <Option value="DRAWING"> Drawing </Option>
                        <Option value="SCULPTURE"> Sculpture </Option>
                        <Option value="PRINT"> Print </Option>
                        <Option value="COLLAGE"> Collage </Option>
                        <Option value="DIGITAL ART"> Digital Art </Option>
                      </Select>
                    </div>
                    <span id="clear-btn" onClick={() => this.props.artistClearQuery()}> Clear Filters </span>
                </Panel>
              </Collapse>
              </Col>
              <Col xs={24} sm={24} md={16} lg={18} xl={18} xxl={18} className="col-artist">
                {
                  isNotEmpty ?
                    artists.map(artist => (
                      <Card
                        loading={isFetching}
                        hoverable
                        size="small"
                        key={artist._id}
                        className="artist-card"
                        onClick={() => this.props.history.push(`/artists/${artist._id}`)}
                      >
                        <Row type="flex" justify="start" className="avatar-container">
                          <Col {...colProps(artist)} className="info" >
                            <Link to={`/artists/${artist._id}`}>
                              {artist.image ? <Avatar src={artist.image.publicURL} size={60} />
                              : <Avatar size={60} style={{ fontSize: '40px', color: 'white', backgroundColor: '#CA0000' }}>{artist.firstName.charAt(0).toUpperCase()}</Avatar>}  
                            </Link>
                            <div className="brief-info">
                              <span id="name"> {artist.firstName} {artist.lastName}</span><br />
                              {loc(artist.location) ? <span id="location"><Icon type="environment" theme="filled" /> {loc(artist.location)} </span> : ''}
                            </div>
                          </Col>
                          {
                            artist.artworks.length !== 0 ?
                              <Col xs={24} sm={12} md={10} xl={12} className="artwork-panel">
                                {artist.artworks.map(i => <div key={i._id} className="arts" style={{ background: `url(${i.images[0].publicURL})` }}/>)}
                              </Col>
                            :
                              <Col xs={24} md={8} xl={5} className="no-data">
                                <Text type="secondary" disabled id="no-data-text"> No artworks for sale </Text>
                              </Col>
                          }
                        </Row>
                      </Card>))
                  : <Empty />
                }
              </Col>
            </Row>
            <Pagination
              current={page}
              total={total}
              pageSize={limit}
              hideOnSinglePage
              className="paginate"
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

Main.propTypes = {
  fetchArtistsRequest: PropTypes.func.isRequired,
  handleQueryName: PropTypes.func.isRequired,
  handleQueryPage: PropTypes.func.isRequired,
  handleQueryLimit: PropTypes.func.isRequired,
  artistQueryRate: PropTypes.func.isRequired,
  artistQueryLocation: PropTypes.func.isRequired,
  artistQueryArtType: PropTypes.func.isRequired,
  artistClearQuery: PropTypes.func.isRequired,
  artists: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
  })).isRequired,
  pagination: PropTypes.shape({
    page: PropTypes.number,
    limit: PropTypes.number,
    total: PropTypes.number,
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  query: PropTypes.shape({
    name: PropTypes.string,
    rate: PropTypes.number,
    region: PropTypes.string,
    province: PropTypes.string,
    city: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => state.artists;

const mapDispatchToProps = {
  fetchArtistsRequest,
  handleQueryName,
  handleQueryPage,
  handleQueryLimit,
  artistQueryRate,
  artistQueryLocation,
  artistQueryArtType,
  artistClearQuery,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

