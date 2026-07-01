import React from 'react';
import { useSelector } from 'react-redux';
import Featured from './components/Featured';
import List from '../../../components/List';
import './userhome.scss';

const UserHome = ({ type }) => {
	const { lists } = useSelector((state) => state.video);

	return (
		<div className='home'>
			<div className='home-wrapper'>
				{/* <Featured type={type} /> */}
				{lists?.map((list) => (
					<List key={list.name} list={list} />
				))}
			</div>
		</div>
	);
};

export default UserHome;
