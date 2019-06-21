import React, { Component } from 'react'
import PropTypes from 'prop-types';
import CommentItem from './commentItem';

class Commentfeed extends Component {
  render() {
   const {comments,postId} = this.props;

    return comments.map(comment => 
    <CommentItem key={comment._id} comment={comment} postId={postId} 
    />);
  }
}

Commentfeed.propTypes ={
    comments:PropTypes.array.isRequired,
    postId:PropTypes.string.isRequired
}

export default Commentfeed;