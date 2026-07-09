import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Box, Divider, Stack } from '@mui/material';
import { setTheme, setDrawerOpen } from '../../../../redux/slices/appSlice';
import { logout } from '../../../../redux/slices/userSlice';
import {
	setSelectedVideo,
	setSearchTerm,
	videoSearch,
	clearSearchResults,
} from '../../../../redux/slices/videoSlice';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import TextInput from '../../../../components/TextInput';
import Paper from '../../../../components/Paper';
import NavItem from '../../../../components/NavItem';
import './userSide.scss';

const UserSide = () => {
	const { theme, drawerOpen, roles } = useSelector((state) => state.app);
	const { activeUser } = useSelector((state) => state.user);
	const { searchTerm, searchResults } = useSelector((state) => state.video);
	const timerRef = useRef(null);
	const dispatch = useDispatch();

	const handleTheme = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark';
		dispatch(setTheme(newTheme));
		dispatch(setDrawerOpen(false));
	};

	const handleLogout = () => {
		dispatch(logout());
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

	const handleSelectedVideo = (video) => {
		dispatch(setSelectedVideo(video));
		dispatch(setDrawerOpen(false));
		dispatch(setSearchTerm(''));
		dispatch(clearSearchResults());
	};

	const handleDrawer = () => {
		dispatch(setDrawerOpen(false));
	};

	const listStyles = {
		my: 3,
		mx: 2.5,
		display: 'flex',
		borderRadius: 1.5,
		alignItems: 'center',
		bgcolor: 'rgba(171, 171, 171, .12)',
	};

	const searchStyles = {
		my: 3,
		mx: 2.5,
		borderRadius: 1.5,
		bgcolor: 'rgba(171, 171, 171, .12)',
	};

	return (
		<div id='user-side' className={drawerOpen ? 'open' : ''}>
			<Box sx={listStyles}>
				<div className='profile'>
					<div className='user-info'>
						<Avatar src={activeUser?.profilePhoto} />
						<h2>{activeUser?.firstName || 'Nutz'}</h2>
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
			<Box sx={searchStyles}>
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
			</Box>
			{drawerOpen && searchResults.length > 0 && (
				<div className='search-results'>
					{searchResults.map((r) => (
						<Link to='/video-details' onClick={() => handleSelectedVideo(r)}>
							<Paper key={r._id} className='poster-wrapper' elevation={5}>
								<img src={r.poster} alt={r.title} />
							</Paper>
						</Link>
					))}
				</div>
			)}
			<Stack component='nav' spacing={0.5} sx={{ px: 2 }}>
				<NavItem page='Home' link='/home-user' onClick={handleDrawer} />
				<NavItem page='Series' onClick={handleDrawer} />
				<NavItem page='Movies' onClick={handleDrawer} />
				<NavItem page='My List' onClick={handleDrawer} />
				{roles.includes(activeUser?.role) && (
					<NavItem page='Admin' link='/home-admin' onClick={handleDrawer} />
				)}
			</Stack>
		</div>
	);
};

export default UserSide;
