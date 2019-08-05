import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, Layout, Menu, Avatar, Collapse, Typography } from 'antd';
import { regions, provinces } from 'philippines';
import Art from './Art';

const { Paragraph } = Typography;
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


class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '1',
    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick = e => this.setState({ current: e.key });
  render() {
    const profile = this.props.artist;
    const {
      image,
      firstName,
      lastName,
      location,
      bio,
      links,
      isArtist,
    } = profile;
    const formattedBio = bio ? bio.split('\n') : '';
    const { current } = this.state;
    const hasLinks = links && (links.fb !== '' || links.twitter !== '' || links.instagram !== '' || links.pinterest !== '' || links.tumblr !=='' || links.web !== '');
    const disable = bio || hasLinks;
    const def = firstName ? firstName.charAt(0).toUpperCase() : '';
    return (
      <Layout.Content className="profile-container">
        { image ?
          <Avatar src={image.publicURL} size={100} id="dp" />
          : <Avatar size={100} style={{ fontSize: '60px', color: 'white', backgroundColor: '#CA0000' }}>{def}</Avatar>
        }
        <p id="name"> {firstName} {lastName} <a style={{ color: '#CA0000' }} href={`/messages/${profile._id}`}> <Icon type="message" /></a></p>
        {loc(location) ? <span id="location"><Icon type="environment" theme="filled" /> {loc(location)} </span> : ''}
        <Menu mode="horizontal" onClick={this.handleMenuClick} selectedKeys={[this.state.current]} className="profile-menu">
          {isArtist ? <Menu.Item key="1"> Artworks </Menu.Item> : ''}
          { bio ? <Menu.Item key="2" disabled={!disable}> About Me </Menu.Item> : '' }
          {isArtist ? <Menu.Item key="3"> Reviews </Menu.Item> : ''}
        </Menu>
        {
          current === '1' ?
            <Art match={this.props.match} />
          : current === '2' ?
            <div className="abt-me">
              <Collapse
                accordion
                bordered={false}
                defaultActiveKey={['1']}
                expandIconPosition="right"
                className="collapse-about"
                expandIcon={({ isActive }) => <Icon type="down" rotate={isActive ? 180 : 0} />}
              >
                { bio ?
                  <Panel className="bio-panel" header="Biography" key="1"> {formattedBio.map(f => <Paragraph> {f} </Paragraph>)}</Panel>
                  : ''
                }
                {
                  links ?
                    <Panel className="links-panel" header="Social Links" key={bio ? '2' : '1'}>
                    {links.fb ? <a href={links.fb} target="_blank" rel="noopener noreferrer"> <Icon type="facebook" /></a> : ''}
                    {links.twitter ? <a href={links.twitter} target="_blank" rel="noopener noreferrer"> <Icon type="twitter" /></a> : ''}
                    {links.instagram ? <a href={links.instagram} target="_blank" rel="noopener noreferrer"> <Icon type="instagram" /></a> : ''}
                    {links.pinterest ? <a href={links.pinterest} target="_blank" rel="noopener noreferrer"> <Icon type="instagram" /></a> : ''}
                    {links.tumblr ? <a href={links.tumblr} target="_blank" rel="noopener noreferrer"> <Icon type="tumblr" /></a> : ''}
                    {links.web ? <a href={links.web} target="_blank" rel="noopener noreferrer"> <Icon type="link" /></a> : ''}
                    </Panel>
                  : ''
                }
              </Collapse>
            </div>
          : <p> 3 </p>
        }
      </Layout.Content>
    );
  }
}

Content.propTypes = {
  artist: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => state.artists;
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Content);
