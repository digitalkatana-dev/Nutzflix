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

const New = ({ title, type }) => {
	const [trailer, setTrailer] = useState(null);
	const [media, setMedia] = useState(null);
	const [profilePhoto, setProfilePhoto] = useState(null);
	const {
		synopsis,
		runTime,
		vidTitle,
		year,
		isSeries,
		seriesType,
		seriesTitle,
	} = useSelector((state) => state.video);
	const dispatch = useDispatch();

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

	return (
		<div className='new'>
			<header>
				<h2>{title}</h2>
			</header>
			<section className='content'>
				<div className={`left${type === 'sub' ? ' left' : ''}`}>
					{type === 'video' ? (
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
				<div className='right'></div>
			</section>
		</div>
	);
};

export default New;
