import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';
import { InfoOutlined, PlayArrow } from '@mui/icons-material';
import { getEmbedUrl, shuffleArray } from '../../../../../util/helpers';
import './featured.scss';

const Featured = () => {
	const { movies } = useSelector((state) => state.video);
	const featured = shuffleArray(movies)[0] ?? false;

	return (
		<div className='featured'>
			{featured && (
				<Container maxWidth='xl'>
					<div className='video-wrapper'>
						<iframe src={getEmbedUrl(featured?.trailer)} frameBorder='0' />
					</div>
					<div className='info'>
						<img src={featured?.poster} alt='' />
						<span className='desc'>{featured?.synopsis}</span>
						<div className='buttons'>
							<button className='play'>
								<PlayArrow />
								<span>Play</span>
							</button>
							<button className='more'>
								<InfoOutlined />
								<span>Info</span>
							</button>
						</div>
					</div>
				</Container>
			)}
		</div>
	);
};

export default Featured;
