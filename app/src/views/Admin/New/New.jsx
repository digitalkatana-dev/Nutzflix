import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, IconButton } from '@mui/material';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import NoImageAlt from '../../../assets/no-image-alt.jpg';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import './new.scss';

const New = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [apiKey, setApiKey] = useState('');
	const [avatar, setAvatar] = useState('');
	const dispatch = useDispatch();

	const handleFocus = () => {};

	const handleChange = (input, value) => {
		const actionMap = {
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

	return (
		<div className='new'>
			<header>
				<h2>Add New Subscriber</h2>
			</header>
			<section className='content'>
				<div className={`media-area sub`}>
					<img src={avatar || NoImageAlt} alt='' />
				</div>
				<form>
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
						type='email'
						variant='standard'
						label='Email'
						value={email}
						onFocus={handleFocus}
						onChange={(e) => handleChange('email', e.target.value)}
					/>
					<TextInput
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
					<Button btnClass='form-btn'>Create</Button>
				</form>
			</section>
		</div>
	);
};

export default New;
