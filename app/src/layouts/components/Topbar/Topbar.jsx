import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Box, IconButton } from '@mui/material';
import {
	setTheme,
	setViewMode,
	setDrawerOpen,
} from '../../../redux/slices/appSlice';
import {
	setSearchTerm,
	videoSearch,
	clearSearchResults,
} from '../../../redux/slices/videoSlice';
import { logout } from '../../../redux/slices/userSlice';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import TextInput from '../../../components/TextInput';
import './topbar.scss';

const Topbar = () => {
	const { theme, viewMode, roles, drawerOpen } = useSelector(
		(state) => state.app,
	);
	const { activeUser } = useSelector((state) => state.user);
	const { searchTerm } = useSelector((state) => state.video);
	const [isScrolled, setIsScrolled] = useState(false);
	const timerRef = useRef(null); // changed from `let timer;`
	const dispatch = useDispatch();

	const toggleTheme = (e) => {
		e.preventDefault();
		const newTheme = theme === 'light' ? 'dark' : 'light';
		dispatch(setTheme(newTheme));
	};

	const handleViewMode = () => {
		const newView = viewMode === 'admin' ? 'user' : 'admin';
		dispatch(setViewMode(newView));
	};

	const handleLogout = () => {
		dispatch(logout());
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
				dispatch(videoSearch(inputValue.trim()));
			}
		}, 1000);

		dispatch(setSearchTerm(inputValue));
	};
	useEffect(() => {
		window.onscroll = () => {
			setIsScrolled(window.pageYOffset > 0 ? true : false);
			return () => (window.onscroll = null);
		};
	}, []);

	return (
		<header
			id='topbar'
			className={
				roles.includes(activeUser?.role) && viewMode === 'admin'
					? 'admin'
					: `${isScrolled ? 'scrolled ' : ''}${activeUser ? 'active ' : ''}`
			}
		>
			<div className='mobile-wrapper'>
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
			<div className='desktop-wrapper'>
				{roles.includes(activeUser?.role) && viewMode === 'admin' ? (
					<>
						<div className='brand-wrapper'>
							<Box
								sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}
							>
								<h2 className='brand'>NUTZFLIX</h2>
							</Box>
						</div>
						<Box
							sx={{
								display: 'flex',
								flexGrow: 1,
								justifyContent: 'flex-end',
								alignItems: 'center',
								gap: '15px',
							}}
						>
							<div className='admin-search'>
								<TextInput
									placeholder='Search...'
									rightIcon={<SearchIcon className='icon' />}
								/>
							</div>
							<div className='admin-items'>
								<div className='admin-item'>
									<DarkModeOutlinedIcon
										className='icon'
										onClick={toggleTheme}
									/>
								</div>
								<div className='admin-item'>
									<Avatar
										src={activeUser?.profilePhoto}
										alt=''
										className='avatar'
									/>
								</div>
							</div>
						</Box>
					</>
				) : (
					<>
						<div className='left'>
							<h2 className='brand'>NUTZFLIX</h2>
							{activeUser && (
								<>
									<Link to='/home-user' className='link'>
										<span>Home</span>
									</Link>
									<Link to='/series' className='link'>
										<span>Series</span>
									</Link>
									<Link to='/movies' className='link'>
										<span>Movies</span>
									</Link>
									<span>My List</span>
									{roles.includes(activeUser?.role) && (
										<Link
											to='/home-admin'
											className='link'
											onClick={handleViewMode}
										>
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
											placeholder='Search'
											value={searchTerm}
											leftIcon={<SearchIcon className='icon' />}
											onChange={handleChange}
										/>
									</div>
									<Avatar src={activeUser?.profilePhoto} alt='' />
									<div className='profile'>
										<ArrowDropDownIcon className='icon' />
										<div className='options'>
											<span onClick={handleViewMode}>Settings</span>
											<span onClick={handleLogout}>Logout</span>
										</div>
									</div>
								</>
							)}
						</div>
					</>
				)}
			</div>
		</header>
	);
};

export default Topbar;
