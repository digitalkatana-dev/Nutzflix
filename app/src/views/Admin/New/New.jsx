import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername, setEmail } from '../../../redux/slices/userSlice';
import {
	setSynopsis,
	setRunTime,
	setVidTitle,
	setYear,
	setIsSeries,
	setSeriesType,
	setSeriesTitle,
} from '../../../redux/slices/videoSlice';
import { binaryOptions, seriesTypes } from '../../../util/data';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import NoImageAlt from '../../../assets/no-image-alt.jpg';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import './new.scss';

const New = ({ title, type }) => {
	const [trailer, setTrailer] = useState(null);
	const [media, setMedia] = useState(null);
	const [profilePhoto, setProfilePhoto] = useState(null);
	const [img, setImg] = useState(null);
	const [uploaded, setUploaded] = useState(0);
	const { username, email } = useSelector((state) => state.user);
	const {
		synopsis,
		runTime,
		vidTitle,
		year,
		isSeries,
		seriesType,
		seriesTitle,
		season,
		episode,
	} = useSelector((state) => state.video);
	const dispatch = useDispatch();

	const handleFocus = () => {};

	const handleChange = (input, value) => {
		const actionMap = {
			username: setUsername,
			email: setEmail,
			vidTitle: setVidTitle,
			synopsis: setSynopsis,
			year: setYear,
			runTime: setRunTime,
			isSeries: setIsSeries,
			seriesType: setSeriesType,
			seriesTitle: setSeriesTitle,
		};

		if (value === 'true') value = true;
		if (value === 'false') value = false;
		if (input === 'isSeries' && value === '') value = false;

		const action = actionMap[input];

		action && dispatch(action(value));
	};

	return (
		<div className='new'>
			<header>
				<h2>{title}</h2>
			</header>
			<section className='content'>
				<div className={`media-area${type === 'sub' ? ' sub' : ''}`}>
					{type === 'video' ? (
						<>
							<div className='preview'>
								<div className='form-input'>
									<label
										htmlFor='trailer'
										className={trailer ? 'loaded' : null}
									>
										Trailer:
										<DriveFolderUploadOutlinedIcon className='icon' />
									</label>
									<input
										type='file'
										id='trailer'
										onChange={(e) => setTrailer(e.target.files[0])}
										hidden
									/>
								</div>
								<video
									src={trailer ? URL.createObjectURL(trailer) : null}
									controls
								/>
							</div>
							<div className='preview'>
								<div className='form-input'>
									<label htmlFor='media' className={media ? 'loaded' : null}>
										Media:
										<DriveFolderUploadOutlinedIcon className='icon' />
									</label>
									<input
										type='file'
										id='media'
										onChange={(e) => setMedia(e.target.files[0])}
										hidden
									/>
								</div>
								<video
									src={media ? URL.createObjectURL(media) : null}
									controls
								/>
							</div>
						</>
					) : (
						<img
							src={
								profilePhoto ? URL.createObjectURL(profilePhoto) : NoImageAlt
							}
							alt=''
						/>
					)}
				</div>
				<form>
					{type === 'sub' && (
						<>
							<div className='form-input'>
								<label htmlFor='profilePhoto'>
									Profile Photo:
									<DriveFolderUploadOutlinedIcon className='icon' />
								</label>
								<input
									type='file'
									id='profilePhoto'
									onChange={(e) => setProfilePhoto(e.target.files[0])}
									hidden
								/>
							</div>
							<TextInput
								variant='standard'
								label='Username'
								placeholder='john_doe'
								value={username}
								onFocus={handleFocus}
								onChange={(e) => handleChange('username', e.target.value)}
							/>
							<TextInput
								type='email'
								variant='standard'
								label='Email'
								placeholder='john_doe@gmail.com'
								value={email}
								onFocus={handleFocus}
								onChange={(e) => handleChange('email', e.target.value)}
							/>
						</>
					)}
					{type === 'video' && (
						<>
							<div className='form-input'>
								<div className='file-input-wrapper'>
									<>
										<label htmlFor='img'>
											Image:
											<DriveFolderUploadOutlinedIcon className='icon' />
										</label>
										<input
											type='file'
											id='img'
											onChange={(e) => setImg(e.target.files[0])}
											hidden
										/>
									</>
									<div className='file-preview'>
										<img
											src={img ? URL.createObjectURL(img) : NoImageAlt}
											alt=''
										/>
									</div>
								</div>
							</div>
							<TextInput
								variant='standard'
								label='TItle'
								placeholder='Free Guy...'
								value={vidTitle}
								onFocus={handleFocus}
								onChange={(e) => handleChange('vidTitle', e.target.value)}
							/>
							<TextInput
								variant='standard'
								label='Synopsis'
								placeholder='Synopsis'
								value={synopsis}
								onFocus={handleFocus}
								onChange={(e) => handleChange('synopsis', e.target.value)}
							/>
							<TextInput
								variant='standard'
								label='Year'
								placeholder='1974...'
								value={year}
								onFocus={handleFocus}
								onChange={(e) => handleChange('year', e.target.value)}
							/>
							<TextInput
								variant='standard'
								label='Run Time'
								placeholder='108 min...'
								value={runTime}
								onFocus={handleFocus}
								onChange={(e) => handleChange('runTime', e.target.value)}
							/>
							<TextInput
								select
								variant='standard'
								label='isSeries'
								selectOptions={binaryOptions}
								value={isSeries}
								onChange={(e) => handleChange('isSeries', e.target.value)}
							/>
							{isSeries && (
								<>
									<TextInput
										select
										variant='standard'
										label='Series Type'
										selectOptions={seriesTypes}
										value={seriesType}
										onChange={(e) => handleChange('seriesType', e.target.value)}
									/>
									<TextInput
										variant='standard'
										label='Series Title'
										placeholder='Ally McBeal...'
										value={seriesTitle}
										onChange={(e) =>
											handleChange('seriesTitle', e.target.value)
										}
									/>
									{seriesType === 'TV' && (
										<>
											<TextInput
												variant='standard'
												label='Season'
												placeholder='Season 1...'
												value={season}
												onChange={(e) => handleChange('season', e.target.value)}
											/>
											<TextInput
												variant='standard'
												label='Episode'
												placeholder='Episode 5...'
												value={episode}
												onChange={(e) =>
													handleChange('episode', e.target.value)
												}
											/>
										</>
									)}
								</>
							)}
						</>
					)}
					{uploaded === 3 ? (
						<Button btnClass='form-btn'>Create</Button>
					) : (
						<Button btnClass='form-btn'>Upload</Button>
					)}
				</form>
			</section>
		</div>
	);
};

export default New;
