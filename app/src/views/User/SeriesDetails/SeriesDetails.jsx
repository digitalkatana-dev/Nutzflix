import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Stack } from '@mui/material';
import { setSelectedSeason } from '../../../redux/slices/videoSlice';
import { getEmbedUrl } from '../../../util/helpers';
import Paper from '../../../components/Paper';
import './seriesDetails.scss';

const SeriesDetails = () => {
	const { selectedSeries } = useSelector((state) => state.video);
	const dispatch = useDispatch();

	const handleSeasonClick = (season) => {
		dispatch(setSelectedSeason(season));
	};

	return (
		<div id='series-details'>
			<div className='trailer-wrapper'>
				<Container maxWidth='xl'>
					<div className='video-wrapper'>
						<iframe
							src={getEmbedUrl(selectedSeries?.trailer)}
							frameborder='0'
						/>
						<img className='logo' src={selectedSeries?.logo} alt='' />
					</div>
				</Container>
			</div>
			<div className='series-info'>
				<div className='flex-wrapper'>
					<Paper className='poster-wrapper' elevation={5}>
						<img src={selectedSeries?.poster} alt='' className='poster' />
					</Paper>
					<div className='common-info-wrapper'>
						<Stack direction='column' spacing={1}>
							<span className='responsive-h4'>{selectedSeries?.title}</span>
							<span className='responsive-h5 rating'>
								{selectedSeries?.rating}
							</span>
							<span className='responsive-p year'>{selectedSeries?.year}</span>
						</Stack>
						{selectedSeries?.tagline && (
							<span className='responsive-h6'>{selectedSeries?.tagline}</span>
						)}
						<span className='responsive-p genre'>
							{selectedSeries?.genre?.map((g) => `${g} `)}
						</span>
					</div>
				</div>
				<div className='details-wrapper'>
					<div className='synopsis'>
						<h2 className='responsive-h2'>Synopsis</h2>
						<p className='responsive-h5'>{selectedSeries?.synopsis}</p>
					</div>
					<div className='seasons'>
						<h2 className='responsive-h2'>Seasons</h2>
						<div className='seasons-wrapper'>
							{selectedSeries?.seasons?.map((season, i) => (
								<Link
									key={season._id}
									to='/season-details'
									className='season-link'
									onClick={() => handleSeasonClick(season)}
								>
									<Paper className='poster-wrapper' elevation={5}>
										<img
											src={season.poster}
											alt={`Season ${i + 1}`}
											className='poster'
										/>
									</Paper>
									<h5>{season.season}</h5>
								</Link>
							))}
						</div>
					</div>
					<div className='people'>
						<h2 className='responsive-h2'>Cast & Crew</h2>
						<div className='people-flex'>
							{selectedSeries?.people?.map((p) => (
								<div className='crew' key={p.Id}>
									<span>{p.Role}</span>
									<span>{p.Name}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SeriesDetails;
