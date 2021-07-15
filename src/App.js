import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import UserSignInPage from './features/user/UserSignInPage';
import UserSignUpPage from './features/user/UserSignUpPage';
import PageNotFound from './app/PageNotFound';
import { useDispatch } from 'react-redux';
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

  return (
    <div className="App div-sm-parent">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/newpost" element={<NewPostForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/searchuser" element={<SearchUser/>} />
        <Route path="/following" element={<FollowingUsersList />} />
        <Route path="/followers" element={<FollowersLists />} />
        <Route path="/signin" element={<UserSignInPage />} />
        <Route path="/signup" element={<UserSignUpPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
