import React from 'react';
import Topbar from '../../components/Topbar';
import SideNav from '../../components/SideNav';
import Featured from './components/Featured';
import List from '../../components/List';
import './home.scss';

const Home = ({ type, lists }) => {
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

export default Home;
