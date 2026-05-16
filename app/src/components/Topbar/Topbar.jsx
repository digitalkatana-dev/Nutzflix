import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import { setTheme, setDrawerOpen } from '../../redux/slices/appSlice';
import { setActiveUser, logout } from '../../redux/slices/userSlice';
import './topbar.scss';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuUnfoldOutlinedIcon from '@ant-design/icons/MenuFoldOutlined';
import SearchIcon from '@mui/icons-material/Search';

const Topbar = () => {
	const { theme } = useSelector((state) => state.app);
	const { activeUser } = useSelector((state) => state.user);
	const [isScrolled, setIsScrolled] = useState(false);
	const dispatch = useDispatch();

	const handleReset = (e) => {
		e.preventDefault();
		const newTheme = theme === 'light' ? 'dark' : 'light';
		dispatch(setTheme(newTheme));
	};

	const handleLogout = () => {
		dispatch(logout());
	};

	const handleDrawer = () => {
		dispatch(setDrawerOpen(true));
	};

	useEffect(() => {
		window.onscroll = () => {
			setIsScrolled(window.pageYOffset > 0 ? true : false);
			return () => (window.onscroll = null);
		};
	}, []);

	return (
		<header
			className={`topbar${isScrolled ? ' scrolled' : ''}${activeUser ? ' active' : ''}`}
		>
			<div className='mobile'>
				<IconButton sx={{ mr: 2 }} className='menu-btn' onClick={handleDrawer}>
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
							<img src={activeUser?.profilePhoto} alt='' />
							<div className='profile'>
								<ArrowDropDownIcon className='icon' />
								<div className='options'>
									<span onClick={handleReset}>Settings</span>
									<span onClick={handleLogout}>Logout</span>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</header>
	);
};

export default Topbar;
