import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowDropDown, Notifications, Search } from '@mui/icons-material';
import { setTheme } from '../../redux/slices/appSlice';
import { setActiveUser, logout } from '../../redux/slices/userSlice';
import './topbar.scss';
import Helmet from '../../assets/Helmet.jpg';

const Topbar = () => {
	const { theme } = useSelector((state) => state.app);
	const { activeUser } = useSelector((state) => state.user);
	const [isScrolled, setIsScrolled] = useState(false);
	const dispatch = useDispatch();

	const handleReset = (e) => {
		e.preventDefault();
		const newTheme = theme === 'light' ? 'dark' : 'light';
		dispatch(setTheme(newTheme));
	};

	const handleLogout = () => {
		dispatch(logout());
	};

	useEffect(() => {
		window.onscroll = () => {
			setIsScrolled(window.pageYOffset > 0 ? true : false);
			return () => (window.onscroll = null);
		};
	}, []);

	return (
		<header
			className={`topbar${isScrolled ? ' scrolled' : ''}${activeUser ? ' active' : ''}`}
		>
			<div className='top-bar-wrapper'>
				<div className='left'>
					<h2 className='brand'>NUTZFLIX</h2>
					{activeUser && (
						<>
							<Link to='/home' className='link'>
								<span>Home</span>
							</Link>
							<Link to='/series' className='link'>
								<span>Series</span>
							</Link>
							<Link to='/movies' className='link'>
								<span>Movies</span>
							</Link>
							<span>New and Popular</span>
							<span>My List</span>
						</>
					)}
				</div>
				<div className='right'>
					{activeUser && (
						<>
							<Search className='icon' />
							<span>KID</span>
							<Notifications className='icon' />
							<img src={Helmet} alt='' />
							<div className='profile'>
								<ArrowDropDown className='icon' />
								<div className='options'>
									<span onClick={handleReset}>Settings</span>
									<span onClick={handleLogout}>Logout</span>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</header>
	);
};

export default Topbar;
