import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class Profilegithub extends Component {
  constructor(props){
    super(props);
    this.state ={
      clientId:'4b1656cbfd9c8b2f7d8c',
      clientSecret:'16726c2d2a1b430034771a9725e92f24ad893fef',
      count:5,
      sort:'created: asc',
      repos:[]
    }
  }

  componentDidMount(){
    const username = this.props.username;
    const {count,sort,clientId,clientSecret} = this.state;

    fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
    .then(res =>res.json())
    .then(data =>{
      if(this.refs.myref){
        this.setState({repos:data});    //asynchronous call prevented
      }
    })
    .catch(err =>console.log(err))
  }

  render() {
    const  repos  = this.state.repos;

    const repoItems = repos.map(repo =>(
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link to={repo.html_url} className="text-info" target="_blank">
                {repo.name}
              </Link>
              {/* <h4>
              <a href={repo.html_url} target="_blank">
                {repo.name}
              </a> */}
            </h4>
            <p>
              {repo.description}
            </p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars:{ repo.stargazers_count }
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers:{ repo.watchers_count }
            </span>
            <span className="badge badge-success mr-1">
              Forks:{ repo.forks_count }
            </span>
          </div>
        </div>
      </div>
    ));

    return (
      <div ref="myref">
        <hr/>
        <h3 className="mb-4">Latest GitHub Repos</h3>
        {repoItems}
      </div>
    );
  }
}

Profilegithub.propTypes ={
  username:PropTypes.string.isRequired
}

export default Profilegithub;