import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Divider, Stack } from '@mui/material';
import { setTheme, setViewMode } from '../../redux/slices/appSlice';
import { logout } from '../../redux/slices/userSlice';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import NavItem from '../NavItem';
import Helmet from '../../assets/Helmet.jpg';
import './leftnav.scss';

const LeftNav = () => {
	const { theme, viewMode, drawerOpen, roles } = useSelector(
		(state) => state.app,
	);
	const { activeUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleTheme = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark';
		dispatch(setTheme(newTheme));
	};

	const handleLogout = () => {
		dispatch(logout());
	};

	const handleViewMode = () => {
		const newMode = viewMode === 'admin' ? 'user' : 'admin';

		dispatch(setViewMode(newMode));
	};

	const listStyles = {
		my: 3,
		mx: 2.5,
		py: 2,
		px: 2.5,
		display: 'flex',
		borderRadius: 1.5,
		alignItems: 'center',
		bgcolor: 'var(--accent)',
	};

	return (
		<nav className={`leftnav${drawerOpen ? ' open' : ''}`}>
			<Box sx={listStyles}>
				<div className='profile'>
					<div className='user-info'>
						<Avatar src={activeUser?.profilePhoto || Helmet} />
						<h2>Nutz</h2>
					</div>
					<div className='profile-options'>
						<ArrowDropDownIcon className='icon' />
						<div className='options'>
							<span onClick={handleTheme}>Settings</span>
							<Divider />
							<span onClick={handleLogout}>Logout</span>
						</div>
					</div>
				</div>
			</Box>
			<Divider />
			<Box sx={listStyles}>
				<div className='search'>
					<SearchIcon className='icon' />
					<span>KID</span>
				</div>
			</Box>
			<Stack component='nav' spacing={0.5} sx={{ px: 2 }}>
				<NavItem page='Home' />
				<NavItem page='Series' />
				<NavItem page='Movies' />
				<NavItem page='My List' />
				{roles.includes(activeUser?.role) && (
					<NavItem page='Admin' link='/home-admin' onClick={handleViewMode} />
				)}
			</Stack>
		</nav>
	);
};

export default LeftNav;
