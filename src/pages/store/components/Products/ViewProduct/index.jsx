import React, { Component } from 'react';
import { Typography, Row, Col, Button, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SlideShow from 'react-image-show';
import { updateDrawer, deleteArtRequest } from '../../../../../ducks/products';
import './ViewProduct.css';

const { Title, Text } = Typography;
class ViewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
    };
    this.toggleEdit = this.toggleEdit.bind(this);
  }
  toggleEdit() {
    this.setState({ isEdit: !this.state.isEdit });
  }
  render() {
    const { activeProduct } = this.props;
    const {
      images,
      title,
      artform,
      style,
      medium,
      subject,
      status,
      description,
      artist,
      quantity,
      dimensions,
      price,
    } = activeProduct;
    return (
      <div>
        {
          activeProduct && images ?
            <div>
              <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
                  <SlideShow
                    width="100%"
                    images={images.map(i => i.publicURL)}
                    thumbnails={images.length > 1}
                    arrows={images.length > 1}
                    thumbnailsWidth="100%"
                    imagesWidth="100%"
                  />
                </Col>
                <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} className="right-content">
                  <Title level={4} id="art-title"> {title} </Title>
                  <Text id="artist"> {artist.firstName} {artist.lastName} </Text> <br />
                  <Text code> {artform} </Text> <br />
                  <Text> QTY: {quantity} </Text><br />
                  <Text strong> PHP {price} </Text><br />
                  <Text> Size (HxWxD): {dimensions.height} x {dimensions.width} x {dimensions.depth} in</Text><br />
                  <Text> Medium : {medium.map(m => <Text code key={m}> {m} </Text>)} </Text><br />
                  <Text> Style : {style} </Text><br />
                  <Text> Subject : {subject.map(s => <Text code key={s}> {s} </Text>)} </Text><br />
                  <Text mark> {status} </Text><br />
                  <Text strong> Artwork Description </Text>
                  <br />
                  <div className="desc">
                    <Text> {description} </Text>
                  </div>
                  <div className="btn-opt">
                    <Button icon="edit" id="upd" onClick={() => this.props.updateDrawer(activeProduct)}> Update </Button>
                    <Popconfirm
                      title="Are you sure you want to delete this artwork?"
                      okText="Yes"
                      cancelText="No"
                      onCancel={null}
                      className="popover"
                      onConfirm={() => this.props.deleteArtRequest()}
                    >
                      <Button icon="delete" id="del" onClick={() => console.log('delete')}> Delete </Button>
                    </Popconfirm>
                  </div>
                </Col>
              </Row>
            </div>
          : ''
        }
      </div>
    );
  }
}

ViewProduct.propTypes = {
  activeProduct: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
  updateDrawer: PropTypes.func.isRequired,
  deleteArtRequest: PropTypes.func.isRequired,
};
const mapStateToProps = state => state.product.fetch;
const mapDispatchToProps = { updateDrawer, deleteArtRequest };
export default connect(mapStateToProps, mapDispatchToProps)(ViewProduct);
