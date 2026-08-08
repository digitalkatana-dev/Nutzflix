import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { InfoOutlined, PlayArrow } from '@mui/icons-material';
import { setSelectedVideo } from '../../../../../redux/slices/videoSlice';
import { getEmbedUrl, shuffleArray } from '../../../../../util/helpers';
import Paper from '../../../../../components/Paper';
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
					<Paper className='mobile' elevation={5}>
						<img src={featured?.poster} alt='' />
						<div className='featured-footer'>
							{featured?.logo && <img src={featured?.logo} alt='Logo' />}
							<h5 className='responsive-h5 info'>{`${featured?.videoType} • ${featured?.genre[0]} • ${featured?.year} • ${featured?.rating}`}</h5>
							<h5 className='responsive-h5 desc'>{featured?.synopsis}</h5>
							<div className='featured-btn-container'>
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
					</Paper>
					<Paper className='video-wrapper' elevation={7}>
						<iframe src={getEmbedUrl(featured?.trailer)} frameBorder='0' />
						<div className='featured-trailer-footer'>
							{featured?.logo && <img src={featured?.logo} alt='Logo' />}
							<h5 className='responsive-h5 info'>{`${featured?.videoType} • ${featured?.genre[0]} • ${featured?.year} • ${featured?.rating}`}</h5>
							<h5 className='responsive-h5 desc'>{featured?.synopsis}</h5>
							<div className='featured-btn-container'>
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
					</Paper>
				</>
			)}
		</div>
	);
};

export default Featured;
