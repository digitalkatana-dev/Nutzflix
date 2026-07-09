import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { setTheme, setDrawerOpen } from '../../../../redux/slices/appSlice';
import { logout } from '../../../../redux/slices/userSlice';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import PlayIcon from '@mui/icons-material/PlayCircleOutlined';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NavItem from '../../../../components/NavItem';
import './adminSide.scss';

const AdminSide = () => {
	const { theme, drawerOpen } = useSelector((state) => state.app);

	const dispatch = useDispatch();

	const handleDrawer = () => {
		dispatch(setDrawerOpen(false));
	};

	const handleTheme = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark';
		dispatch(setTheme(newTheme));
		dispatch(setDrawerOpen(false));
	};

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<nav id='admin-side' className={drawerOpen ? 'open' : ''}>
			<Box sx={{ pt: '15px', pl: '15px' }}>
				<p className='label'>Main</p>
				<NavItem
					admin
					link='/home-admin'
					className='router-link'
					icon={<DashboardIcon className='icon' />}
					label='Dashboard'
					onClick={handleDrawer}
				/>
				<p className='label'>QUICK MENU</p>
				<NavItem
					admin
					link='/home-user'
					className='router-link'
					icon={<PersonOutlineIcon className='icon' />}
					label='User Home'
				/>
				<NavItem
					admin
					link='/subs'
					className='router-link'
					icon={<PersonOutlineIcon className='icon' />}
					label='Subscribers'
					onClick={handleDrawer}
				/>
				<NavItem
					admin
					link='/inventory'
					className='router-link'
					icon={<PlayIcon className='icon' />}
					label='Inventory'
					onClick={handleDrawer}
				/>
				<p className='label'>USEFUL</p>
				<NavItem
					admin
					icon={<InsertChartIcon className='icon' />}
					label='Stats'
					onClick={handleDrawer}
				/>
				<NavItem
					admin
					icon={<NotificationsNoneIcon className='icon' />}
					label='Notificaitons'
					onClick={handleDrawer}
				/>
				<p className='label'>SERVICE</p>
				<NavItem
					admin
					icon={<SettingsSystemDaydreamOutlinedIcon className='icon' />}
					label='System Health'
					onClick={handleDrawer}
				/>
				<NavItem
					admin
					icon={<PsychologyOutlinedIcon className='icon' />}
					label='Logs'
					onClick={handleDrawer}
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
					onClick={handleDrawer}
				/>
				<NavItem
					admin
					icon={<ExitToAppIcon className='icon' />}
					label='Logout'
					onClick={handleLogout}
				/>
			</Box>
		</nav>
	);
};

export default AdminSide;
