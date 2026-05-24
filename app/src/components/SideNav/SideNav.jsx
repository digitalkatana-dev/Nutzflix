import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Divider, Stack } from '@mui/material';
import { setTheme, setViewMode } from '../../redux/slices/appSlice';
import { logout } from '../../redux/slices/userSlice';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ListIcon from '@mui/icons-material/List';
import PlayIcon from '@mui/icons-material/PlayCircleOutlined';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NavItem from '../NavItem';
import Drawer from '../Drawer';
import './sideNav.scss';
import Helmet from '../../assets/Helmet.jpg';

const SideNav = () => {
	const { theme, viewMode, drawerOpen, roles } = useSelector(
		(state) => state.app,
	);
	const { activeUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleTheme = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark';
		dispatch(setTheme(newTheme));
	};

	const handleViewMode = () => {
		const newMode = viewMode === 'admin' ? 'user' : 'admin';

		dispatch(setViewMode(newMode));
	};

	const handleLogout = () => {
		dispatch(logout());
	};

	const boxStyles = {
		flexShrink: { lg: 0 },
		width: { sm: 280 },
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

	const drawerContent = (
		<div className='admin-drawer-content'>
			{/* <Box
				sx={{
					height: '50px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					borderBottom: '1px ridge rgb(230, 227, 227)',
				}}
			>
				<span className='brand'>NUTZFLIX</span>
			</Box> */}
			<Box sx={{ pt: '15px', pl: '15px' }}>
				<p className='label'>Main</p>
				<NavItem
					admin
					icon={<DashboardIcon className='icon' />}
					label='Dashboard'
				/>
				<p className='label'>QUICK MENU</p>
				<NavItem
					admin
					link='/home-user'
					className='router-link'
					icon={<PersonOutlineIcon className='icon' />}
					label='User Home'
					onClick={handleViewMode}
				/>
				<NavItem
					admin
					link='/subs'
					linkState={{ dataType: 'subs' }}
					className='router-link'
					icon={<PersonOutlineIcon className='icon' />}
					label='Subscribers'
				/>
				<NavItem
					admin
					link='/videos'
					linkState={{ dataType: 'videos' }}
					className='router-link'
					icon={<PlayIcon className='icon' />}
					label='Videos'
				/>
				<NavItem
					admin
					link='/lists'
					linkState={{ dataType: 'lists' }}
					className='router-link'
					icon={<ListIcon className='icon' />}
					label='Lists'
				/>
				<NavItem
					admin
					icon={<LocalShippingIcon className='icon' />}
					label='Delivery'
				/>
				<p className='label'>USEFUL</p>
				<NavItem
					admin
					icon={<InsertChartIcon className='icon' />}
					label='Stats'
				/>
				<NavItem
					admin
					icon={<NotificationsNoneIcon className='icon' />}
					label='Notificaitons'
				/>
				<p className='label'>SERVICE</p>
				<NavItem
					admin
					icon={<SettingsSystemDaydreamOutlinedIcon className='icon' />}
					label='System Health'
				/>
				<NavItem
					admin
					icon={<PsychologyOutlinedIcon className='icon' />}
					label='Logs'
				/>
				<NavItem
					admin
					icon={<SettingsApplicationsIcon className='icon' />}
					label='Settings'
					onClick={handleTheme}
				/>
				<p className='label'>USER</p>
				<NavItem
					admin
					icon={<AccountCircleOutlinedIcon className='icon' />}
					label='Profile'
				/>
				<NavItem
					admin
					icon={<ExitToAppIcon className='icon' />}
					label='Logout'
					onClick={handleLogout}
				/>
			</Box>
		</div>
	);

	if (roles.includes(activeUser?.role) && viewMode === 'admin') {
		return (
			<div className='admin-side-nav'>
				<Drawer open={drawerOpen} variant='temporary'>
					{drawerContent}
				</Drawer>
				<Drawer variant='permanent'>{drawerContent}</Drawer>
			</div>
		);
	} else {
		return (
			<Box sx={boxStyles}>
				<Drawer open={drawerOpen} variant='temporary'>
					<div
						className='drawer-spacer'
						style={{
							height: '95px',
						}}
					/>
					<div className='user-drawer-content'>
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
								<NavItem
									page='Admin'
									link='/home-admin'
									onClick={handleViewMode}
								/>
							)}
						</Stack>
					</div>
				</Drawer>
			</Box>
		);
	}
};

export default SideNav;
