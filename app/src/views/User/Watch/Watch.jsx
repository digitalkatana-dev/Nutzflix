import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSelectedVideo } from '../../../redux/slices/videoSlice';
import ArrowBackIosOutlined from '@mui/icons-material/ArrowBackIosOutlined';
import './watch.scss';

const Watch = () => {
	const { selectedVideo } = useSelector((state) => state.video);
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(setSelectedVideo(null));
	};

	return (
		<div className='watch'>
			<Link to='/home-user' onClick={handleClick}>
				<div className='back'>
					<ArrowBackIosOutlined />
					Home
				</div>
			</Link>
			<video
				src={selectedVideo?.streamURL}
				className='video'
				autoPlay
				progress='true'
				controls
			/>
		</div>
	);
};

export default Watch;
