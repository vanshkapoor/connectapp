import React, { Component } from 'react'
import Profileabout from './profileabout';
import Profilecreds from './profilecreds';
import Profilegithub from './profilegithub';
import Profileheader from './profileheader';
import Spinner from '../common/Spinner';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {getprofileByHandle} from '../../actions/profileActions';


class Profile extends Component {
    componentDidMount()
    {
        if(this.props.match.params.handle)
        {
            this.props.getprofileByHandle(this.props.match.params.handle);
        }

    }
    componentWillReceiveProps(nextProps)
    {
        if(nextProps.profile.profile === null && this.props.profile.isLoading ){
            this.props.history.push('/not-found');
        }
    }
  render() {
      const {profile,isLoading} = this.props.profile;
      let profileContent;

      if(profile === null||isLoading)
      {
          profileContent = <Spinner />
      }else{
          profileContent =(
              <div>
                  <div className="row">
                      <div className="col-md-6">
                      <Link to="/profiles" className="btn btn-light mb-3 float-left">
                        Back To profiles
                      </Link>
                      </div>
                  </div>
                        
                    <Profileheader  profile={profile} />
                    <Profileabout profile={profile} />
                    <Profilecreds education={profile.education} experience={profile.experience} />
                   {profile.githubusername?(
                    <Profilegithub username={profile.githubusername} />
                   ):null} 
              </div>             

          )
      }

    return (
      <div className="profile">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    { profileContent }
                </div>
            </div>
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    getprofileByHandle: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    profile:state.profile

})


export default connect(mapStateToProps,{getprofileByHandle})(Profile);