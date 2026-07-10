import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Avatar, Box, IconButton } from '@mui/material';
import { setTheme, setDrawerOpen } from '../../../../redux/slices/appSlice';
import {
	setSearchTerm,
	videoSearch,
	clearSearchResults,
} from '../../../../redux/slices/videoSlice';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import TextInput from '../../../../components/TextInput';
import './adminTop.scss';

const AdminTop = () => {
	const { theme, drawerOpen } = useSelector((state) => state.app);
	const { activeUser } = useSelector((state) => state.user);
	const { searchTerm } = useSelector((state) => state.video);
	const timerRef = useRef(null); // changed from `let timer;`
	const dispatch = useDispatch();
	const location = useLocation();

	const handleDrawer = () => {
		dispatch(setDrawerOpen(!drawerOpen));
	};

	const toggleTheme = (e) => {
		e.preventDefault();
		const newTheme = theme === 'light' ? 'dark' : 'light';
		dispatch(setTheme(newTheme));
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
					{location?.pathname === '/inventory' && (
						<div className='admin-search'>
							<TextInput
								variant='outlined'
								placeholder='Search...'
								value={searchTerm}
								leftIcon={<SearchIcon className='icon' />}
								onChange={handleChange}
							/>
						</div>
					)}
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
