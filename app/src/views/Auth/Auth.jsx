import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, resetApp } from '../../redux/slices/appSlice';
import { setActiveUser } from '../../redux/slices/userSlice';
import './auth.scss';
import Topbar from '../../components/Topbar';
import Paper from '../../components/Paper';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

const Auth = () => {
	const { theme } = useSelector((state) => state.app);
	const dispatch = useDispatch();

	const handleSubmit = () => {
		dispatch(setActiveUser());
	};

	const handleReset = (e) => {
		e.preventDefault();
		const newTheme = theme === 'light' ? 'dark' : 'light';
		dispatch(setTheme(newTheme));
	};

	return (
		<div className='auth'>
			<Topbar />
			<div className='wrapper'>
				<Paper elevation={0}>
					<h1>Sign In</h1>
					<form action='' onSubmit={handleSubmit}>
						<TextInput type='email' placeholder='Email' />
						<TextInput type='password' placeholder='Password' />
						<Button type='submit'>Sign In</Button>
					</form>
					<span>
						New to Nutzflix? <b>Sign up now.</b>
					</span>
					<small>
						This is protected by the Red, the Track, and Tical. With a key.
					</small>
				</Paper>
			</div>
		</div>
	);
};

export default Auth;
