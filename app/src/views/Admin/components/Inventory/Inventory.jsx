import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSelectedVideo } from '../../../../redux/slices/videoSlice';
import Paper from '../../../../components/Paper';
import './inventory.scss';

const Inventory = () => {
	const { movies } = useSelector((state) => state.video);
	const dispatch = useDispatch();

	const handleSelectedVideo = (video) => {
		dispatch(setSelectedVideo(video));
	};

	return (
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
	);
};

export default Inventory;
