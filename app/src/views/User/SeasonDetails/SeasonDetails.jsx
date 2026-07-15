import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Stack } from '@mui/material';
import { setSelectedVideo } from '../../../redux/slices/videoSlice';
import Paper from '../../../components/Paper';
import VideoItemH from '../../../components/VideoItemH';
import './seasonDetails.scss';

const SeasonDetails = () => {
	const { selectedSeason } = useSelector((state) => state.video);
	const dispatch = useDispatch();

	const handleEpisodeClick = (ep) => {
		dispatch(setSelectedVideo(ep));
	};

	return (
		<main id='season-details'>
			<section className='backdrop'>
				<Container maxWidth='xl'>
					<img
						src={selectedSeason?.backdrop}
						alt={`${selectedSeason?.seriesName} ${selectedSeason?.season}`}
					/>
				</Container>
			</section>
			<section className='season-info'>
				<div className='flex-wrapper'>
					<Paper className='poster-wrapper' elevation={5}>
						<img
							className='poster'
							src={selectedSeason?.poster}
							alt={`${selectedSeason?.seriesName} ${selectedSeason?.season}`}
						/>
					</Paper>
					<div className='common-info-wrapper'>
						<Stack direction='column' spacing={1}>
							<span className='responsive-h4'>{selectedSeason?.season}</span>
							<span className='responsive-h4 year'>{selectedSeason?.year}</span>
						</Stack>
					</div>
				</div>
				<div className='details-wrapper'>
					<div className='episodes'>
						<h2 className='responsive-h2'>Episodes</h2>
						<div className='episodes-wrapper'>
							{selectedSeason?.episodes?.map((ep, i) => (
								<VideoItemH
									key={ep._id}
									linkTo='/watch'
									elevation={5}
									image={ep.backdrop}
									alt={`Episode ${ep.epNum}, ${ep.title}`}
									caption={`Episode ${ep.epNum} ${ep.title}`}
									onClick={() => handleEpisodeClick(ep)}
								/>
							))}
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default SeasonDetails;
