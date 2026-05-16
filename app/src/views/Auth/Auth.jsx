import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, resetApp } from '../../redux/slices/appSlice';
import { setActiveUser, userAuth } from '../../redux/slices/userSlice';
import './auth.scss';
import Topbar from '../../components/Topbar';
import Paper from '../../components/Paper';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

const Auth = () => {
	const { theme } = useSelector((state) => state.app);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	const handleChange = (input, value) => {
		const actionMap = {
			email: setEmail,
			pass: setPassword,
		};

		const action = actionMap[input];

		action && action(value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			email,
			password,
		};
		dispatch(userAuth(data));
		// dispatch(setActiveUser());
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
						<TextInput
							type='email'
							placeholder='Email'
							onChange={(e) => handleChange('email', e.target.value)}
						/>
						<TextInput
							type='password'
							placeholder='Password'
							onChange={(e) => handleChange('pass', e.target.value)}
						/>
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
