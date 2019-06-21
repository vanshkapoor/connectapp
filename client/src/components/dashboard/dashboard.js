import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCurrentProfile, deleteAccount} from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import Profileactions from './profileactions';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {

componentDidMount(){
    this.props.getCurrentProfile();
}

DeleteHandler =(e) =>{
    this.props.deleteAccount();
}

  render() {
    const {user} = this.props.auth;
    const {profile, isLoading} = this.props.profile;

    let dashboardContent;

    if(profile == null || isLoading )
    {
      dashboardContent = <Spinner />
    }else
    {
      if(Object.keys(profile).length > 0)
      {
          dashboardContent= (
            <div>
                <p className="lead text-muted">
                Welcome <Link to={`/profile/${profile.handle}`}> { user.name } </Link>
                </p>

                <Profileactions />
                <Experience experience={profile.experience} />
                <Education education={profile.education}/>
                
                <div style={{ marginBottom: '60px' }} />
                <button onClick={ this.DeleteHandler.bind(this) } 
                className="btn btn-danger">Delete My Account
                </button>
            </div>
          );
      }else{
        dashboardContent = (
          <div>            
            <p className="lead text-muted">Welcome { user.name }</p>
            <p>set up your profile</p>
            <Link to="/create-profile" className="btn btn-lg btn-outline-info">
            Create Profile
            </Link>
          </div>
        )
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
                { dashboardContent }
            </div>
          </div>
        </div> 
      </div>
    )
  }
}

Dashboard.propTypes ={
  getCurrentProfile:PropTypes.func.isRequired,
  deleteAccount:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  profile:PropTypes.object.isRequired 
}

const mapStateToProps = state =>({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps,{getCurrentProfile, deleteAccount})(Dashboard);