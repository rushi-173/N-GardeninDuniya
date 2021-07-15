
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedPosts, initPosts } from './feedSlice';
import Post from '../../common/post/Post';

import Loader from "react-loader-spinner";

function Feed() {
  const feed = useSelector(state => state.feed);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.loggedInUser !== null) {      
      (async function () {        
        await dispatch(initPosts());        
      })();
    }
  }, [user.loggedInUser]);

  return (
         
    <>
      <div className="div-sm-parent container-column">
        <h2>Feed</h2>
        {feed.posts.map(post => {
          return (
            <Post
              post={post}
              key={post._id}
              type="FEED POST"
            />
          );
        })}
      </div>
      <div pb={4} mt={4}>
        {feed.next !== 0 && feed.next !== null && feed.status !== 'loading' && (
          <button className="btn btn-primary" onClick={() => dispatch(fetchFeedPosts())}>Show More</button>
        )}
        {feed.next === null && (
            <p>You are all caught up. No more posts to show.</p>
        )}
      </div>
      {(feed.status === 'loading' || user.status === 'loading') && (
        <>
          <Loader type="TailSpin" color="#fff" height={20} width={20} />
        </>
      )}
    </>
  );
}

export default Feed;
