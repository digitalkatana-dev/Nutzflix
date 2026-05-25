import { useEffect, useMemo, useState } from 'react';
import Widget from '../components/Widget';
import Chart from '../components/Chart/Chart';
import TransactionTable from '../components/TransactionTable';
import './adminHome.scss';

const AdminHome = () => {
	const [subStats, setSubstats] = useState([]);

	return (
		<div className='admin-home'>
			<div className='widgets'>
				<Widget type='sub' />
				<Widget type='order' />
				<Widget type='earning' />
				<Widget type='balance' />
			</div>
			<div className='charts'>
				<Widget size='lg' />
				<Chart data={subStats} title='Subscriber Analytics' aspect={4 / 1} />
			</div>
			<div className='list-container'>
				<h3 className='list-title'>Latest Transactions</h3>
				<TransactionTable />
			</div>
		</div>
	);
};

export default AdminHome;
