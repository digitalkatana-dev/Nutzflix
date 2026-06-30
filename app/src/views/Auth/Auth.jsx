import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAuth, clearUserErrors } from '../../redux/slices/userSlice';
import './auth.scss';
import Paper from '../../components/Paper';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

const Auth = () => {
	const { loading, userErrors } = useSelector((state) => state.user);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	const handleFocus = () => {
		dispatch(clearUserErrors());
	};

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
	};

	return (
		<div className='auth'>
			<header>
				<h2 className='brand'>NUTZFLIX</h2>
			</header>
			<div className='wrapper'>
				<Paper elevation={0} className='auth-paper'>
					<h1>Sign In</h1>
					<form action='' onSubmit={handleSubmit}>
						<TextInput
							type='email'
							placeholder='Email'
							onFocus={handleFocus}
							onChange={(e) => handleChange('email', e.target.value)}
							error={userErrors?.email}
							helperText={userErrors?.email}
						/>
						<TextInput
							type='password'
							placeholder='Password'
							onFocus={handleFocus}
							onChange={(e) => handleChange('pass', e.target.value)}
							error={userErrors?.password}
							helperText={userErrors?.password}
						/>
						<Button type='submit' loading={loading}>
							Sign In
						</Button>
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
