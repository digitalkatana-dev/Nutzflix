import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	generatePasswordToken,
	clearUserSuccess,
	clearUserErrors,
} from '../../../redux/slices/userSlice';
import Paper from '../../../components/Paper';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import './forgot.scss';

const Forgot = () => {
	const { loading, userSuccess, userErrors } = useSelector(
		(state) => state.user,
	);
	const [email, setEmail] = useState('');
	const [prevUserSuccess, setPrevUserSuccess] = useState(userSuccess);
	const [showSuccess, setShowSuccess] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleFocus = () => {
		dispatch(clearUserErrors());
	};

	const handleChange = (e) => {
		setEmail(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			email,
		};

		dispatch(generatePasswordToken(data));
	};

	if (userSuccess !== prevUserSuccess) {
		setPrevUserSuccess(userSuccess);
		if (userSuccess) {
			setShowSuccess(true);
			setEmail('');
		}
	}

	useEffect(() => {
		if (!showSuccess) return;

		const clearTimer = setTimeout(() => {
			dispatch(clearUserSuccess());
		}, 5000);

		const navigateTimer = setTimeout(() => {
			navigate('/');
		}, 7000);

		return () => {
			clearTimeout(clearTimer);
			clearTimeout(navigateTimer);
		};
	}, [showSuccess, dispatch, navigate]);

	return (
		<div className='forgot'>
			<header>
				<h2 className='brand'>NUTZFLIX</h2>
			</header>
			<div className='wrapper'>
				<Paper elevation={0} className='forgot-paper'>
					<h1>Forgot Password</h1>
					<form action='' onSubmit={handleSubmit}>
						<TextInput
							type='email'
							placeholder='Email'
							onFocus={handleFocus}
							onChange={handleChange}
							value={email}
							error={userErrors?.email}
							helperText={userErrors?.email}
						/>
						<Button type='submit' loading={loading}>
							Submit
						</Button>
						{userErrors?.token && <p className='error'>{userErrors?.token}</p>}
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

export default Forgot;
