import React, { Component } from 'react'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import {DeleteEducation} from '../../actions/profileActions';
import PropTypes from 'prop-types';

class Education extends Component {
    onDeleteClick(id){
        this.props.DeleteEducation(id);
    }

    render() {
      const education = this.props.education.map(edu =>(
          <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>
                
                <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{' '}
                { edu.to === null ? ('Now') : (
                <Moment format="DD/MM/YYYY">{edu.to}</Moment>
                )}
            </td>
            <td>
                <button onClick={this.onDeleteClick.bind(this,edu._id)} className="btn btn-danger">Delete</button>
            </td>
          </tr>
      ))
    return (
      <div>
            <h4>Education Credentials</h4>
            <table className="table">
            <tbody>
                <tr>
                    <th>School</th>
                    <th>Degree</th>
                    <th>Years</th>
                </tr>
                    {education}
            </tbody>
            </table>
      </div>
    );
  }
}

Education.propTypes = {
    DeleteEducation: PropTypes.func.isRequired
};

export default connect(null,{DeleteEducation})(Education);