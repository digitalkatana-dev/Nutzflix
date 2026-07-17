import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setSelectedVideo,
	setSelectedSeries,
} from '../../../redux/slices/videoSlice';
import VideoItemV from '../../../components/VideoItemV';
import './category.scss';

const Category = ({ type }) => {
	const { movies, series, searchResults } = useSelector((state) => state.video);
	const dispatch = useDispatch();
	const category = type === 'series' ? series : type === 'movies' && movies;
	const link =
		type === 'series'
			? '/series-details'
			: type === 'movies' && '/video-details';

	const handleClick = (selected) => {
		if (type === 'series') {
			dispatch(setSelectedSeries(selected));
		} else if (type === 'movies') {
			dispatch(setSelectedVideo(selected));
		}
	};

	return (
		<div id='category'>
			<header>
				<h2 className='responsive-h2'>
					{type.charAt(0).toUpperCase() + type.slice(1)}
				</h2>
			</header>
			<main className='content-wrapper'>
				{searchResults.length > 0 ? (
					<>
						{searchResults?.map((item) => (
							<VideoItemV
								key={item._id}
								link={link}
								image={item.poster}
								caption={item.title}
								onClick={() => handleClick(item)}
							/>
						))}
					</>
				) : (
					<>
						{category?.map((item) => (
							<VideoItemV
								key={item._id}
								link={link}
								image={item.poster}
								caption={item.title}
								onClick={() => handleClick(item)}
							/>
						))}
					</>
				)}
			</main>
		</div>
	);
};

export default Category;
