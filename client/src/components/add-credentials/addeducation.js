import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Link,withRouter} from 'react-router-dom';
import Textfield from '../common/textfield';
import Textarea from '../common/textarea';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profileActions';


class Addeducation extends Component {
    constructor(props){
        super(props);
        this.state = {
            school:'',
            degree:'',
            fieldofstudy:'',
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
    const edudata = {
        school:this.state.school,
        fieldofstudy:this.state.fieldofstudy,
        from:this.state.from,
        to:this.state.to,
        degree:this.state.degree,
        current:this.state.current,
        description:this.state.description,
    };

    this.props.addEducation(edudata,this.props.history);

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
                        Add Education
                    </h1>
                    <form onSubmit={this.onSubmit}>
                    <Textfield 
                        name="school"
                        placeholder="* school"
                        value={this.state.school}
                        onChange={this.onChange}
                        error={errors.school}
                    />
                    <Textfield 
                        name="degree"
                        placeholder="* degree"
                        value={this.state.degree}
                        onChange={this.onChange}
                        error={errors.degree}
                    />
                    <Textfield 
                        name="fieldofstudy"
                        placeholder="* field of study"
                        value={this.state.fieldofstudy}
                        onChange={this.onChange}
                        error={errors.fieldofstudy}
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
                            Current education field
                        </label>
                    </div>
                    <Textarea 
                            placeholder="Description for the program"
                            name="description"
                            value={this.state.description}
                            onChange={this.onChange}
                            error={ errors.description } 
                            info="Tell us about the program you were in."
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

Addeducation.propTypes ={
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired,
    addEducation:PropTypes.func.isRequired
}


const mapStateToProps = state =>({
    profile:state.profile,
    errors:state.errors
})

export default connect(mapStateToProps,{addEducation})(withRouter(Addeducation));