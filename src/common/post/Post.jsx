import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isPostLikedByLoggedInUser } from '../../features/newpost/utils';
import { useNavigate } from 'react-router-dom';
import {
  createCommentOnFeedPost,
  createLikeOnFeedPost,
  removeLikeFromFeedPost,
} from '../../features/feed/feedSlice';
import {
  createCommentOnProfilePost,
  createLikeOnProfilePost,
  removeLikeFromProfilePost,
} from '../../features/profile/profileSlice';
import '../../styles/Post.css';
import { useToasts } from 'react-toast-notifications';

function Post({ post, type, userId }) {
  // const { content, media, user, time } = post;
  const feed = useSelector(state => state.feed);
  const {addToast} = useToasts();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const loggedInUser = useSelector(state => state.user.loggedInUser);
  const isPostLiked = isPostLikedByLoggedInUser(post, loggedInUser);

  const [showCommentsMenu, setShowCommentsMenu] = useState(false);

  const toggleCommentsMenu = () => {
    setShowCommentsMenu(prev => (prev === true ? false : true));
    console.log('calling tog 2', showCommentsMenu);
  };

  const handleCreateLike = async () => {
    if (type === 'FEED POST') {
      dispatch(createLikeOnFeedPost(post._id));
    } else if (type === 'PROFILE POST') {
      dispatch(createLikeOnProfilePost(post._id));
    }
  };

  const handleRemoveLike = async () => {
    if (type === 'FEED POST') {
      dispatch(removeLikeFromFeedPost(post._id));
    } else if (type === 'PROFILE POST') {
      dispatch(removeLikeFromProfilePost(post._id));
    }
  };

  const createComment = async commentData => {
    if (type === 'FEED POST') {
      dispatch(createCommentOnFeedPost(commentData));
    } else if (type === 'PROFILE POST') {
      dispatch(createCommentOnProfilePost(commentData));
    }
  };
  function cleanDate(d) {
    let dt =  new Date(d);
    return dt.toLocaleString()  
  }

  const handleComment = event => {
    if (content === '') {
      addToast(`Can't post empty comment`,{ appearance: 'error'});
      return;
    }
    createComment({
      postId: post._id,
      comment: { content, time: new Date(Date.now()) },
    });
    setContent('');
  };
  return (
    <div className="post" style={{width:"100vh"}}>
      <div className="post__profile" onClick={() =>
                      navigate('/profile', {
                        state: { userId: post.user._id },
                      })
                    }>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            className="img__profile"
            alt="profile"
            draggable="false"
            src="https://www.shareicon.net/data/256x256/2016/02/22/722964_button_512x512.png"
          />
          <p style={{ marginLeft: '1rem', fontSize: '0.8rem' }}>
            <b>{post.user.name} | </b>
            {post.user.username}
          </p>
        </div>
        <span>
          <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
        </span>
      </div>
      
      <div
        className="post__content"
        onClick={() =>
          navigate('/profile', {
            state: {
              userId: post.user._id,
            },
          })
        }
      >
        <h3>
          <b style={{color:"#aaa"}}> {post.user.name} : </b>
          {post.content}
        </h3>
      </div>
      <div className="post__activity__utilities">
        {!isPostLiked && (
          <button
            onClick={() => handleCreateLike()}
            className="btn btn-outline-danger"
          >
            <i className="fa fa-heart-o icon-left"></i>
            {post.likes.length}
          </button>
        )}
        {isPostLiked && (
          <button
            onClick={() => handleRemoveLike()}
            className="btn btn-danger"
          >
            <i className="fa fa-heart icon-left"></i>
            {post.likes.length}
          </button>
        )}
        <button onClick={toggleCommentsMenu} className="btn btn-primary">
          {post.comments.length} Comments
        </button>
       
      </div>
      {showCommentsMenu && (
          <div className="comments-menu">
            <div style={{height:"100%", width:"100%"}}>
              {post?.comments.map(comment => {
                return (
                    <div className="container-column comment-div" key={comment._id}>
                      <div style={{display:"flex", }}>
                        <p ><b>{comment.user.username} &bull; </b></p>
                        &nbsp; &nbsp; <p style={{color: "#888"}}>{cleanDate(comment.time)}</p>
                      </div>
                      <h3>{comment.content}</h3>
                    </div>
                );
              })}
            </div>
            <div
        className="container search-container"
        style={{ flexWrap: 'nowrap' }}

      >
        <div class="input-group" style={{ width: '90%', margin: '0' }}>
          <input
            id="name"
            type="search"
            value={content}
            class="input-area"
            style={{ borderRadius: '0px' }}
            onChange={e => {
              setContent(e.target.value);
            }}
            placeholder="Type comment here..."
            
          />
        </div>
        <button
          className="btn btn-primary"
          style={{ width: '10%', margin: '0', borderRadius: '0px' }}
          onClick={handleComment}
        >
          <i class="fa fa-paper-plane" aria-hidden="true"></i>
        </button>
      </div>
          </div>
        )}
    </div>
  );

}

export default Post;
