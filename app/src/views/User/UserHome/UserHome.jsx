import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	setSelectedSeries,
	setSelectedVideo,
	setSearchTerm,
	clearSearchResults,
} from '../../../redux/slices/videoSlice';
import { shuffleArray, buildGenreLists } from '../../../util/helpers';
import Paper from '../../../components/Paper';
import Featured from './components/Featured';
import Carousel from '../../../components/Carousel';
import './userhome.scss';

const UserHome = () => {
	const { drawerOpen } = useSelector((state) => state.app);
	const { movies, series, searchResults } = useSelector((state) => state.video);
	const dispatch = useDispatch();
	const lists = buildGenreLists(movies);

	const handleSelectedVideo = (video) => {
		if (video.videoType.toLowerCase() === 'series') {
			dispatch(setSelectedSeries(video));
		} else if (video.videoType.toLowerCase() === 'movie') {
			dispatch(setSelectedVideo(video));
		}
		dispatch(setSearchTerm(''));
		dispatch(clearSearchResults());
	};

	return (
		<div className='home'>
			{!drawerOpen && searchResults.length > 0 ? (
				<div className='search-wrapper'>
					{searchResults.map((r) => (
						<Link
							to={
								r.videoType.toLowerCase() === 'series'
									? '/series-details'
									: r.videoType.toLowerCase() === 'movie' && '/video-details'
							}
							key={r._id}
							onClick={() => handleSelectedVideo(r)}
						>
							<div className='result-item-wrapper'>
								<Paper className='poster-wrapper' elevation={5}>
									<img
										src={
											r.videoType.toLowerCase() === 'series'
												? r.folder
												: r.poster
										}
										alt={r.title}
									/>
								</Paper>
								<h6>{r.title}</h6>
							</div>
						</Link>
					))}
				</div>
			) : (
				<>
					<Featured />
					<div className='carousel-wrapper'>
						<Carousel series list={shuffleArray(series)} arrows count={20} />
						{lists
							.filter((list) => list.movies.length > 0)
							.map((list) => (
								<Carousel key={list.name} list={list} arrows />
							))}
					</div>
				</>
			)}
		</div>
	);
};

export default UserHome;
