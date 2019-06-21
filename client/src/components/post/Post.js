import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import {getPost} from '../../actions/postActions';
import PostItem from '../posts/PostItem';
import {Link} from 'react-router-dom';
import CommentForm from './commentForm';
import Commentfeed from './commentfeed';

class Post extends Component {

componentDidMount()
{
    this.props.getPost(this.props.match.params.id);
}

render() {
    const {post,isLoading}=this.props.post;
    let postContent;

    if(post === null || isLoading || Object.keys(post).length === 0)
    {
        postContent = <Spinner />
    }else{
        postContent=(
            <div>
                <PostItem post={post} showActions={false} />
                <CommentForm postId={post._id} />
                <Commentfeed postId={post._id} comments={post.comments} />
            </div>
        )
    }

    return (
      <div className="post">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <Link to="/feed" className="btn btn-light mb-3">
                    Back to feed
                    </Link>
                    {postContent}
                </div>
            </div>
        </div>
      </div>
    )
  }
}






Post.propTypes={
    getPost:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired
}

const mapStateToProps=state=>({
    post:state.post
});


export default connect(mapStateToProps,{getPost})(Post);