import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';
import { InfoOutlined, PlayArrow } from '@mui/icons-material';
import { getEmbedUrl } from '../../../../../util/helpers';
import { genreOptions } from '../../../../../util/data';
import Select from '../../../../../components/Select';
import './featured.scss';

const Featured = () => {
	const { movies } = useSelector((state) => state.video);
	const featured = movies[0] ?? false;

	return (
		<div className='featured'>
			<div className='category'>
				<span>Movies</span>
				<Select options={genreOptions} />
			</div>

			{featured && (
				<>
					<Container maxWidth='xl'>
						<div className='video-wrapper'>
							<iframe
								src={getEmbedUrl(featured?.trailer)}
								frameBorder='0'
								// allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
								// referrerPolicy='strict-origin-when-cross-origin'
							/>
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
				</>
			)}
		</div>
	);
};

export default Featured;
