import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import "../../styles/Navbar.css"; 
import { resetFeed } from '../../features/feed/feedSlice';
import { resetProfile } from '../../features/profile/profileSlice';
import { logout } from '../../features/user/userSlice';
function Navbar() {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  const [hamburgerStyles, setHamburgerStyles] = useState(
		"hamburger-menu pointer"
	);
	const [menuStyles, setMenuStyles] = useState("menu hide-menu");

  const dispatch = useDispatch();

  const handleLogout = () => {    
    localStorage.removeItem('user');    
    dispatch(logout());
    dispatch(resetProfile());
    dispatch(resetFeed())
    navigate('/signin');
  };
	


	const hamburgerClickHandler = () => {
		if (hamburgerStyles.includes("click")) {
			setHamburgerStyles("hamburger-menu pointer");
			setMenuStyles("menu hide-menu");
		} else {
			setHamburgerStyles("hamburger-menu pointer click");
			setMenuStyles("menu show-menu");
		}
	};

	const menuHandler = () => {
		setHamburgerStyles("hamburger-menu pointer");
		setMenuStyles("menu hide-menu");
	};

	return (
		<nav className="navbar">
			<div className="container-center">
				<div
					className={hamburgerStyles}
					onClick={hamburgerClickHandler}
					id="menu-open-button"
					role="button"
				>
					<span className="hamburger-menu-line"></span>
					<span className="hamburger-menu-line"></span>
					<span className="hamburger-menu-line"></span>
				</div>

				<Link to="/" className="container-center brand-logo">
					<p className="brand-name">
						GARDENIN<span>DUNIYA</span>
					</p>
				</Link> 
        
			</div>
		
			<ul className={menuStyles} onClick={menuHandler} id="menu">
				
		{
			user.loggedInUser ?
				(<>
        <li className="menu-item">
					<b>
						<Link to="/">Home/Feed</Link> 
					</b>
				</li>
				
				<li className="menu-item">
					<b>
						<Link to="/searchuser">Search User</Link> 
					</b>
				</li>
				<li className="menu-item">
					<b>
						<Link to="/newpost">New Post</Link> 
					</b>
				</li>
				<li className="menu-item">
					<b>
						<Link to="/mynotes">Notifications</Link> 
					</b>
				</li>
				
        <li className="menu-item">
					<b onClick={()=>{navigate('/profile', {
                  state: { userId: user.loggedInUser._id },
                })}}>
						<Link to="">My Profile</Link>
					</b>
				</li>
        <li className="menu-item">
        <b onClick={() => handleLogout()}>
          <Link to="">Logout</Link>
        </b>
      </li></>
        
        ) :
				(<li className="menu-item">
				<b>
					<Link to="/signin">SignIn/SignUp</Link> 
				</b>
			</li>) }

				
			</ul>
		</nav>
	);

}

export default Navbar;
