
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { follow, unFollow } from './profileSlice';

function ProfileHeader({ user, following }) {
  const { loggedInUser } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(user);

  return (    
      <div className="container-center pheader">
        <div class="avatar avatar-xl">
        <img
						src={"https://www.pngitem.com/pimgs/m/146-1468394_ic-account-box-48px-profile-picture-icon-square.png"}
						alt="profile"
						className="avatar-img"

					/>
				</div>
        <div className="container-center container-column">
          <h4 >
            @{user?.username}
          </h4>
          <div className="container container-center">
            <p style={{display:"inline-block", cursor:"pointer"}}
              onClick={() => navigate('/following', {state:{userId: user._id}})}
            >
              {user?.followingCount} following
            </p> &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
            <p style={{display:"inline-block", cursor:"pointer"}}
              onClick={() => navigate('/followers',{state:{userId: user._id}})}
            >
              {user?.followerCount} followers
            </p>
          </div> 
          <h4><b>{user?.name} </b></h4>
          {loggedInUser?._id !== user?._id && !following && (
            <button className="btn btn-outline-primary"
              onClick={() =>
                dispatch(
                  follow({
                    user: loggedInUser._id,
                    follows: user._id,
                  })
                )
              }
            >
              Follow
            </button>
          )}
          {loggedInUser?._id !== user?._id && following && (
            <button className="btn btn-primary"
              onClick={() =>
                dispatch(
                  unFollow({
                    user: loggedInUser._id,
                    follows: user._id,
                  })
                )
              }
            >
              Following
            </button>
          )}
        </div>
      </div>          
  );
}

export default ProfileHeader;
