import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	resetPassword,
	clearUserSuccess,
	clearUserErrors,
} from '../../../redux/slices/userSlice';
import Paper from '../../../components/Paper';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import './reset.scss';

const Reset = () => {
	const { loading, userSuccess, userErrors } = useSelector(
		(state) => state.user,
	);
	const [password, setPassword] = useState('');
	const [prevUserSuccess, setPrevUserSuccess] = useState(userSuccess);
	const [showSuccess, setShowSuccess] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const token = location.pathname.split('/')[2];

	const handleFocus = () => {
		dispatch(clearUserErrors());
	};

	const handleChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			token,
			password,
		};

		dispatch(resetPassword(data));
	};

	if (userSuccess !== prevUserSuccess) {
		setPrevUserSuccess(userSuccess);
		if (userSuccess) {
			setShowSuccess(true);
			setPassword('');
		}
	}

	useEffect(() => {
		if (!showSuccess) return;

		const clearTimer = setTimeout(() => {
			dispatch(clearUserSuccess());
		}, 3000);

		const navigateTimer = setTimeout(() => {
			navigate('/');
		}, 5000);

		return () => {
			clearTimeout(clearTimer);
			clearTimeout(navigateTimer);
		};
	}, [showSuccess, dispatch, navigate]);

	return (
		<div className='reset'>
			<header>
				<h2 className='brand'>NUTZFLIX</h2>
			</header>
			<div className='wrapper'>
				<Paper elevation={0} className='reset-paper'>
					<h1>Reset Password</h1>
					<form action='' onSubmit={handleSubmit}>
						<TextInput
							type='password'
							placeholder='Password'
							onFocus={handleFocus}
							onChange={handleChange}
							value={password}
							error={userErrors?.password}
							helperText={userErrors?.password}
						/>
						<Button type='submit' loading={loading}>
							Submit
						</Button>
						{userErrors?.reset && <p className='error'>{userErrors?.reset}</p>}
					</form>
					{userSuccess ? (
						<small style={{ color: 'green' }}>{userSuccess}</small>
					) : (
						<small>
							This is protected by the Red, the Track, and Tical. With a key.
						</small>
					)}
				</Paper>
			</div>
		</div>
	);
};

export default Reset;
