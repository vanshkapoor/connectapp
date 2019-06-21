import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Textfield from '../common/textfield';
import Textarea from '../common/textarea';
import Selectiontext from '../common/selectiontext';
import Inputgroup from '../common/inputgroup';
import {createProfile,getCurrentProfile} from '../../actions/profileActions';
import {Link,withRouter} from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class editProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
        displaySocialInputs:false,
        handle:'',
        company:'',
        website:'',
        location:'',
        status:'',
        skills:'',
        bio:'',
        githubusername:'',
        twitter:'',
        facebook:'',
        linkedin:'',
        instagram:'',
        youtube:'',
        errors:{}
    }
}


onChange =(e) =>{
    this.setState({
        [e.target.name]:e.target.value
    });
}

componentDidMount(){
    this.props.getCurrentProfile();
}

componentWillReceiveProps(nextProps)
{
    if(nextProps.errors){
        this.setState({errors :nextProps.errors});
    }

    if(nextProps.profile.profile){
        const profile = nextProps.profile.profile;

        const skillsCSV = profile.skills.join(',');

        //empty check
        profile.company = !isEmpty(profile.company)?profile.company :'';
        profile.website = !isEmpty(profile.website)?profile.website :'';
        profile.location = !isEmpty(profile.location)?profile.location :'';
        profile.githubusername = !isEmpty(profile.githubusername)?profile.githubusername :'';
        profile.bio = !isEmpty(profile.bio)?profile.bio :'';
        profile.social = !isEmpty(profile.social)?profile.social :{};
        profile.twitter = !isEmpty(profile.social.twitter)?profile.social.twitter :'';
        profile.facebook = !isEmpty(profile.social.facebook)?profile.social.facebook :'';
        profile.linkedin = !isEmpty(profile.social.linkedin)?profile.social.linkedin :'';
        profile.youtube = !isEmpty(profile.social.youtube)?profile.social.youtube :'';
        profile.instagram = !isEmpty(profile.social.instagram)?profile.social.instagram :'';

        this.setState({
            handle:profile.handle,
            location:profile.location,
            company:profile.company,
            website:profile.website,
            status:profile.status,
            skills:skillsCSV,
            bio:profile.bio,
            githubusername:profile.githubusername,
            twitter:profile.twitter,
            facebook:profile.facebook,
            linkedin:profile.linkedin,
            youtube:profile.youtube,
            instagram:profile.instagram
        })
    }
}


onSubmit =(e) =>{
    e.preventDefault();
    const profile = {
            handle:this.state.handle,
            location:this.state.location,
            company:this.state.company,
            website:this.state.website,
            status:this.state.status,
            skills:this.state.skills,
            bio:this.state.bio,
            githubusername:this.state.githubusername,
            twitter:this.state.twitter,
            facebook:this.state.facebook,
            linkedin:this.state.linkedin,
            youtube:this.state.youtube,
            instagram:this.state.instagram
    }

    this.props.createProfile(profile,this.props.history);
}

togglehandler =() =>{
    const show = this.state.displaySocialInputs;
    this.setState({
        displaySocialInputs:!show
    })
}



  render() {

    const {displaySocialInputs} = this.state;
    let socialInputs;

    if(displaySocialInputs) {
        socialInputs =(
            <div>
                <Inputgroup
                    placeholder="Twitter profile URL"
                    name="twitter"
                    icon="fab fa-twitter"
                    value={this.state.twitter}
                    onChange={this.onChange}
                    error={this.state.errors.twitter}
                />
                <Inputgroup
                    placeholder="Facebook profile URL"
                    name="facebook"
                    icon="fab fa-facebook"
                    value={this.state.facebook}
                    onChange={this.onChange}
                    error={this.state.errors.facebook}
                />
                <Inputgroup
                    placeholder="LinkedIn profile URL"
                    name="linkedin"
                    icon="fab fa-linkedin"
                    value={this.state.linkedin}
                    onChange={this.onChange}
                    error={this.state.errors.linkedin}
                />
                <Inputgroup
                    placeholder="Instagram profile URL"
                    name="instagram"
                    icon="fab fa-instagram"
                    value={this.state.instagram}
                    onChange={this.onChange}
                    error={this.state.errors.instagram}
                />
                <Inputgroup
                    placeholder="Youtube profile URL"
                    name="youtube"
                    icon="fab fa-youtube"
                    value={this.state.youtube}
                    onChange={this.onChange}
                    error={this.state.errors.youtube}
                />
            </div>


        )
    }
    const options=[
        { label: 'Select Professionla Status', value:0},
        { label: 'Developer' ,value:'Developer' },
        { label: 'Junior Developer' ,value:'Junior Developer' },
        { label: 'Senior Developer' ,value:'Senior Developer' },
        { label: 'Manager' ,value:'Manager' },
        { label: 'Student or learning' ,value:'Student or learning' },
        { label: 'Instructor or teacher' ,value:'Instructor or teacher' },
        { label: 'Intern' ,value:'Intern' },
        { label: 'Other' ,value:'Other' },
    ];

    return (
      <div className="create-profile">
        <div className="container">
            <div className="row">
            
                <div className="col-md-8 m-auto">
                <Link to="/dashboard" className="btn btn-light">
                        Go back
                    </Link>
                    <h1 className="display-4 text-center">
                        Edit Your Profile
                    </h1>
                    <small className="d-block pb-3">
                        * =required fields
                    </small>
                    <form onSubmit={this.onSubmit}>
                        <Textfield 
                            placeholder="Profile Handle"
                            name="handle"
                            value={this.state.handle}
                            onChange={this.onChange}
                            error={ this.state.errors.handle }
                            info="A unique handle for your profile"                            
                        />
                        <Selectiontext 
                            name="status"                            
                            value={this.state.status}
                            onChange={this.onChange}
                            error={this.state.errors.handle}
                            options={options}
                            info="Givve us an idea where you are at in your carrer"
                        />
                        <Textfield 
                            placeholder="company"
                            name="company"
                            value={this.state.company}
                            onChange={this.onChange}
                            error={ this.state.errors.company }
                        />
                        <Textfield 
                            placeholder="website"
                            name="website"
                            value={this.state.website}
                            onChange={this.onChange}
                            error={ this.state.errors.website }
                        />
                        <Textfield 
                            placeholder="location"
                            name="location"
                            value={this.state.location}
                            onChange={this.onChange}
                            error={ this.state.errors.location }
                        />
                        <Textfield 
                            placeholder="skills"
                            name="skills"
                            value={this.state.skills}
                            onChange={this.onChange}
                            error={ this.state.errors.skills }
                            info="Please use comma seperated values(eg. HTML,CSS,JS...)"
                        />
                        <Textfield 
                            placeholder="Github Username"
                            name="githubusername"
                            value={this.state.githubusername}
                            onChange={this.onChange}
                            error={ this.state.errors.githubusername }
                        />
                        <Textarea 
                            placeholder="Short bio"
                            name="bio"
                            value={this.state.bio}
                            onChange={this.onChange}
                            error={ this.state.errors.bio } 
                        />
                        <div className="mb-3">
                            <button 
                            type="button"
                            onClick={this.togglehandler} 
                            className="btn btn-light">
                                Add social network links
                            </button>
                            <span className="text-muted ">Optional</span>
                        </div>
                        {socialInputs}    
                        <input type="submit" value="submit" className="btn btn-info btn-block mt-4"></input>      
                        
                    </form>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

editProfile.propTypes = {
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired,
    createProfile:PropTypes.func.isRequired,
    getCurrentProfile:PropTypes.func.isRequired
}


const mapStateToProps = state =>({
    profile:state.profile,
    errors:state.errors
});

export default connect(mapStateToProps,{createProfile,getCurrentProfile})(withRouter(editProfile));