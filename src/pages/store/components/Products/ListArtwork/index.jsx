import React, { Component } from 'react';
import { Button, Select, Form, Icon, Upload, Input, Radio, message } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addArtRequest, updateDrawer, updateArtRequest } from '../../../../../ducks/products';
import * as opts from '../../constant';
import './ListArtwork.css';

const { TextArea } = Input;
const { Option } = Select;
const artforms =
  [
    'PAINTING',
    'PHOTOGRAPHY',
    'DRAWING',
    'SCULPTURE',
    'COLLAGE',
    'PRINT',
    'DIGITAL ART',
  ];


class ListArtwork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newFile: [],
    };
    this.handleListArt = this.handleListArt.bind(this);
    this.handleUpdateArt = this.handleUpdateArt.bind(this);
    this.checkNumber = this.checkNumber.bind(this);
    this.checkUploadCount = this.checkUploadCount.bind(this);
  }
  checkNumber = async (rule, value, callback) => {
    if (isNaN(value)) callback("Input is not a number");
    else if (value <= 0) callback("Input must be greater than 0");
    callback();
  }
  checkUploadCount = async (rule, value, callback) => {
    if (value.fileList.length > 7) return callback('File upload count limit exceeded.');
    if (value.fileList.length === 0) return callback('Images are required');
    return callback();
  }
  async handleListArt(e) {
    e.preventDefault();
    await this.props.form.validateFields((err, values) => {
      if (!err) {
        const formData = new FormData();
        const { imgupload } = values;
        const { fileList } = imgupload;
        formData.append('dest', 'ARTWORKS');
        formData.dest = 'ARTWORK';
        fileList.forEach((file) => {
          formData.append('files', file.originFileObj);
        });
        const {
          title,
          description,
          medium,
          height,
          width,
          artform,
          subject,
          price,
          style,
          quantity,
        } = values;
        const data = {
          title,
          description,
          artform,
          medium,
          style,
          subject,
          price,
          quantity,
          dimensions: {
            height,
            width,
            depth: style === 'SCULPTURE' ? values.depth : 0,
          },
        };
        this.props.addArtRequest({ formData, data });
      }
    });
    this.props.form.resetFields();
  }
  async handleUpdateArt(e) {
    e.preventDefault();
    await this.props.form.validateFields((err, values) => {
      if (!err) {
        const formData = new FormData();
        formData.append('dest', 'ARTWORKS');
        formData.dest = 'ARTWORK';
        const { images } = this.props.update.selectedProduct;
        const { newFile } = this.state;
        const {
          title,
          description,
          medium,
          height,
          width,
          artform,
          subject,
          price,
          style,
          quantity,
          status,
        } = values;
        const data = {
          title,
          description,
          artform,
          medium,
          style,
          subject,
          price,
          quantity,
          images: images.length > 0 ? images.map(i => i._id) : [],
          dimensions: {
            height,
            width,
            depth: style === 'SCULPTURE' ? values.depth : 0,
          },
          status,
        };
        const newData = { data };
        if (newFile.length > 0) {
          newFile.forEach(n => formData.append('files', n));
          newData.formData = formData;
          newData.newUpload = true;
        }
        this.props.updateArtRequest(newData);
      }
    });
    this.props.form.resetFields();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { isUpdate } = this.props;
    const { selectedProduct } = this.props.update;
    const {
      title,
      description,
      artform,
      images,
      quantity,
      medium,
      style,
      subject,
      dimensions,
    } = selectedProduct;
    function objCreate(i) {
      return {
        uid: i._id,
        name: i.filename,
        status: 'done',
        url: i.publicURL,
        thumbUrl: i.publicURL,
      };
    }
    const uploadProps = {
      listType: isUpdate ? 'picture-card' : 'picture',
      accept: '.png, .jpeg, .jpg',
      defaultFileList: isUpdate && selectedProduct && images ? images.map(i => objCreate(i)) : [],
      beforeUpload: (file) => {
        const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isImg) {
          message.error('You can only upload JPG OR PNG files!');
        }
        if (isUpdate) this.setState({ newFile: [...this.state.newFile, file] });
        return false;
      },
      onRemove: (file) => {
        if (images.filter( i => i._id === file.uid).length === 1) {
          const imgs = images.filter(i => i._id !== file.uid);
          this.props.updateDrawer({ ...selectedProduct, images: imgs });
        }
      },
    };
    return (
      <Form onSubmit={isUpdate ? this.handleUpdateArt : this.handleListArt} className="list-artwork-container" colon={false} >
        <Form.Item label="Artwork Title">
          {getFieldDecorator('title', {
            initialValue: isUpdate && selectedProduct ? title : null,
            rules: [{ required: true, message: 'Please provide a title for your work!' }],
          })(
            <Input placeholder="Title" />,
          )}
        </Form.Item>
        <Form.Item label="Artwork Description">
          {getFieldDecorator('description', {
            initialValue: isUpdate && selectedProduct ? description : null,       
            rules: [{ required: true, message: 'Please provide a description for your work.' }],
          })(
            <TextArea placeholder="Description" autosize />,
          )}
        </Form.Item>
        <Form.Item label="Art Form">
          {getFieldDecorator('artform', {
            initialValue: isUpdate && selectedProduct ? artform : undefined,        
            rules: [{ required: true, message: 'Please select an art form.' }],
          })(
            <Select placeholder="Select form of your work">
              {
                artforms.map(form => <Option key={form} value={form}> {form} </Option>)
              }
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Medium">
          {getFieldDecorator('medium', {
            initialValue: isUpdate && selectedProduct && medium ? [...medium] : undefined,
            rules: [{ required: true, message: 'Please provide the medium of your work.' }],
          })(
            <Select mode="tags" placeholder="Input or Search for medium/materials used">
              {
                [...opts.medium, ...opts.moreMedium].map(m => <Option key={m}> {m} </Option>)
              }
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Style">
          {getFieldDecorator('style', {
            initialValue: isUpdate && selectedProduct ? style : undefined,
            rules: [{ required: true, message: 'Please choose the art style.' }],
          })(
            <Select
              showSearch
              placeholder="Select an art style"
            >
              {
                opts.styles.map(style => <Option key={style} value={style}> {style} </Option>)
              }
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Subject">
          {getFieldDecorator('subject', {
            initialValue: isUpdate && selectedProduct && subject ? [...subject] : undefined,
            rules: [{ required: true, message: 'Please provide the subject of your work!' }],
          })(
            <Select mode="tags" placeholder="Input or Search for art subject">
              {
                [...opts.subject, ...opts.moreSubject].map(m => <Option key={m}> {m} </Option>)
              }
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Height">
          {getFieldDecorator('height', {
            initialValue: isUpdate && selectedProduct && dimensions ? dimensions.height : null,
            validateFirst: true,
            rules: [
            { required: true, message: 'Please provide the height of your work.' },
            { validator: this.checkNumber },
          ],
          })(
            <Input placeholder="Height" addonAfter="in" />,
          )}
        </Form.Item>
        <Form.Item label="Width">
          {getFieldDecorator('width', {
            initialValue: isUpdate && selectedProduct && dimensions ? dimensions.width : null,
            validateFirst: true,
            rules: [
            { required: true, message: 'Please provide the height of your work.' },
            { validator: this.checkNumber },
          ],
          })(
            <Input placeholder="Width" addonAfter={"in"} />,
          )}
        </Form.Item>
        {
          this.props.form.getFieldValue('artform') === 'SCULPTURE' ?
            <Form.Item label="Depth">
              {getFieldDecorator('depth', {
                initialValue: isUpdate && selectedProduct && dimensions ? dimensions.depth : null,
                validateFirst: true,
                rules: [
                { required: true, message: 'Please provide the depth of your work.' },
                { validator: this.checkNumber },
              ],
              })(
                <Input placeholder="Depth" addonAfter="in" />,
              )}
            </Form.Item>
          : ''
        }
        <Form.Item label="Quantity">
          {getFieldDecorator('quantity', {
            initialValue: isUpdate && selectedProduct ? quantity : null,
            validateFirst: true,
            rules: [
              { required: true, message: 'Please provide quantity of your work.' },
              { validator: this.checkNumber },
            ],
          })(
            <Input placeholder="Quantity" />,
          )}
        </Form.Item>
        <Form.Item label="Price">
          {getFieldDecorator('price', {
            initialValue: isUpdate ? selectedProduct.price : undefined,
            validateFirst: true,
            rules: [
              { required: true, message: 'Please provide price of your work.' },
              { validator: this.checkNumber },
            ],
          })(
            <Input addonBefore={'PHP'} />,
          )}
        </Form.Item>
        {
          isUpdate ?
            <Form.Item label="Status">
              {getFieldDecorator('status', {
                initialValue: 'AVAILABLE',
                rules: [{ required: true }],
              })(
                <Radio.Group>
                  <Radio value="AVAILABLE"> Available </Radio>
                  <Radio value="SOLD"> Sold </Radio>
                </Radio.Group>,
              )}
            </Form.Item>
          :
            ''
        }
        <Form.Item label="Upload" required >
          {getFieldDecorator('imgupload', {
            initialValue: isUpdate && selectedProduct && images ? images.map(i => objCreate(i)) : null,
            validateFirst: true,
            rules: [
              { required: true, message: 'Images of the artwork are required.' },
              { validator: this.checkUploadCount },
            ],
          })(
            <Upload.Dragger {...uploadProps} multiple>
              <Icon type="inbox" />
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Upload a maximum of 7 photos.</p>
            </Upload.Dragger>,
          )}
        </Form.Item>
        <Form.Item>
          <Button loading={this.props.upload.isFetching || this.props.listArtwork.isFetching} type="primary" htmlType="submit" className="list-form-btn">
            { isUpdate ? 'Save Changes' : 'List Artwork' }
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
ListArtwork.propTypes = {
  form: PropTypes.shape({
    validateFields: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
    getFieldValue: PropTypes.func.isRequired,
    resetFields: PropTypes.func.isRequired,
  }).isRequired,
  addArtRequest: PropTypes.func.isRequired,
  listArtwork: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  upload: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    uploadedImages: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  update: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    selectedProduct: PropTypes.shape({
      _id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  updateDrawer: PropTypes.func.isRequired,
  isUpdate: PropTypes.bool,
  updateArtRequest: PropTypes.func.isRequired,
};

ListArtwork.defaultProps = {
  isUpdate: false,
};

const mapStateToProps = (state) => {
  const { upload, listArtwork, update } = state.product;
  return { upload, listArtwork, update };
};
const mapDispatchToProps = {
  addArtRequest,
  updateArtRequest,
  updateDrawer,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(ListArtwork));

