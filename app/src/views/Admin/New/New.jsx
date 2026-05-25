import { useState } from 'react';
import { useDispatch } from 'react-redux';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import NoImageAlt from '../../../assets/no-image-alt.jpg';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import './new.scss';

const New = ({ inputs, title }) => {
	const [video, setVideo] = useState(null);
	const [sub, setSub] = useState(null);
	const [img, setImg] = useState(null);
	const [trailer, setTrailer] = useState(null);
	const [media, setMedia] = useState(null);
	const [profilePhoto, setProfilePhoto] = useState(null);
	const [uploaded, setUploaded] = useState(0);
	const dispatch = useDispatch();

	const handleChange = (e) => {
		let value;
		if (e.target.value === 'true') {
			value = true;
		} else if (e.target.value === 'false') {
			value = false;
		} else {
			value = e.target.value;
		}

		if (title === 'Add New Subscriber') {
			setSub({ ...sub, [e.target.name]: value });
		} else {
			setVideo({ ...video, [e.target.name]: value });
		}
	};

	const upload = (items) => {
		items.forEach((item) => {
			const fileName = new Date().getTime() + item.label + item.file.name;
			const storageRef = ref(storage, `/items/${video?.title}/${fileName}`);
			const uploadTask = uploadBytesResumable(storageRef, item.file);
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log('Upload is ' + parseInt(progress) + '% done');
					switch (snapshot.state) {
						case 'paused':
							console.log('Upload paused');
							break;
						case 'running':
							console.log('Upload running');
							break;
						// no default
					}
				},
				(err) => {
					console.log(err);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((url) => {
						setVideo((prev) => {
							return { ...prev, [item.label]: url };
						});
						setUploaded((prev) => prev + 1);
					});
				},
			);
		});
	};

	const handleUpload = (e) => {
		e.preventDefault();
		upload([
			{ file: img, label: 'img' },
			{ file: trailer, label: 'trailer' },
			{ file: media, label: 'media' },
		]);
	};

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
								id={input.label}
								name={input.name}
								label={input.label}
								type={input.type}
								onChange={handleChange}
							/>
							// <div className='form-input' key={input.id}>
							// 	<label htmlFor={input.label}>{input.label}</label>
							// 	<input
							// 		id={input.label}
							// 		name={input.name}
							// 		type={input.type}
							// 		placeholder={input.placeholder}
							// 		onChange={handleChange}
							// 	/>
							// </div>
						))}
						{title === 'Add New Video' ? (
							<>
								<div className='form-input'>
									<label htmlFor='isSeries'>isSeries</label>
									<select name='isSeries' id='isSeries' onChange={handleChange}>
										<option value='false'>No</option>
										<option value='true'>Yes</option>
									</select>
								</div>
								{video?.isSeries && (
									<>
										<div className='form-input'>
											<label htmlFor='series-type'>Series Type</label>
											<select
												name='seriesType'
												id='series-type'
												onChange={handleChange}
											>
												<option value=''>Choose...</option>
												<option value='TV'>TV</option>
												<option value='Movie'>Movie</option>
											</select>
										</div>
										<TextInput
											label='Series Title'
											placeholder='Ally McBeal...'
											onChange={handleChange}
										/>
										{/* <div className='form-input'>
											<label htmlFor='series-title'>Series Title</label>
											<input
												type='text'
												id='series-title'
												name='seriesTitle'
												placeholder='Ally McBeal...'
												onChange={handleChange}
											/>
										</div> */}
										{video?.seriesType === 'TV' && (
											<>
												<TextInput
													label='Season'
													placeholder='Season 1...'
													onChange={handleChange}
												/>
												{/* <div className='form-input'>
													<label htmlFor='season'>Season</label>
													<input
														type='text'
														id='season'
														name='season'
														placeholder='Season 1...'
														onChange={handleChange}
													/>
												</div> */}
												<TextInput
													label='Episode'
													placeholder='Episode 5...'
													onChange={handleChange}
												/>
												{/* <div className='form-input'>
													<label htmlFor='episode'>Episode</label>
													<input
														type='text'
														id='episode'
														name='episode'
														placeholder='Episode 5...'
														onChange={handleChange}
													/>
												</div> */}
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
						{uploaded === 3 ? (
							<button /*onClick={() => dispatch(createVideo(video))}*/>
								Create
							</button>
						) : (
							<Button onClick={handleUpload}>Upload</Button>
						)}
					</form>
				</div>
			</div>
		</div>
	);
};

export default New;
