import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PostForm from './postform';
import Spinner from '../common/Spinner';
import {getPosts}  from '../../actions/postActions';
import Postfeed from './Postfeed';

class Posts extends Component {

componentDidMount()
{
    this.props.getPosts();
}


  render() {
      const {posts,isLoading}=this.props.post;
      let postcontent;

      if(posts === null || isLoading)
      {
          postcontent=<Spinner />
      }
      else{
           postcontent=<Postfeed posts={posts}/>
      }
      return (
        <div className="feed">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <PostForm />
                        {postcontent}
                    </div>
                </div>
            </div>
        </div>
    ) 
  }
}
Posts.propTypes ={
    post:PropTypes.object.isRequired,    
    getPosts:PropTypes.func.isRequired
}


const mapStateToProps = state =>({
    post:state.post,
})


export default connect(mapStateToProps,{getPosts})(Posts);