import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSelectedSeries } from '../../redux/slices/videoSlice';
import './seriesCarousel.scss';

const SeriesCarouselItem = ({ item }) => {
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(setSelectedSeries(item));
	};

	return (
		<Link to='/series-details' onClick={handleClick}>
			<div className='series-item'>
				<img src={item?.backdrop} alt={item?.title} />
			</div>
		</Link>
	);
};

export default SeriesCarouselItem;
