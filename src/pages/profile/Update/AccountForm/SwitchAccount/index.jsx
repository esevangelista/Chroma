import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { changeAccountTypeRequest } from '../../../../../ducks/users';


class SwitchAccount extends Component {
  constructor(props) {
    super(props);
    // this.state = {
      
    // }
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
                <span>
                  You are about to deactivate your artist account.
                  Your profile and works will no longer be viewable to users in this site/
                </span>
                <span> What else you should know </span>
                <ul>
                  <li>
                    You may restore your dashboard along with your
                    products upon activating the artist account again.
                  </li>
                  <li>
                    Your profile and other information
                    will not be publicly available to the artists section of this site/
                  </li>
                </ul>
              </div>
            :
              <div>
                <span>
                  What you should know before you
                  activate your account and start managing your own shop
                </span>
                <p> insert more info here </p>
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
