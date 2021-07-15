import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation,useNavigate  } from 'react-router-dom';
import { API_URL } from '../../config';

import Loader from "react-loader-spinner";
function FollowersLists() {
  const [followersList, setFollowersList] = useState([]);
  const [status, setStatus] = useState('idle');
  const navigate = useNavigate();
  const {state:{userId}} = useLocation();

  useEffect(() => {
    (async function () {
      setStatus('loading');
      const response = await axios.get(
        `${API_URL}/user-connections?userId=${userId}&&type=follower`
      );      
      setFollowersList(response.data.followers);
      setStatus('idle');
    })();
  }, []);

  return (
    <>
      {status === 'loading' && (
        <div className="container-center">
         <Loader type="TailSpin" color="#51c84d" height={100} width={100} />
      </div>
      )}
      {status === 'idle' && (
           <div className="div-sm-parent">
           <ul className="list-group div-sm-child">
        
            {followersList.map(follower => {
              return (
                <li key={follower._id} className="list-group-item">
                  <div
                    onClick={() =>
                      navigate('/profile', {
                        state: { userId: follower.user._id },
                      })
                    }
                    className="f-user-card"
                  >
                    <div class="avatar avatar-sm">
                      <img
                        src={ 'https://www.shareicon.net/data/256x256/2016/02/22/722964_button_512x512.png'
                        }
                        alt={follower.user.name}
                        className="avatar-img"
                      />
                    </div>
                    <div className="container-column">
                      <p>
                        <b>{follower.user.name}</b>
                      </p>
                      <p>{follower.user.username}</p>
                    </div>
                  </div>
                </li>
               
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default FollowersLists;
