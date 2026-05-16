import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Divider, Drawer, Stack } from '@mui/material';
import { setTheme, setDrawerOpen } from '../../redux/slices/appSlice';
import { logout } from '../../redux/slices/userSlice';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import NavItem from '../NavItem';
import './sideNav.scss';
import Helmet from '../../assets/Helmet.jpg';

const SideNav = () => {
	const { theme, drawerOpen } = useSelector((state) => state.app);
	const { activeUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(setDrawerOpen());
	};

	const handleTheme = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark';
		dispatch(setTheme(newTheme));
	};

	const handleLogout = () => {
		dispatch(logout());
	};

	const boxStyles = {
		flexShrink: { lg: 0 },
		width: { lg: 280 },
	};

	const listStyles = {
		my: 3,
		mx: 2.5,
		py: 2,
		px: 2.5,
		display: 'flex',
		borderRadius: 1.5,
		alignItems: 'center',
		bgcolor: 'rgba(171, 171, 171, .12)',
	};

	return (
		<Box sx={boxStyles}>
			<Drawer
				open={drawerOpen}
				onClose={handleClose}
				slotProps={{
					paper: {
						sx: {
							width: 280,
							backgroundColor: 'transparent',
							boxShadow: 'none',
						},
					},
				}}
			>
				<div
					className='drawer-spacer'
					style={{
						height: '95px',
					}}
				/>
				<div className='drawer-content'>
					<Box sx={listStyles}>
						<div className='profile'>
							<div className='user-info'>
								<img
									src={
										activeUser?.profilePhoto.replace(
											'http://localhost:3005',
											'https://nutzflix-backend.onrender.com',
										) | Helmet
									}
									alt=''
								/>
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
					</Stack>
				</div>
			</Drawer>
		</Box>
	);
};

export default SideNav;
