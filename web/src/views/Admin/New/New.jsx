import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, IconButton } from '@mui/material';
import {
	setFirstName,
	setEmail,
	setPassword,
	setApiKey,
	addSubscriber,
} from '../../../redux/slices/userSlice';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import NoImageAlt from '../../../assets/no-image-alt.jpg';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import './new.scss';

const New = () => {
	const [avatar, setAvatar] = useState('');
	const { firstName, email, password, apiKey } = useSelector(
		(state) => state.user,
	);
	const dispatch = useDispatch();

	const handleFocus = () => {};

	const handleChange = (input, value) => {
		const actionMap = {
			first: setFirstName,
			email: setEmail,
			pass: setPassword,
			api: setApiKey,
		};

		const action = actionMap[input];

		action && dispatch(action(value));
	};

	const handleClick = (e) => {
		setAvatar(e.target.src === avatar ? '' : e.target.src);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const userData = {
			firstName,
			email,
			password,
			apiKey,
			profilePhoto: avatar,
		};

		dispatch(addSubscriber(userData));
	};

	return (
		<div className='new'>
			<header>
				<h2>Add New Subscriber</h2>
			</header>
			<section className='content'>
				<div className='media-area'>
					<img src={avatar || NoImageAlt} alt='' />
				</div>
				<form onSubmit={handleSubmit}>
					<div className='form-input'>
						<label>
							Profile Photo:
							<DriveFolderUploadOutlinedIcon className='icon' />
						</label>
						<div className='avatar-display'>
							{[...Array(26)].map((_, index) => {
								const source = `https://server.nutzflix.net/api/assets/avatars/avatar_${
									index + 1
								}.jpg`;

								return (
									<IconButton
										key={index + 1}
										onClick={handleClick}
										style={{
											border:
												avatar === source ? '3px ridge dodgerblue' : 'none',
										}}
									>
										<Avatar src={source} alt='user' />
									</IconButton>
								);
							})}
						</div>
					</div>
					<TextInput
						variant='standard'
						label='First Name'
						value={firstName}
						onFocus={handleFocus}
						onChange={(e) => handleChange('first', e.target.value)}
					/>
					<TextInput
						type='email'
						variant='standard'
						label='Email'
						value={email}
						onFocus={handleFocus}
						onChange={(e) => handleChange('email', e.target.value)}
					/>
					<TextInput
						type='password'
						variant='standard'
						label='Password'
						value={password}
						onFocus={handleFocus}
						onChange={(e) => handleChange('pass', e.target.value)}
					/>
					<TextInput
						variant='standard'
						label='API Key'
						value={apiKey}
						onFocus={handleFocus}
						onChange={(e) => handleChange('api', e.target.value)}
					/>
					<Button type='submit' btnClass='form-btn'>
						Create
					</Button>
				</form>
			</section>
		</div>
	);
};

export default New;
