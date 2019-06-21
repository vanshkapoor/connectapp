import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Link,withRouter} from 'react-router-dom';
import Textfield from '../common/textfield';
import Textarea from '../common/textarea';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profileActions';


class Addexperience extends Component {
    constructor(props){
        super(props);
        this.state = {
            company:'',
            title:'',
            location:'',
            from:'',
            to:'',
            current:false,
            description:'',
            errors:{},
            disabled:false
        }
    };

    
  onChange =(e) =>{
    this.setState({
      [e.target.name]:e.target.value
    });
}

  onCheck =(e) =>{
    this.setState({
      disabled:!this.state.disabled,
      current:!this.state.current
    })
}

  onSubmit = (e) =>{
    e.preventDefault();
    const expdata = {
        company:this.state.company,
        title:this.state.title,
        from:this.state.from,
        to:this.state.to,
        location:this.state.location,
        current:this.state.current,
        description:this.state.description,
    };

    this.props.addExperience(expdata,this.props.history);

}

componentWillReceiveProps(nextProps)
{
    if(nextProps.errors){
        this.setState({errors :nextProps.errors});
    }
}



  render() {
      const {errors} = this.state;
    return (
      <div className="add-experience">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <Link to="/dashboard" className="btn btn-light">
                        Go back
                    </Link>
                    <h1 className="display-4 text-center">
                        Add experience
                    </h1>
                    <form onSubmit={this.onSubmit}>
                    <Textfield 
                        name="company"
                        placeholder="* Company"
                        value={this.state.company}
                        onChange={this.onChange}
                        error={errors.company}
                    />
                    <Textfield 
                        name="location"
                        placeholder="* location"
                        value={this.state.location}
                        onChange={this.onChange}
                        error={errors.location}
                    />
                    <Textfield 
                        name="title"
                        placeholder="* Job title"
                        value={this.state.title}
                        onChange={this.onChange}
                        error={errors.title}
                    />
                    <h6>From date</h6>
                    <Textfield 
                        type="date"
                        name="from"
                        value={this.state.from}
                        onChange={this.onChange}
                        error={errors.from}
                    />
                    <h6>To date</h6>
                    <Textfield 
                        type="date"
                        name="to"
                        value={this.state.to}
                        onChange={this.onChange}
                        error={errors.to}
                        disabled={this.state.disabled?'disabled':''}
                    />  
                    <div className="form-check mb-4">
                        <input 
                            type="checkbox"
                            className="from-check-input"
                            name="current"
                            value={this.state.current}
                            checked={this.state.current}
                            onChange={this.onCheck}
                            id="current"
                        />
                        <label className="form-check-label">
                            Current job
                        </label>
                    </div>
                    <Textarea 
                            placeholder="Description for the job"
                            name="description"
                            value={this.state.description}
                            onChange={this.onChange}
                            error={ errors.description } 
                    />
                    <input type="submit" value="Submit" className="btn btn-info btn-block mt-4">
                    </input>
                    </form>
                </div>
            </div>
        </div>
        
      </div>
    )
  }
}

Addexperience.propTypes ={
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired,
    addExperience:PropTypes.func.isRequired
}


const mapStateToProps = state =>({
    profile:state.profile,
    errors:state.errors
})

export default connect(mapStateToProps,{addExperience})(withRouter(Addexperience));