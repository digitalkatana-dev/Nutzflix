import React from 'react';
import { useSelector } from 'react-redux';
import Paper from '../../../../components/Paper';
import './inventory.scss';

const Inventory = () => {
	const { movies } = useSelector((state) => state.video);

	return (
		<>
			{movies.map((m) => (
				<div className='inventory-wrapper' key={m._id}>
					<Paper className='poster-wrapper' elevation={5}>
						<img src={m.poster} alt='' />
					</Paper>
					<h6>{m.title}</h6>
				</div>
			))}
		</>
	);
};

export default Inventory;
