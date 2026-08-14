import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Avatar, Box, Divider, IconButton, Stack } from '@mui/material';
import { setDrawerOpen } from '../../../../redux/slices/appSlice';
import { logout } from '../../../../redux/slices/userSlice';
import {
	setSelectedVideo,
	setSearchTerm,
	videoSearch,
	seriesSearch,
	clearSearchResults,
	clearAllSelected,
	setSelectedSeries,
} from '../../../../redux/slices/videoSlice';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import TextInput from '../../../../components/TextInput';
import NavItem from '../../../../components/NavItem';
import VideoItemV from '../../../../components/VideoItemV';
import './userSide.scss';

const UserSide = () => {
	const { drawerOpen, roles } = useSelector((state) => state.app);
	const { activeUser } = useSelector((state) => state.user);
	const { searchTerm, searchResults } = useSelector((state) => state.video);
	const timerRef = useRef(null);
	const location = useLocation();
	const dispatch = useDispatch();

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
				if (location.pathname === '/series') {
					dispatch(seriesSearch(inputValue.trim()));
				} else {
					dispatch(videoSearch(inputValue.trim()));
				}
			}
		}, 1000);

		dispatch(setSearchTerm(inputValue));
	};

	const handleSelected = (selected) => {
		if (selected.videoType.toLowerCase() === 'series') {
			dispatch(setSelectedSeries(selected));
		} else if (selected.videoType.toLowerCase() === 'movie') {
			dispatch(setSelectedVideo(selected));
		}
		dispatch(setDrawerOpen(false));
		dispatch(setSearchTerm(''));
		dispatch(clearSearchResults());
	};

	const handleDrawer = () => {
		dispatch(setDrawerOpen(false));
		setTimeout(() => {
			dispatch(clearAllSelected());
		}, 1000);
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
						<h2>{activeUser?.firstName}</h2>
					</div>
					<IconButton onClick={handleLogout}>
						<LogoutIcon className='logout-icon' />
					</IconButton>
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
						<VideoItemV
							key={r._id}
							link={
								r.videoType.toLowerCase() === 'series'
									? '/series-details'
									: r.videoType.toLowerCase() === 'movie' && '/video-details'
							}
							image={
								r.videoType.toLowerCase() === 'series' ? r.folder : r.poster
							}
							alt={r.title}
							itmClass='side-item'
							onClick={() => handleSelected(r)}
							elevation={5}
						/>
					))}
				</div>
			)}
			<Stack component='nav' spacing={0.5} sx={{ px: 2 }}>
				<NavItem page='Home' link='/home-user' onClick={handleDrawer} />
				<NavItem page='Series' link='/series' onClick={handleDrawer} />
				<NavItem page='Movies' link='/movies' onClick={handleDrawer} />
				<NavItem page='My List' onClick={handleDrawer} />
				{roles.includes(activeUser?.role) && (
					<NavItem page='Admin' link='/home-admin' onClick={handleDrawer} />
				)}
			</Stack>
		</div>
	);
};

export default UserSide;
