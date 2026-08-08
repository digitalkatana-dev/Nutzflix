import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { InfoOutlined, PlayArrow } from '@mui/icons-material';
import { setSelectedVideo } from '../../../../../redux/slices/videoSlice';
import { getEmbedUrl, shuffleArray } from '../../../../../util/helpers';
import './featured.scss';

const Featured = () => {
	const { movies } = useSelector((state) => state.video);
	const dispatch = useDispatch();
	const featured = shuffleArray(movies)[0] ?? false;

	const handleClick = () => {
		dispatch(setSelectedVideo(featured));
	};

	return (
		<div className='featured-container'>
			{featured && (
				<>
					<div className='video-wrapper'>
						<iframe src={getEmbedUrl(featured?.trailer)} frameBorder='0' />
						<div className='info'>
							<img src={featured?.poster} alt='' />
							<span className='desc'>{featured?.synopsis}</span>
							<div className='buttons'>
								<Link
									to='/watch'
									className='featured-link play'
									onClick={handleClick}
								>
									<PlayArrow />
									<span>Play</span>
								</Link>
								<Link
									to='/video-details'
									className='featured-link more'
									onClick={handleClick}
								>
									<InfoOutlined />
									<span>Info</span>
								</Link>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Featured;
