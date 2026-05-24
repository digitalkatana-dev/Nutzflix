import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Box, IconButton } from '@mui/material';
import {
	setTheme,
	setViewMode,
	setDrawerOpen,
} from '../../redux/slices/appSlice';
import { logout } from '../../redux/slices/userSlice';
import './topbar.scss';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuUnfoldOutlinedIcon from '@ant-design/icons/MenuFoldOutlined';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import TextInput from '../TextInput';
import Helmet from '../../assets/Helmet.jpg';

const Topbar = () => {
	const { theme, viewMode, roles, drawerOpen } = useSelector(
		(state) => state.app,
	);
	const { activeUser } = useSelector((state) => state.user);
	const [isScrolled, setIsScrolled] = useState(false);
	const dispatch = useDispatch();

	const toggleMode = (e) => {
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

	useEffect(() => {
		window.onscroll = () => {
			setIsScrolled(window.pageYOffset > 0 ? true : false);
			return () => (window.onscroll = null);
		};
	}, []);

	if (roles.includes(activeUser?.role) && viewMode === 'admin') {
		return (
			<div className='admin-topbar'>
				<IconButton
					sx={{ mr: 2, ml: 2 }}
					className='admin-menu-btn'
					onClick={handleDrawer}
				>
					<MenuUnfoldOutlinedIcon />
				</IconButton>
				<div className='admin-topbar-wrapper'>
					<div className='brand-wrapper'>
						<span className='brand'>NUTZFLIX</span>
					</div>
					<div className='admin-search'>
						<TextInput
							placeholder='Search...'
							rightIcon={<SearchIcon className='icon' />}
						/>
					</div>
					<div className='admin-items'>
						<div className='admin-item'>
							<DarkModeOutlinedIcon className='icon' onClick={toggleMode} />
						</div>
						<div className='admin-item'>
							<Avatar
								src={activeUser?.profilePhoto}
								alt=''
								className='avatar'
							/>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<header
				className={`topbar${isScrolled ? ' scrolled' : ''}${activeUser ? ' active' : ''}`}
			>
				<div className='mobile'>
					<IconButton
						sx={{ mr: 2 }}
						className='menu-btn'
						onClick={handleDrawer}
					>
						<MenuUnfoldOutlinedIcon />
					</IconButton>
					<Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
						<h2 className='brand'>NUTZFLIX</h2>
					</Box>
				</div>
				<div className='desktop'>
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
									<SearchIcon className='icon' />
									<span>KID</span>
								</div>
								<Avatar src={activeUser?.profilePhoto || Helmet} alt='' />
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
				</div>
			</header>
		);
	}
};

export default Topbar;
