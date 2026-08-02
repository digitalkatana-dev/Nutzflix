import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	setSearchTerm,
	setSelectedSeries,
	setSelectedVideo,
	clearSearchResults,
} from '../../../../redux/slices/videoSlice';
import Paper from '../../../../components/Paper';
import './inventory.scss';

const Inventory = () => {
	const { allVideos, searchResults } = useSelector((state) => state.video);
	const dispatch = useDispatch();

	const handleSelectedVideo = (video) => {
		if (video.videoType?.toLowerCase() === 'series') {
			dispatch(setSelectedSeries(video));
		} else if (video.videoType?.toLowerCase() === 'movie') {
			dispatch(setSelectedVideo(video));
		}
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
					{allVideos?.map((v) => (
						<Link
							key={v._id}
							to={
								v.videoType.toLowerCase() === 'series'
									? '/series-details'
									: v.videoType.toLowerCase() === 'movie' && '/video-details'
							}
							onClick={() => handleSelectedVideo(v)}
						>
							<div className='inventory-wrapper'>
								<Paper className='poster-wrapper' elevation={5}>
									<img
										src={
											v.videoType.toLowerCase() === 'series'
												? v.folder
												: v.poster
										}
										alt={v.title}
									/>
								</Paper>
								<h6>{v.title}</h6>
							</div>
						</Link>
					))}
				</>
			)}
		</>
	);
};

export default Inventory;
