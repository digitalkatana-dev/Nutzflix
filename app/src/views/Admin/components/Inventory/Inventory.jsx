import React from 'react';
import { useSelector } from 'react-redux';
import './inventory.scss';

const Inventory = () => {
	const { movies } = useSelector((state) => state.video);

	return (
		<>
			{movies.map((m) => (
				<div className='inventory-wrapper' key={m._id}>
					<div className='poster-wrapper'>
						<img src={m.poster} alt='' />
					</div>
					<h6>{m.title}</h6>
				</div>
			))}
		</>
	);
};

export default Inventory;
