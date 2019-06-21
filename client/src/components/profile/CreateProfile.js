import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Textfield from '../common/textfield';
import Textarea from '../common/textarea';
import Selectiontext from '../common/selectiontext';
import Inputgroup from '../common/inputgroup';
import {createProfile} from '../../actions/profileActions';
import {withRouter} from 'react-router-dom';


class CreateProfile extends Component {
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


componentWillReceiveProps(nextProps)
{
    if(nextProps.errors){
        this.setState({errors :nextProps.errors});
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
                    <h1 className="display-4 text-center">
                        Create Your Profile
                    </h1>
                    <p className="lead text-center">
                        Lets get some information
                    </p>
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
                            info="Give us an idea where you are at in your carrer"
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

CreateProfile.propTypes = {
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired,
    createProfile:PropTypes.func.isRequired
}


const mapStateToProps = state =>({
    profile:state.profile,
    errors:state.errors
});

export default connect(mapStateToProps,{createProfile})(withRouter(CreateProfile));