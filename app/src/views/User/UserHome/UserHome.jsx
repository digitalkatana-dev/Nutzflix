import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	setSelectedVideo,
	setSearchTerm,
	clearSearchResults,
} from '../../../redux/slices/videoSlice';
import { buildGenreLists } from '../../../util/helpers';
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
		dispatch(setSelectedVideo(video));
		dispatch(setSearchTerm(''));
		dispatch(clearSearchResults());
	};

	return (
		<div className='home'>
			{!drawerOpen && searchResults.length > 0 ? (
				<div className='search-wrapper'>
					{searchResults.map((r) => (
						<Link
							to='/video-details'
							key={r._id}
							onClick={() => handleSelectedVideo(r)}
						>
							<Paper className='poster-wrapper' elevation={5}>
								<img src={r.poster} alt={r.title} />
							</Paper>
						</Link>
					))}
				</div>
			) : (
				<>
					<Featured />
					<div className='carousel-wrapper'>
						<Carousel list={series} arrows />
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
