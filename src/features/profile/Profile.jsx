
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Post from '../../common/post/Post';
import { fetchUser, fetchProfilePosts, resetProfile } from './profileSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import ProfileHeader from './ProfileHeader';

import Loader from "react-loader-spinner";
import { useToasts } from 'react-toast-notifications';

function Profile() {
  const loggedInUser = useSelector(state => state.user.loggedInUser);
  const [status, setStatus] = useState('idle');
  const {addToast} = useToasts;
  const { state } = useLocation();  
  const {
    state: { userId },
  } = useLocation();
  const { posts, user, following } = useSelector(state => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedInUser) {
      (async function () {
        try {
          setStatus('loading');
          unwrapResult(await dispatch(fetchProfilePosts(userId)));
          unwrapResult(await dispatch(fetchUser(userId)));
          setStatus('idle');
        } catch (error) {
          addToast( error.message,
            {appearance: 'error'});
        }
      })();
    }
    return () => {
      dispatch(resetProfile());
    };
  }, [loggedInUser, dispatch, userId]);

  return (
    <div classname="container-center profile-wrapper">
      {status === 'loading' && (
        <div className="profile-container">
          <Loader type="TailSpin" color="#51c84d" height={100} width={100} />
        </div>
      )}

      {status === 'idle' && (
        <div  className="profile-container">
          <ProfileHeader user={user} following={following}/>
          <h2>
            Timeline
          </h2>
          {posts.length === 0 && <center><h4>No Posts Yet</h4></center>}
          {posts.length > 0 && <div className="container-column" width="full" spacing={8} pt={8} pb={8}>
            {posts.map(post => {
              return (
                <Post
                  post={post}
                  key={post._id}
                  type="PROFILE POST"
                  userId={userId}
                />
              );
            })}
          </div>}
        </div>
      )}
    </div>
  );
}

export default Profile;
