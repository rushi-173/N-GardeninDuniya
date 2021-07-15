import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

function SuggestedUsers() {
  const [suggestedUsers, setSuggestUsers] = useState([]);
  const { loggedInUser } = useSelector(state => state.user);
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      (async function () {
        const response = await axios.get(
          `${API_URL}/users/suggested-users`
        );        
        setSuggestUsers(response.data.users);
      })();
    }
  }, [loggedInUser]);

  return ( 
    <div className="div-sm-parent" >
      {suggestedUsers.length > 0 && (
        <div className="container-space-around div-sm-child"
          style ={{display: isOpen ? 'block' : 'none',border:"1px solid grey", padding: "0.5rem 1rem"}}
        >
          
          <div className="container-space-between">
          <h3 >
            Suggested Users To Follow
          </h3>
          <button
              onClick={() => setIsOpen(false)}
              className="badge btn-danger"
            >
              <i class="fa fa-window-close" style={{ color: 'white' }}></i>
            </button>
            </div>
          <div className="container container-space-around"
          >
            {suggestedUsers?.map(user => {
              return (
                <div className="suggestion-div"
                  onClick={() =>
                    navigate('/profile', { state: { userId: user._id } })
                  }
                >
                   <div class="avatar avatar-xl">
        <img
						src={"https://www.shareicon.net/data/256x256/2016/02/22/722964_button_512x512.png"}
						alt="profile"
						className="avatar-img"

					/>
				</div>
                  <p><b>{user.name} </b></p>
                  <p>{user.username}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default SuggestedUsers;
