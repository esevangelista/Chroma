import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { regions, provinces, cities } from 'philippines';
import { Alert, Form, Upload, message, Icon, Avatar, Input, Typography, Select, Button } from 'antd';
import { connect } from 'react-redux';
import { updateProfileRequest } from '../../../../ducks/users';
import './profileForm.css';

const { Option } = Select;
const { Text } = Typography;
function objCreate(i) {
  return {
    uid: i._id,
    name: i.filename,
    status: 'done',
    url: i.publicURL,
    thumbUrl: i.publicURL,
  };
}
class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newFile: null,
      filteredProvinces: [],
      filteredCities: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handleProvinceChange = this.handleProvinceChange.bind(this);
  }
  componentWillMount() {
    if (this.props.profile.location) {
      if (this.props.profile.location.region) {
        this.setState({
          filteredProvinces: provinces.filter(pr =>
            pr.region === this.props.profile.location.region) || [],
        });
      }
      if (this.props.profile.location.province) {
        this.setState({
          filteredCities: cities.filter(pr =>
            pr.province === this.props.profile.location.province) || [],
        });
      }
    }
  }
  handleRegionChange = (e) => {
    this.setState({
      filteredProvinces: provinces.filter(pr => pr.region === e) || [],
      filteredCities: [],
    });
    this.props.form.setFieldsValue({ province: undefined });
    this.props.form.setFieldsValue({ city: undefined });
  }
  handleProvinceChange = (e) => {
    this.setState({ filteredCities: cities.filter(c => c.province === e) || [] });
    this.props.form.setFieldsValue({ city: undefined });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {};
        for (const i in values) {
          if (i !== 'avatar') {
            data[i] = values[i];
          }
        }
        const formData = new FormData();
        if (this.state.newFile) {
          formData.append('dest', 'USERS');
          formData.append('files', this.state.newFile);
          data.formData = formData;
        }
        if (Object.keys(data).length >= 1) {
          this.props.updateProfileRequest(data);
        }
      }
    });
  }
  render() {
    const { profile, form, isGettingSession, error } = this.props;
    const { filteredProvinces, filteredCities } = this.state;
    const { getFieldDecorator, getFieldValue, setFieldsValue } = form;
    const initialValue = profile;
    const uploadProps = {
      showUploadList: false,
      listType: 'picture-card',
      accept: '.png, .jpeg, .jpg',
      defaultFileList: profile.image ? [objCreate(profile.image)] : [],
      fileList: profile.image ? [objCreate(profile.image)] : [],
      beforeUpload: (file) => {
        const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isImg) {
          message.error('You can only upload JPG OR PNG files!');
        }
        setFieldsValue({ avatar: null });
        this.setState({ newFile: file });
        return false;
      },
    };
    return (
      <div className="acc-form-container">
        {
          this.props.message ?
            <Alert className="alert-reg" banner closable message={this.props.message} type={error === true ? 'error' : 'success'} />
          : ''
        }
        <Form onSubmit={this.handleSubmit} colon={false} className="acc-form">
          <Form.Item label="Profile Photo">
            {getFieldDecorator('avatar', { initialValue: initialValue.image ? objCreate(initialValue.image) : null })(
              <Upload className="uploader" {...uploadProps} >
                {
                  this.state.newFile ?
                    <span>
                      {
                        this.state.newFile.name.length > 30 ? 
                          this.state.newFile.name.slice(0, 30) : this.state.newFile.name
                      }
                    </span>
                  : getFieldValue('avatar') && getFieldValue('avatar').url ?
                    <Avatar size={120} alt="avatar" src={getFieldValue('avatar').url} />
                  : <Icon id="plus-icon" type="plus" />
                }
              </Upload>)}
          </Form.Item>
          <Form.Item label="About Me">
            {getFieldDecorator('bio', { initialValue: initialValue.bio || '' })(<Input.TextArea placeholder="Tell something about yourself" autosize={{ minRows: 4, max: 7 }} />)}
          </Form.Item>
          <span id="link-label"> Social Links </span>
          <br />
          <Text type="secondary"> We'll add icons with links to any of the below sites that you provide.</Text>
          <div className="link-container">
            <Form.Item label="Facebook">
              {getFieldDecorator('fb', { initialValue: initialValue.links ? initialValue.links.fb : null })(<Input placeholder="e.g. https://www.facebook.com/chromaph" />)}
            </Form.Item>
            <Form.Item label="Twitter">
              {getFieldDecorator('twitter', { initialValue: initialValue.links ? initialValue.links.twitter : null })(<Input placeholder="e.g. https://www.twitter.com/chromaph" />)}
            </Form.Item>
            <Form.Item label="Instagram">
              {getFieldDecorator('instagram', { initialValue: initialValue.links ? initialValue.links.instagram : null })(<Input placeholder="e.g. https://www.instagram.com/chromaph" />)}
            </Form.Item>
            <Form.Item label="Pinterest">
              {getFieldDecorator('pinterest', { initialValue: initialValue.links ? initialValue.links.pinterest : null })(<Input placeholder="e.g. https://www.pinterest.com/chromaph" />)}
            </Form.Item>
            <Form.Item label="Tumblr">
              {getFieldDecorator('tumblr', { initialValue: initialValue.links ? initialValue.links.tumblr : null })(<Input placeholder="e.g. https://www.chroma.com" />)}
            </Form.Item>
            <Form.Item label="My Website">
              {getFieldDecorator('web', { initialValue: initialValue.links ? initialValue.links.web : null })(<Input placeholder="e.g. https://www.chroma.com" />)}
            </Form.Item>
          </div>
          <span id="link-label">Billing Address </span>
          <div className="link-container">
            <div className="loc-container">
              <Form.Item label="House #">
                {getFieldDecorator('housenum', { initialValue: initialValue.location ? initialValue.location.housenum : null })(<Input placeholder="e.g. 298" />)}
              </Form.Item>
              <Form.Item label="Street">
                {getFieldDecorator('street', { initialValue: initialValue.location ? initialValue.location.street : null })(<Input placeholder="e.g. Yumul St." />)}
              </Form.Item>
              <Form.Item label="Barangay">
                {getFieldDecorator('brgy', { initialValue: initialValue.location ? initialValue.location.brgy : null })(<Input placeholder="e.g. Gomez" />)}
              </Form.Item>
            </div>
            <Form.Item label="Region">
              {getFieldDecorator('region', { initialValue: initialValue.location ? initialValue.location.region : undefined })(<Select placeholder="Choose your region" onChange={this.handleRegionChange}>{ regions.map(r => <Option key={r.key} value={r.key}> {r.long} ({r.name}) </Option>)}</Select>)}
            </Form.Item>
            <Form.Item label="Province">
              {getFieldDecorator('province', { initialValue: initialValue.location ? initialValue.location.province : undefined })(<Select placeholder="Choose your province" onChange={this.handleProvinceChange} disabled={filteredProvinces.length === 0}>{ filteredProvinces.map(p => <Option key={p.name} value={p.key}> {p.name} </Option>) }</Select>)}
            </Form.Item>
            <Form.Item label="Town/City">
              {getFieldDecorator('city', { initialValue: initialValue.location ? initialValue.location.city : undefined })(<Select showSearch disabled={filteredCities.length === 0} placeholder="Choose your city">{filteredCities.map(c => <Option key={c.name} value={c.name}> {c.name} </Option>)}</Select>)}
            </Form.Item>
            <Form.Item label="Landmarks">
              {getFieldDecorator('landmarks', { initialValue: profile.location ? profile.location.landmarks : undefined })(<Input.TextArea autosize={{ minRows: 2, max: 7 }} />)}
            </Form.Item>
            <Form.Item label="Mobile Number">
              {getFieldDecorator('mobnum', {
                initialValue: profile.mobile ? profile.mobile : undefined,
                rules: [{ pattern: new RegExp(/^(09|\+639)\d{9}$/), message: 'Invalid mobile number' }],
              })(<Input placeholder="e.g. 09215688208" />)}
            </Form.Item>
          </div>
          <Form.Item>
            <Button loading={isGettingSession} type="primary" htmlType="submit" className="form-button">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

ProfileForm.propTypes = {
  profile: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    location: PropTypes.shape({
      province: PropTypes.string,
      city: PropTypes.string,
      region: PropTypes.string,
    }),
  }).isRequired,
  isGettingSession: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    getFieldValue: PropTypes.func.isRequired,
    validateFieldsAndScroll: PropTypes.func.isRequired,
    setFieldsValue: PropTypes.func.isRequired,
  }).isRequired,
  updateProfileRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.user;

const mapDispatchToProps = {
  updateProfileRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ProfileForm));
