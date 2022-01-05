import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import { connect } from 'react-redux';
import { changeAccountTypeRequest } from '../../../../../ducks/users';

const { Title } = Typography;
class SwitchAccount extends Component {
  constructor(props) {
    super(props);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  handleTypeChange() {
    this.props.changeAccountTypeRequest({ toArtist: !this.props.profile.isArtist });
  }
  render() {
    return (
      <div>
        {
            this.props.profile.isArtist ?
              <div>
                <Title level={4} style={{ color: '#595959' }}>You are about to deactivate seller account</Title>
                <br />
                <span>
                  You are about to deactivate your artist account.
                  Your profile and works will no longer be viewable to users in this site.
                </span><br /><br />
                <span> What else you should know? </span><br />
                <ul>
                  <li>
                    You may restore your dashboard along with your
                    products upon activating the artist account again.
                  </li>
                  <li>
                    Your profile, artworks, and reviews
                    will not be publicly available to the artists section of this site.
                  </li>
                  <li>
                    Once deactivated, you can still use this account to browse and shop artworks.
                  </li>
                </ul>
              </div>
            :
              <div>
                <Title level={4} style={{ color: '#595959' }}>You are about to activate seller account</Title>
                <span>
                  What you should know before you activate your account and start managing your own shop ?
                </span><br /><br />
                <ul>
                  <li>
                    Once activated, you may start listing your artworks.
                  </li><br />
                  <li>
                    Please keep in mind that CHROMA uses inches(in) as the unit of measurement.
                  </li><br />
                  <li>
                    CHROMA uses only bank deposits as its payment method.
                    Payments, delivery, returns, and refunds must be communicated directly between the buyer and seller.
                  </li><br />
                  <li>
                    In order to help you manage your orders, the transactions page will display and allow you to share updates on the order with the buyer.
                    In addition, you may use the messaging system to send bank transfer details and other information.
                  </li>
                </ul>
                <p> For more information, please refer to the <Link to="/FAQs/artists" style={{ color: '#CA0000'} }>artist's handbook.</Link></p>
              </div>
          }
      </div>
    );
  }
}

SwitchAccount.propTypes = {
  profile: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  isGettingSession: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  changeAccountTypeRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.user;

const mapDispatchToProps = {
  changeAccountTypeRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(SwitchAccount);
