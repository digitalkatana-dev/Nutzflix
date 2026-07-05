import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Stack } from '@mui/material';
import { getEmbedUrl } from '../../../util/helpers';
import Paper from '../../../components/Paper';
import Button from '../../../components/Button';
import './details.scss';

const VideoDetails = () => {
	const { selectedVideo } = useSelector((state) => state.video);

	return (
		<div id='video-details'>
			<div className='trailer-wrapper'>
				<Container maxWidth='xl'>
					<div className='video-wrapper'>
						<iframe src={getEmbedUrl(selectedVideo?.trailer)} frameBorder='0' />
						<img className='logo' src={selectedVideo?.logo} alt='' />
					</div>
				</Container>
			</div>
			<div className='video-info'>
				<div className='flex-wrapper'>
					<Paper className='poster-wrapper' elevation={5}>
						<img className='poster' src={selectedVideo?.poster} alt='' />
					</Paper>
					<div className='common-info-wrapper'>
						<Stack direction='column' spacing={1}>
							<span className='responsive-h4'>{selectedVideo?.title}</span>
							<span className='responsive-h5 rating'>
								{selectedVideo?.rating}
							</span>
							<span className='responsive-p year'>{selectedVideo?.year}</span>
						</Stack>
						<span className='responsive-56'>{selectedVideo?.tagline}</span>
						<span className='responsive-p genre'>
							{selectedVideo?.genre?.map((g) => `${g} `)}
						</span>
						<div className='actions'>
							<Button linkTo='/watch' btnClass='play-btn'>
								Play
							</Button>
						</div>
					</div>
				</div>
				<div className='details-wrapper'>
					<span className='responsive-h2'>{selectedVideo?.synopsis}</span>
					<div className='people'>
						<h2>Cast & Crew</h2>
						<div className='people-flex'>
							{selectedVideo?.people?.map((p) => (
								<div className='crew' key={p.Id}>
									<span>{p.Name}</span>
									<span>{p.Role}</span>
									<span>{p.Type}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoDetails;
