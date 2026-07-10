import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	setSearchTerm,
	setSelectedVideo,
	clearSearchResults,
} from '../../../../redux/slices/videoSlice';
import Paper from '../../../../components/Paper';
import './inventory.scss';

const Inventory = () => {
	const { movies, searchResults } = useSelector((state) => state.video);
	const dispatch = useDispatch();

	const handleSelectedVideo = (video) => {
		dispatch(setSelectedVideo(video));
		dispatch(setSearchTerm(''));
		dispatch(clearSearchResults());
	};

	return (
		<>
			{searchResults?.length > 0 ? (
				<>
					{searchResults.map((r) => (
						<Link
							key={r._id}
							to='/video-details'
							onClick={() => handleSelectedVideo(r)}
						>
							<div className='inventory-wrapper'>
								<Paper className='poster-wrapper' elevation={5}>
									<img src={r.poster} alt={r.title} />
								</Paper>
								<h6>{r.title}</h6>
							</div>
						</Link>
					))}
				</>
			) : (
				<>
					{movies.map((m) => (
						<Link
							key={m._id}
							to='/video-details'
							onClick={() => handleSelectedVideo(m)}
						>
							<div className='inventory-wrapper'>
								<Paper className='poster-wrapper' elevation={5}>
									<img src={m.poster} alt={m.title} />
								</Paper>
								<h6>{m.title}</h6>
							</div>
						</Link>
					))}
				</>
			)}
		</>
	);
};

export default Inventory;
