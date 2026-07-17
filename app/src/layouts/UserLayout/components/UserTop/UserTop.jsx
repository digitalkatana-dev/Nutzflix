import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, Box, IconButton } from '@mui/material';
import { setTheme, setDrawerOpen } from '../../../../redux/slices/appSlice';
import {
	setSearchTerm,
	videoSearch,
	seriesSearch,
	clearSearchResults,
	clearAllSelected,
} from '../../../../redux/slices/videoSlice';
import { logout } from '../../../../redux/slices/userSlice';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TextInput from '../../../../components/TextInput';
import './userTop.scss';

const UserTop = () => {
	const { theme, drawerOpen, roles } = useSelector((state) => state.app);
	const { activeUser } = useSelector((state) => state.user);
	const { searchTerm } = useSelector((state) => state.video);
	const [isScrolled, setIsScrolled] = useState(false);
	const timerRef = useRef(null); // changed from `let timer;`
	const location = useLocation();
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(clearAllSelected());
	};

	const handleDrawer = () => {
		dispatch(setDrawerOpen(!drawerOpen));
	};

	const handleChange = (e) => {
		const inputValue = e.target.value;
		clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => {
			if (inputValue.trim() === '') {
				dispatch(clearSearchResults());
			} else {
				if (location.pathname === '/series') {
					dispatch(seriesSearch(inputValue.trim()));
				} else {
					dispatch(videoSearch(inputValue.trim()));
				}
			}
		}, 1000);

		dispatch(setSearchTerm(inputValue));
	};

	const toggleTheme = (e) => {
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
			id='user-top'
			className={`${isScrolled ? 'scrolled ' : ''}${activeUser ? 'active' : ''}`}
		>
			<div className='mobile'>
				<IconButton
					sx={{ mr: 2, ml: 2 }}
					className='menu-btn'
					onClick={handleDrawer}
				>
					<MenuIcon />
				</IconButton>
				<div className='brand-wrapper'>
					<Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
						<h2 className='brand'>NUTZFLIX</h2>
					</Box>
				</div>
			</div>
			<div className='ut-wrapper'>
				<div className='left'>
					<h2 className='brand'>NUTZFLIX</h2>
					{activeUser && (
						<>
							<Link to='/home-user' className='link' onClick={handleClick}>
								<span>Home</span>
							</Link>
							<Link to='/series' className='link' onClick={handleClick}>
								<span>Series</span>
							</Link>
							<Link to='/movies' className='link' onClick={handleClick}>
								<span>Movies</span>
							</Link>
							<Link to='/list' className='link' onClick={handleClick}>
								<span>My List</span>
							</Link>
							{roles.includes(activeUser?.role) && (
								<Link to='/home-admin' className='link' onClick={handleClick}>
									<span>Admin</span>
								</Link>
							)}
						</>
					)}
				</div>
				<div className='right'>
					{activeUser && (
						<>
							<div className='search'>
								<TextInput
									style={{ margin: 'auto' }}
									variant='outlined'
									placeholder='Search...'
									value={searchTerm}
									leftIcon={<SearchIcon className='icon' />}
									onChange={handleChange}
								/>
							</div>
							<Avatar src={activeUser?.profilePhoto} alt='' />
							<div className='profile'>
								<ArrowDropDownIcon className='icon' />
								<div className='options'>
									<span onClick={toggleTheme}>Settings</span>
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

export default UserTop;
