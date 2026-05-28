import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

const New = ({ inputs, title }) => {
	const {
		synopsis,
		runTime,
		vidTitle,
		year,
		isSeries,
		seriesType,
		seriesTitle,
	} = useSelector((state) => state.video);
	const [video, setVideo] = useState(null);
	const [sub, setSub] = useState(null);
	const [img, setImg] = useState(null);
	const [trailer, setTrailer] = useState(null);
	const [media, setMedia] = useState(null);
	const [profilePhoto, setProfilePhoto] = useState(null);
	const [uploaded, setUploaded] = useState(0);
	const dispatch = useDispatch();

	// const handleChange = (e) => {
	// 	let value;
	// 	if (e.target.value === 'true') {
	// 		value = true;
	// 	} else if (e.target.value === 'false') {
	// 		value = false;
	// 	} else {
	// 		value = e.target.value;
	// 	}

	// 	if (title === 'Add New Subscriber') {
	// 		setSub({ ...sub, [e.target.name]: value });
	// 	} else {
	// 		setVideo({ ...video, [e.target.name]: value });
	// 	}
	// };

	const handleChange = (input, value) => {
		const actionMap = {
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

	// const upload = (items) => {
	// 	items.forEach((item) => {
	// 		const fileName = new Date().getTime() + item.label + item.file.name;
	// 		const storageRef = ref(storage, `/items/${video?.title}/${fileName}`);
	// 		const uploadTask = uploadBytesResumable(storageRef, item.file);
	// 		uploadTask.on(
	// 			'state_changed',
	// 			(snapshot) => {
	// 				const progress =
	// 					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	// 				console.log('Upload is ' + parseInt(progress) + '% done');
	// 				switch (snapshot.state) {
	// 					case 'paused':
	// 						console.log('Upload paused');
	// 						break;
	// 					case 'running':
	// 						console.log('Upload running');
	// 						break;
	// 					// no default
	// 				}
	// 			},
	// 			(err) => {
	// 				console.log(err);
	// 			},
	// 			() => {
	// 				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
	// 					setVideo((prev) => {
	// 						return { ...prev, [item.label]: url };
	// 					});
	// 					setUploaded((prev) => prev + 1);
	// 				});
	// 			},
	// 		);
	// 	});
	// };

	const handleUpload = (e) => {
		e.preventDefault();
		upload([
			{ file: img, label: 'img' },
			{ file: trailer, label: 'trailer' },
			{ file: media, label: 'media' },
		]);
	};

	// const videoForm = () => {
	// 	return (
	// 		<form>
	// 			<div className='left'>
	// 				<div className='form-input'>
	// 					<div className='file-input-wrapper'>
	// 						<>
	// 							<label htmlFor='img'>
	// 								Image:
	// 								<DriveFolderUploadOutlinedIcon className='icon' />
	// 							</label>
	// 							<input
	// 								type='file'
	// 								id='img'
	// 								onChange={(e) => setImg(e.target.files[0])}
	// 								hidden
	// 							/>
	// 						</>
	// 						<div className='file-preview'>
	// 							<img
	// 								src={img ? URL.createObjectURL(img) : '/no-image-alt.jpg'}
	// 								alt=''
	// 							/>
	// 						</div>
	// 					</div>
	// 				</div>
	// 				<TextInput label='Synopsis' placeholder='Synopsis' />
	// 			</div>
	// 			<div className='right'></div>
	// 		</form>
	// 	);
	// };

	return (
		<div className='new'>
			<div className='top'>
				<h2>{title}</h2>
			</div>
			<div className='bottom'>
				<div className={title === 'Add New Subscriber' ? 'left sub' : 'left'}>
					{title === 'Add New Video' ? (
						<>
							<div className='top'>
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
							<div className='bottom'>
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
				<div className='right'>
					<form>
						{title === 'Add New Subscriber' ? (
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
						) : (
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
											src={img ? URL.createObjectURL(img) : '/no-image-alt.jpg'}
											alt=''
										/>
									</div>
								</div>
							</div>
						)}
						{inputs.map((input) => (
							<TextInput
								key={input.id}
								label={input.label}
								placeholder={input.placeholder}
								onChange={(e) => handleChange(input.name, e.target.value)}
							/>
						))}
						{title === 'Add New Video' ? (
							<>
								<TextInput
									select
									name='isSeries'
									label='isSeries'
									selectOptions={binaryOptions}
									onChange={(e) => handleChange('isSeries', e.target.value)}
									// fullWidth
								/>
								{isSeries && (
									<>
										<TextInput
											select
											name='seriesType'
											label='Series Type'
											selectOptions={seriesTypes}
											onChange={handleChange}
											// fullWidth
										/>
										<TextInput
											label='Series Title'
											name='seriesTitle'
											placeholder='Ally McBeal...'
											onChange={handleChange}
										/>
										{seriesType === 'TV' && (
											<>
												<TextInput
													label='Season'
													name='season'
													placeholder='Season 1...'
													onChange={handleChange}
												/>
												<TextInput
													label='Episode'
													name='episode'
													placeholder='Episode 5...'
													onChange={handleChange}
												/>
											</>
										)}
									</>
								)}
							</>
						) : (
							<div className='form-input'>
								<label htmlFor='isSeries'>isAdmin</label>
								<select name='isAdmin' id='isAdmin' onChange={handleChange}>
									<option value='false'>No</option>
									<option value='true'>Yes</option>
								</select>
							</div>
						)}
						{/* {uploaded === 3 ? (
							<button onClick={() => dispatch(createVideo(video))}>
								Create
							</button>
						) : (
							<Button onClick={handleUpload}>Upload</Button>
						)} */}
					</form>
				</div>
			</div>
		</div>
	);
};

export default New;
