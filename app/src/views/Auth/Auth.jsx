import React from 'react';
import { useDispatch } from 'react-redux';
import { resetApp } from '../../redux/slices/appSlice';
import './auth.scss';
import Header from '../../components/Header';
import Paper from '../../components/Paper';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

const Auth = () => {
	const dispatch = useDispatch();

	const handleReset = () => {
		dispatch(resetApp());
	};
	return (
		<div className='auth'>
			<Header />
			<div className='wrapper'>
				<Paper className='dark' elevation={5}>
					<h1>Sign In</h1>
					<form action=''>
						<TextInput type='email' placeholder='Email' />
						<TextInput type='password' placeholder='Password' />
						<Button onClick={handleReset}>Sign In</Button>
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
