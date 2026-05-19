import React from 'react';
import Featured from './components/Featured';
import List from '../../../components/List';
import './userhome.scss';

const UserHome = ({ type, lists }) => {
	return (
		<div className='home'>
			<div className='wrapper'>
				<Featured type={type} />
				{lists?.map((list) => (
					<List key={list._id} list={list} />
				))}
			</div>
		</div>
	);
};

export default UserHome;
