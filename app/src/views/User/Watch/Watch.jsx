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
				src={`https://server.nutzflix.net/Items/d7e56cd9772272534e94b795187cae9a/Download?api_key=5f84f87fa5584fd8b700cbcc8b5faf2e`}
				className='video'
				autoPlay
				progress={true}
				controls
			/>
		</div>
	);
};

export default Watch;
