import React from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../components/DataTable';
import Inventory from '../components/Inventory';
import './list.scss';

const List = ({ title }) => {
	return (
		<div className='list'>
			<header className='top'>
				<h3 className='title'>{title}</h3>
				{title === 'Subscribers' && (
					<Link to='/subs/new' className='link'>
						Add New
					</Link>
				)}
			</header>
			<main className='list-main'>
				{title === 'Subscribers' ? (
					<DataTable />
				) : (
					title === 'Inventory' && <Inventory />
				)}
			</main>
		</div>
	);
};

export default List;
