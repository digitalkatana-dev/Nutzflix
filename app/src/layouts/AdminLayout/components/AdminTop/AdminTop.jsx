import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, IconButton } from '@mui/material';
import { setTheme, setDrawerOpen } from '../../../../redux/slices/appSlice';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import TextInput from '../../../../components/TextInput';
import './adminTop.scss';

const AdminTop = () => {
	const { theme, drawerOpen } = useSelector((state) => state.app);
	const { activeUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleDrawer = () => {
		dispatch(setDrawerOpen(!drawerOpen));
	};

	const toggleTheme = (e) => {
		e.preventDefault();
		const newTheme = theme === 'light' ? 'dark' : 'light';
		dispatch(setTheme(newTheme));
	};

	return (
		<header id='admin-top' className={activeUser ? 'active' : ''}>
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
			<div className='at-wrapper'>
				<div className='brand-wrapper'>
					<Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
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
							<DarkModeOutlinedIcon className='icon' onClick={toggleTheme} />
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
			</div>
		</header>
	);
};

export default AdminTop;
