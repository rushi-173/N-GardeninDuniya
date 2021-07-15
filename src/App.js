import React, { useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import UserSignInPage from './features/user/UserSignInPage';
import UserSignUpPage from './features/user/UserSignUpPage';
import PageNotFound from './app/PageNotFound';
import { useDispatch, useSelector } from 'react-redux';
import { setupAuthExceptionHandler, setupAuthHeaderForServiceCalls } from './features/user/utils';
import { fetchUserData, logout } from './features/user/userSlice';
import Navbar from './app/navbar/Navbar';
import Profile from './features/profile/Profile';
import HomePage from './app/homepage/HomePage';
import FollowingUsersList from './features/profile/FollowingUsersList';
import FollowersLists from './features/profile/FollowersLists';
import "./styles/App.css";
import NewPostForm from './features/newpost/NewPostForm';
import SearchUser from './features/searchuser/SearchUser';
import { useToasts } from 'react-toast-notifications';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {addToast} = useToasts();
  
  const user = useSelector(state => state.user);

  useEffect(() => {
    (async function () {
      const userDataFromLocalStorageData = JSON.parse(localStorage.getItem('user'));
      if (userDataFromLocalStorageData) {
        setupAuthHeaderForServiceCalls(userDataFromLocalStorageData.token);
        setupAuthExceptionHandler(dispatch, logout, navigate, addToast);        
        await dispatch(fetchUserData());        
      } else {
        navigate("signin")
      }
    })()
  }, [])

  const PrivateRoute = ({ path, element, children }) => {
		if (user.loggedInUser) {
			return element || children;
		} else {
			return <Navigate to="/signin" state={{ from: path }} />;
		}
	};

  return (
    <div className="App div-sm-parent">
      <Navbar />
      <Routes>
        <PrivateRoute path="/" element={<HomePage />} />
        <PrivateRoute path="/newpost" element={<NewPostForm />} />
        <PrivateRoute path="/profile" element={<Profile />} />
        <PrivateRoute path="/searchuser" element={<SearchUser/>} />
        <PrivateRoute path="/following" element={<FollowingUsersList />} />
        <PrivateRoute path="/followers" element={<FollowersLists />} />
        <Route path="/signin" element={<UserSignInPage />} />
        <Route path="/signup" element={<UserSignUpPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
