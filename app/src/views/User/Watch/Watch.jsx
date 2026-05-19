import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ArrowBackIosOutlined from '@mui/icons-material/ArrowBackIosOutlined';
import './watch.scss';

const Watch = () => {
	const location = useLocation();
	const video = location?.state?.video;

	return (
		<div className='watch'>
			<Link to='/home'>
				<div className='back'>
					<ArrowBackIosOutlined />
					Home
				</div>
			</Link>
			<video
				src={video?.media}
				className='video'
				autoPlay
				progress={true}
				controls
			/>
		</div>
	);
};

export default Watch;
