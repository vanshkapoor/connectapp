import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import {getProfiles} from '../../actions/profileActions';
import Profileitem from './profileitem';

class Profiles extends Component {

    componentDidMount()
    {
        this.props.getProfiles();
    }

  render() {

    const {profiles, isLoading} = this.props.profile;
    let profileItems;

    if(profiles === null || isLoading)
    {
        profileItems =<Spinner />;
    }else
    {

        if(profiles.length > 0)
        {
            profileItems = profiles.map(profile =>(
                <Profileitem profile={profile} key={profile._id} />
            ))
        }else{
            profileItems =<h4>No profiles found</h4>
        }

    }

    return (
      <div className="profiles">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4 text-center">Developer Profiles</h1>
                    <p className="lead text-center">
                        Browse and connect with developers
                    </p>
                    {profileItems}
                </div>
            </div>
        </div>
      </div>
    )
  }
}

Profiles.propTypes = {
    getProfiles:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    profile:state.profile
})

export default connect(mapStateToProps,{getProfiles})(Profiles);