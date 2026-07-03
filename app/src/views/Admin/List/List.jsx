import React from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../components/DataTable';
import VideoList from '../components/Video List';
import './list.scss';

const List = ({ title }) => {
	return (
		<div>
			<div className='top'>
				<h2 className='title'>{title}</h2>
				<Link to='/subs/new' className='link'>
					Add New
				</Link>
			</div>
			{title === 'Subscribers' && <DataTable />}
			{title === 'Videos' && <VideoList />}
		</div>
	);
};

export default List;
